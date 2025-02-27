import DOMPurify from "dompurify";

type SummaryProps = {
  summary: string;
  isClamped: boolean;
};

export const SummarySanitized = ({ summary, isClamped }: SummaryProps) => {
  const sanitizedSummary = DOMPurify.sanitize(summary);

  return (
    <p
      className={isClamped ? "line-clamp-2" : ""}
      dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
    />
  );
};
