import { ImageResponse } from "next/og";
import { MainlandDispatchMark } from "./mainland-dispatch-mark";
import { mainlandIconSizes } from "./metadata-contract";

export const dynamic = "force-static";
export const size = {
  width: mainlandIconSizes.apple,
  height: mainlandIconSizes.apple,
} as const;
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <MainlandDispatchMark
      borderRadius={0}
      fontSize={68}
      ruleWidth={4}
      secondRuleLeft="23%"
    />,
    size
  );
}
