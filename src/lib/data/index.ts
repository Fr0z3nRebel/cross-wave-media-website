// Re-export Ledger mock articles from the root-level data module
// so features can consume them via the `@/lib/data` alias.
export {
  mockArticles,
  getMockArticles,
  getArticleBySlug,
  getArticleById,
} from "../../../lib/data/mockArticles";

