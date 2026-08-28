import type { ReactElement } from "react";

type MainlandDispatchMarkProps = Readonly<{
  borderRadius: number;
  fontSize: number;
  ruleWidth: number;
  secondRuleLeft: `${number}%`;
}>;

export function MainlandDispatchMark({
  borderRadius,
  fontSize,
  ruleWidth,
  secondRuleLeft,
}: MainlandDispatchMarkProps): ReactElement {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius,
        backgroundColor: "#f3f0e8",
        color: "#17201d",
        fontFamily: "serif",
        fontSize,
        fontWeight: 700,
        letterSpacing: "-0.08em",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "17%",
          width: ruleWidth,
          backgroundColor: "#bd382d",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: secondRuleLeft,
          width: ruleWidth,
          backgroundColor: "#bd382d",
        }}
      />
      <span style={{ marginLeft: "12%" }}>MD</span>
    </div>
  );
}
