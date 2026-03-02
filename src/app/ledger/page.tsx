import type { Metadata } from "next";
import { LedgerLayout } from "@/components/features/ledger";
import { getMockArticles } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Ledger — Cross Wave Media",
  description:
    "Scripture-linked news, theological analysis, and daily devotionals from Cross Wave Media.",
};

export default function LedgerPage() {
  const articles = getMockArticles();

  return <LedgerLayout articles={articles} />;
}

