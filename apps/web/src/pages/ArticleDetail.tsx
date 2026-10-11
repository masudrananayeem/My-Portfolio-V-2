import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Loader,
  EmptyState,
  LinkButton,
} from "@nayeem/ui";
import {
  ArrowLeft,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { createDocument, COLLECTIONS } from "@nayeem/firebase";
import { useArticles } from "../hooks/useFirestoreData";

export function ArticleDetail() {
  const { slug } = useParams();
  const { data, loading } = useArticles();
  const article = (data ?? []).find((item) => item.slug === slug);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanComment = comment.trim();

    if (!cleanName || !cleanEmail || !cleanComment) {
      setFeedback({ type: "error", message: "Please fill in all fields." });
      return;
    }

    if (cleanComment.length > 3000) {
      setFeedback({
        type: "error",
        message: "Please keep your comment under 3,000 characters.",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Store the comment in the existing admin Messages inbox format.
      // The email is visible to admins only; it is not rendered publicly.
      await createDocument(COLLECTIONS.messages, {
        name: cleanName,
        email: cleanEmail,
        subject: `Article comment: ${article?.title ?? slug ?? "Article"}`,
        message: [
          `Type: Article comment`,
          `Article: ${article?.title ?? "Unknown article"}`,
          `Article slug: ${slug ?? "unknown"}`,
          "",
          cleanComment,
        ].join("\n"),
        status: "unread",
        createdAt: new Date().toISOString(),
      });

      setName("");
      setEmail("");
      setComment("");
      setFeedback({
        type: "success",
        message: "Your comment was sent successfully. Thanks for sharing your thoughts!",
      });
    } catch (error) {
      console.error("Unable to submit article comment:", error);
      setFeedback({
        type: "error",
        message:
          "Your comment could not be sent. Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader label="LOADING ARTICLE…" />
      </div>
    );
  }

  if (!article) {
    return (
      <Container className="py-24">
        <EmptyState title="ARTICLE NOT FOUND" />
        <Link
          to="/articles"
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-accent-cyan"
        >
          <ArrowLeft size={14} />
          BACK TO ARTICLES
        </Link>
      </Container>
    );
  }

  return (
    <main className="pb-20 sm:pb-28">
      <Container className="py-10 sm:py-16">
        <Link
          to="/articles"
          className="group inline-flex items-center gap-2 font-mono text-xs text-foreground-muted transition-colors hover:text-accent-cyan"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          BACK TO ARTICLES
        </Link>

        {article.coverImage?.url && (
          <img
            src={article.coverImage.url}
            alt={article.title}
            loading="eager"
            decoding="async"
            className="mt-8 block max-h-[620px] w-full rounded-2xl border border-base-border bg-base-surface object-contain"
          />
        )}

        <article className="mx-auto mt-10 max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan">
            {article.category} {article.readingTime ? `· ${article.readingTime}` : ""}
          </p>

          <h1 className="mt-3 break-words font-display text-3xl font-bold leading-tight sm:text-5xl">
            {article.title}
          </h1>

          {article.publishedAt && (
            <p className="mt-4 font-mono text-xs text-foreground-muted">
              {article.publishedAt}
            </p>
          )}

          <div className="mt-10 whitespace-pre-line text-base leading-8 text-foreground-muted">
            {article.content}
          </div>
        </article>

        {/* Article comments */}
        <section
          aria-labelledby="article-comments-heading"
          className="mx-auto mt-16 max-w-4xl border-t border-base-border pt-10 sm:mt-20 sm:pt-14"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent-cyan/20 bg-accent-cyan/10">
              <MessageCircle size={22} className="text-accent-cyan" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan">
                YOUR THOUGHTS MATTER
              </p>
              <h2
                id="article-comments-heading"
                className="mt-2 font-display text-2xl font-semibold sm:text-3xl"
              >
                Join the Discussion
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-muted">
                Have a thought or question about this article? Leave a comment
                below. Your comment will be sent to the site admin for review.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-base-border bg-base-surface p-5 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="comment-name"
                  className="mb-2 block font-mono text-xs text-foreground-muted"
                >
                  YOUR NAME
                </label>
                <input
                  id="comment-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-base-border bg-base-bg px-4 py-3 text-sm outline-none transition-colors placeholder:text-foreground-muted/60 focus:border-accent-cyan"
                />
              </div>

              <div>
                <label
                  htmlFor="comment-email"
                  className="mb-2 block font-mono text-xs text-foreground-muted"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="comment-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-base-border bg-base-bg px-4 py-3 text-sm outline-none transition-colors placeholder:text-foreground-muted/60 focus:border-accent-cyan"
                />
                <p className="mt-2 text-xs text-foreground-muted">
                  Your email will only be included in the message sent to the
                  admin; it will not appear on the article page.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="comment-message"
                  className="font-mono text-xs text-foreground-muted"
                >
                  YOUR COMMENT
                </label>
                <span className="font-mono text-[10px] text-foreground-muted">
                  {comment.length}/3000
                </span>
              </div>
              <textarea
                id="comment-message"
                name="comment"
                required
                rows={6}
                maxLength={3000}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Share your thoughts about this article..."
                className="w-full resize-y rounded-xl border border-base-border bg-base-bg px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-foreground-muted/60 focus:border-accent-cyan"
              />
            </div>

            {feedback && (
              <div
                role="status"
                aria-live="polite"
                className={`mt-5 flex items-start gap-2 rounded-xl border p-3 text-sm ${
                  feedback.type === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/30 bg-red-500/10 text-red-300"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={17} className="mt-0.5 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 border-t border-base-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-xs leading-5 text-foreground-muted">
                Comments are reviewed by the site admin before any public
                display.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent-cyan/30 bg-accent-cyan px-5 py-3 font-mono text-xs font-semibold tracking-wider text-slate-950 transition-colors hover:bg-accent-cyan/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={14} />
                {submitting ? "SENDING..." : "SUBMIT COMMENT"}
              </button>
            </div>
          </form>
        </section>

        <div className="mx-auto mt-10 max-w-4xl">
          <LinkButton href="/articles" variant="ghost">
            <ArrowLeft size={14} />
            MORE ARTICLES
          </LinkButton>
        </div>
      </Container>
    </main>
  );
}
