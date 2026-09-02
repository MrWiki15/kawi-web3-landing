import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders inline markdown links inside post copy. Internal links use the router
 * so the crawler and the user follow the same URL and the topic cluster stays
 * connected; anything external falls back to a plain anchor, which the global
 * external-link policy still guards.
 */
const RichText = ({ text }: { text: string }): ReactNode => {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(text.slice(cursor, index));

    const [full, label, href] = match;
    const className =
      "text-foreground underline decoration-secondary decoration-2 underline-offset-4 hover:text-primary transition-colors";

    nodes.push(
      href.startsWith("/") ? (
        <Link key={key++} to={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={key++} href={href} className={className}>
          {label}
        </a>
      ),
    );

    cursor = index + full.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));

  return (
    <>
      {nodes.map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
    </>
  );
};

export default RichText;
