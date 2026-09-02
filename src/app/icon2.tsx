import { ImageResponse } from "next/og";
import { MainlandDispatchMark } from "./mainland-dispatch-mark";
import { mainlandIconSizes } from "./metadata-contract";

export const dynamic = "force-static";
export const size = {
  width: mainlandIconSizes.app,
  height: mainlandIconSizes.app,
} as const;
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
