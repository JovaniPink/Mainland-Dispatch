import fs from "node:fs";
import path from "node:path";

const sourceRoot = path.join(process.cwd(), "src");
const disallowedCharacter = String.fromCodePoint(0x2014);
const sourceExtensions = new Set([".css", ".ts", ".tsx"]);

function collectSourceFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectSourceFiles(entryPath);
    }

    return sourceExtensions.has(path.extname(entry.name)) ? [entryPath] : [];
  });
}

describe("site punctuation contract", () => {
  it("keeps the application source free of em dashes", () => {
    const offenders = collectSourceFiles(sourceRoot).flatMap((file) => {
      const lines = fs.readFileSync(file, "utf8").split("\n");

      return lines.flatMap((line, index) =>
        line.includes(disallowedCharacter)
          ? [`${path.relative(process.cwd(), file)}:${index + 1}`]
          : []
      );
    });

    expect(offenders).toEqual([]);
  });
});
