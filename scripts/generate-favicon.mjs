import { mkdir, readFile, writeFile } from "node:fs/promises";

const width = 64;
const height = 64;
const radius = 12;
const bitmapHeaderSize = 40;
const xorRowSize = width * 4;
const andRowSize = Math.ceil(width / 32) * 4;
const imageSize = bitmapHeaderSize + xorRowSize * height + andRowSize * height;
const output = Buffer.alloc(6 + 16 + imageSize);

function insideRoundedSquare(x, y) {
  const nearHorizontalEdge = x >= radius && x < width - radius;
  const nearVerticalEdge = y >= radius && y < height - radius;
  if (nearHorizontalEdge || nearVerticalEdge) return true;

  const centerX = x < radius ? radius : width - radius - 1;
  const centerY = y < radius ? radius : height - radius - 1;
  return Math.hypot(x - centerX, y - centerY) <= radius;
}

function distanceToSegment(x, y, startX, startY, endX, endY) {
  const dx = endX - startX;
  const dy = endY - startY;
  const lengthSquared = dx * dx + dy * dy;
  const projection = Math.max(
    0,
    Math.min(1, ((x - startX) * dx + (y - startY) * dy) / lengthSquared)
  );
  return Math.hypot(
    x - (startX + projection * dx),
    y - (startY + projection * dy)
  );
}

function pixelAt(x, y) {
  if (!insideRoundedSquare(x, y)) return [0, 0, 0, 0];

  const isFirstRule = x >= 9 && x <= 10;
  const isSecondRule = x >= 14 && x <= 15;
  if (isFirstRule || isSecondRule) return [189, 56, 45, 255];

  const isMLeft = x >= 22 && x <= 25 && y >= 18 && y <= 46;
  const isMRight = x >= 36 && x <= 39 && y >= 18 && y <= 46;
  const isMDown = distanceToSegment(x, y, 24, 19, 31, 31) <= 2;
  const isMUp = distanceToSegment(x, y, 31, 31, 37, 19) <= 2;

  const isDStem = x >= 43 && x <= 46 && y >= 18 && y <= 46;
  const isDTop = distanceToSegment(x, y, 45, 19, 51, 19) <= 2;
  const isDUpper = distanceToSegment(x, y, 51, 19, 56, 25) <= 2;
  const isDOuter = x >= 54 && x <= 57 && y >= 25 && y <= 39;
  const isDLower = distanceToSegment(x, y, 56, 39, 51, 45) <= 2;
  const isDBottom = distanceToSegment(x, y, 45, 45, 51, 45) <= 2;

  if (
    isMLeft ||
    isMRight ||
    isMDown ||
    isMUp ||
    isDStem ||
    isDTop ||
    isDUpper ||
    isDOuter ||
    isDLower ||
    isDBottom
  ) {
    return [23, 32, 29, 255];
  }

  return [243, 240, 232, 255];
}

// ICONDIR and ICONDIRENTRY.
output.writeUInt16LE(0, 0);
output.writeUInt16LE(1, 2);
output.writeUInt16LE(1, 4);
output[6] = width;
output[7] = height;
output.writeUInt16LE(1, 10);
output.writeUInt16LE(32, 12);
output.writeUInt32LE(imageSize, 14);
output.writeUInt32LE(22, 18);

// BITMAPINFOHEADER. ICO stores the XOR and transparency-mask heights together.
const bitmapOffset = 22;
output.writeUInt32LE(bitmapHeaderSize, bitmapOffset);
output.writeInt32LE(width, bitmapOffset + 4);
output.writeInt32LE(height * 2, bitmapOffset + 8);
output.writeUInt16LE(1, bitmapOffset + 12);
output.writeUInt16LE(32, bitmapOffset + 14);
output.writeUInt32LE(xorRowSize * height, bitmapOffset + 20);

const xorOffset = bitmapOffset + bitmapHeaderSize;
const andOffset = xorOffset + xorRowSize * height;

for (let sourceY = 0; sourceY < height; sourceY += 1) {
  const targetY = height - sourceY - 1;
  for (let x = 0; x < width; x += 1) {
    const [red, green, blue, alpha] = pixelAt(x, sourceY);
    const pixelOffset = xorOffset + targetY * xorRowSize + x * 4;
    output[pixelOffset] = blue;
    output[pixelOffset + 1] = green;
    output[pixelOffset + 2] = red;
    output[pixelOffset + 3] = alpha;

    if (alpha === 0) {
      output[andOffset + targetY * andRowSize + Math.floor(x / 8)] |=
        1 << (7 - (x % 8));
    }
  }
}

const destination = new URL("../src/app/favicon.ico", import.meta.url);
const checkOnly = process.argv.includes("--check");

if (checkOnly) {
  const committed = await readFile(destination).catch(() => null);
  if (!committed?.equals(output)) {
    console.error(
      "Committed favicon.ico does not match the deterministic generator."
    );
    process.exitCode = 1;
  } else {
    console.log(
      `Verified deterministic Mainland Dispatch favicon (${width}x${height}).`
    );
  }
} else {
  await mkdir(new URL("../src/app/", import.meta.url), { recursive: true });
  await writeFile(destination, output);
  console.log(
    `Generated ${destination.pathname} (${output.length} bytes, ${width}x${height}).`
  );
}
