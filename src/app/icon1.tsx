import { ImageResponse } from "next/og";
import { MainlandDispatchMark } from "./mainland-dispatch-mark";

export const dynamic = "force-static";
export const size = { width: 192, height: 192 } as const;
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <MainlandDispatchMark
      borderRadius={40}
      fontSize={72}
      ruleWidth={4}
      secondRuleLeft="23%"
    />,
    size
  );
}
