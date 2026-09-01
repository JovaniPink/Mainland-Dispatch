import { ImageResponse } from "next/og";
import { MainlandDispatchMark } from "./mainland-dispatch-mark";

export const dynamic = "force-static";
export const size = { width: 512, height: 512 } as const;
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <MainlandDispatchMark
      borderRadius={0}
      fontSize={192}
      ruleWidth={10}
      secondRuleLeft="23%"
    />,
    size
  );
}
