import type { Metadata } from "next";
import { LedgerLayout } from "@/components/features/ledger";
import { getPublishedArticles } from "@/lib/articles";
import { getMockArticles } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Ledger — Cross Wave Media",
  description:
    "Scripture-linked news, theological analysis, and daily devotionals from Cross Wave Media.",
};

export default async function LedgerPage() {
  const dbArticles = await getPublishedArticles();
  const mockArticles = getMockArticles();
  const dbIds = new Set(dbArticles.map((a) => a.id));
  const uniqueMocks = mockArticles.filter((a) => !dbIds.has(a.id));
  const articles = [...dbArticles, ...uniqueMocks];

  return <LedgerLayout articles={articles} />;
}

