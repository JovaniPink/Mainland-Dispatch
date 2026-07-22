import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved reading",
  description: "A private, browser-local Mainland Dispatch reading list.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function SavedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
