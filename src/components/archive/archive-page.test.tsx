import { render, screen } from "@testing-library/react";
import ArchivePage from "@/app/archive/page";

describe("Archive page information hierarchy", () => {
  it("places the evidence explorer before corpus transparency", () => {
    render(<ArchivePage />);

    const search = screen.getByLabelText("Search");
    const transparency = screen.getByText("Corpus transparency");
    expect(
      search.compareDocumentPosition(transparency) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
