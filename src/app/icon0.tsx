import { ImageResponse } from "next/og";
import { MainlandDispatchMark } from "./mainland-dispatch-mark";

export const dynamic = "force-static";
export const size = { width: 48, height: 48 } as const;
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <MainlandDispatchMark
      borderRadius={10}
      fontSize={18}
      ruleWidth={1}
      secondRuleLeft="24%"
    />,
    size
  );
}
