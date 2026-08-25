import { render, screen } from "@testing-library/react";
import { TodayDate } from "./today-date";

describe("TodayDate", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-08-25T16:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("uses an ASCII US English date", () => {
    render(<TodayDate />);
    expect(screen.getByText("AUG 25, 2026 -")).toBeInTheDocument();
  });
});
