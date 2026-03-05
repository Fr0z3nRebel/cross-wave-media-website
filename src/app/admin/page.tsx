"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminArticleForm } from "@/components/admin/AdminArticleForm";
import { AdminResourceForm } from "@/components/admin/AdminResourceForm";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";
import type { Resource } from "@/lib/data/mockResources";

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [articleDialogOpen, setArticleDialogOpen] = useState(false);
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  async function loadArticles() {
    setArticlesLoading(true);
    try {
      const res = await fetch("/api/admin/articles");
      if (res.ok) {
        const { articles: data } = (await res.json()) as { articles: Article[] };
        setArticles(data ?? []);
      }
    } finally {
      setArticlesLoading(false);
    }
  }

  async function loadResources() {
    setResourcesLoading(true);
    try {
      const res = await fetch("/api/admin/resources");
      if (res.ok) {
        const { resources: data } = (await res.json()) as {
          resources: Resource[];
        };
        setResources(data ?? []);
      }
    } finally {
      setResourcesLoading(false);
    }
  }

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    loadResources();
  }, []);

  async function handleDeleteArticle(id: string) {
    if (!confirm("Delete this article?")) return;
    const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    if (res.ok) loadArticles();
  }

  async function handleDeleteResource(id: string) {
    if (!confirm("Delete this resource?")) return;
    const res = await fetch(`/api/admin/resources/${id}`, {
      method: "DELETE",
    });
    if (res.ok) loadResources();
  }

  return (
    <main className="bg-background">
      <section className="border-b border-muted-border py-12 dark:border-muted-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-teal dark:text-brand-gold">
            Admin
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Post to The Ledger and the Resource Library. Changes appear on the
            public site when published.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="ledger" className="space-y-6">
            <TabsList aria-label="Admin sections">
              <TabsTrigger value="ledger">The Ledger</TabsTrigger>
              <TabsTrigger value="resources">Resource Library</TabsTrigger>
            </TabsList>

            <TabsContent value="ledger" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  Ledger articles
                </h2>
                <Dialog
                  open={articleDialogOpen}
                  onOpenChange={(open) => {
                    setArticleDialogOpen(open);
                    if (!open) setEditingArticle(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setEditingArticle(null)}
                      className={cn(
                        "inline-flex items-center justify-center rounded-full border border-accent-teal/60 bg-accent-teal/10 px-4 py-2 text-sm font-medium text-accent-teal transition-colors hover:bg-accent-teal/20",
                        "dark:border-brand-gold/70 dark:bg-brand-gold/90 dark:text-brand-navy dark:hover:bg-brand-gold",
                      )}
                    >
                      New article
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingArticle ? "Edit article" : "New article"}
                      </DialogTitle>
                    </DialogHeader>
                    <AdminArticleForm
                      key={editingArticle?.id ?? "new"}
                      article={editingArticle}
                      onSuccess={() => {
                        setArticleDialogOpen(false);
                        setEditingArticle(null);
                        loadArticles();
                      }}
                      onCancel={() => {
                        setArticleDialogOpen(false);
                        setEditingArticle(null);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {articlesLoading ? (
                <p className="text-sm text-muted-foreground">
                  Loading articles…
                </p>
              ) : articles.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No articles yet. Create one above.
                </p>
              ) : (
                <ul className="space-y-2">
                  {articles.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center justify-between rounded-lg border border-muted-border bg-card/50 px-4 py-3"
                    >
                      <div>
                        <span className="font-medium text-foreground">
                          {a.title}
                        </span>
                        <span
                          className={cn(
                            "ml-2 text-xs",
                            a.status === "Published"
                              ? "text-accent-teal dark:text-brand-gold"
                              : "text-muted-foreground",
                          )}
                        >
                          {a.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingArticle(a);
                            setArticleDialogOpen(true);
                          }}
                          className="text-xs font-medium text-accent-teal hover:underline dark:text-brand-gold"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteArticle(a.id)}
                          className="text-xs font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  Resource Library
                </h2>
                <Dialog
                  open={resourceDialogOpen}
                  onOpenChange={(open) => {
                    setResourceDialogOpen(open);
                    if (!open) setEditingResource(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setEditingResource(null)}
                      className={cn(
                        "inline-flex items-center justify-center rounded-full border border-accent-teal/60 bg-accent-teal/10 px-4 py-2 text-sm font-medium text-accent-teal transition-colors hover:bg-accent-teal/20",
                        "dark:border-brand-gold/70 dark:bg-brand-gold/90 dark:text-brand-navy dark:hover:bg-brand-gold",
                      )}
                    >
                      New resource
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingResource ? "Edit resource" : "New resource"}
                      </DialogTitle>
                    </DialogHeader>
                    <AdminResourceForm
                      key={editingResource?.id ?? "new"}
                      resource={editingResource}
                      onSuccess={() => {
                        setResourceDialogOpen(false);
                        setEditingResource(null);
                        loadResources();
                      }}
                      onCancel={() => {
                        setResourceDialogOpen(false);
                        setEditingResource(null);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {resourcesLoading ? (
                <p className="text-sm text-muted-foreground">
                  Loading resources…
                </p>
              ) : resources.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No resources yet. Create one above.
                </p>
              ) : (
                <ul className="space-y-2">
                  {resources.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center justify-between rounded-lg border border-muted-border bg-card/50 px-4 py-3"
                    >
                      <div>
                        <span className="font-medium text-foreground">
                          {r.title}
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {r.type}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingResource(r);
                            setResourceDialogOpen(true);
                          }}
                          className="text-xs font-medium text-accent-teal hover:underline dark:text-brand-gold"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteResource(r.id)}
                          className="text-xs font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
