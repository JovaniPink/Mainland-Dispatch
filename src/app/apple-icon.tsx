import { ImageResponse } from "next/og";
import { MainlandDispatchMark } from "./mainland-dispatch-mark";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 } as const;
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <MainlandDispatchMark
      borderRadius={36}
      fontSize={68}
      ruleWidth={4}
      secondRuleLeft="23%"
    />,
    size
  );
}
