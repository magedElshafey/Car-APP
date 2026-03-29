import React, { useMemo } from "react";
import DOMPurify from "dompurify";

type Props = {
  html?: string | null;
  className?: string;
  sanitize?: boolean;
};

const HtmlConverter: React.FC<Props> = ({
  html,
  className = "",
  sanitize = true,
}) => {
  const raw = String(html ?? "");

  const safeHtml = useMemo(() => {
    if (!sanitize) return raw;
    return DOMPurify.sanitize(raw);
  }, [raw, sanitize]);

  if (!safeHtml) return null;

  return (
    <div
      className={[className].join(" ")}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
};

export default React.memo(HtmlConverter);
