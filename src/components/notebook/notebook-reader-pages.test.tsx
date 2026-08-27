import { render, screen } from "@testing-library/react";
import DominanceIsADashboardPage from "@/app/notebook/dominance-is-a-dashboard/page";
import OpenModelsClosedSystemPage from "@/app/notebook/open-models-closed-system/page";
import RoutingAroundRiskPage from "@/app/notebook/routing-around-risk/page";
import WhatGetsThroughPage from "@/app/notebook/what-gets-through/page";
import WhoAbsorbsTheShockPage from "@/app/notebook/who-absorbs-the-shock/page";
import WhatXiJinpingWantsPage from "@/app/notebook/what-xi-jinping-wants/page";

const pages = [
  ["Inquiry 01", WhatXiJinpingWantsPage],
  ["Inquiry 02", OpenModelsClosedSystemPage],
  ["Inquiry 03", DominanceIsADashboardPage],
  ["Inquiry 04", RoutingAroundRiskPage],
  ["Inquiry 05", WhoAbsorbsTheShockPage],
  ["Inquiry 06", WhatGetsThroughPage],
] as const;

describe("published Notebook reader routes", () => {
  it.each(pages)(
    "gives %s the shared thesis-first reader contract",
    (_, Page) => {
      const { container } = render(<Page />);

      const thesis = screen.getByTestId("working-thesis");
      const metadata = screen.getByTestId("notebook-metadata");
      expect(
        thesis.compareDocumentPosition(metadata) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
      expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Sections" })
      ).toBeInTheDocument();
      expect(container.querySelector('a[href="#sources"]')).toBeInTheDocument();
      expect(container.querySelector("section#sources")).toBeInTheDocument();
    }
  );
});
