import RevealOnScroll from "./RevealOnScroll";

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  light = false,
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <RevealOnScroll direction="up" className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}>
      {kicker && (
        <span
          className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] ${
            light ? "text-gold-300" : "text-gold-600"
          }`}
        >
          {kicker}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      <div className="divider-gold w-20" />
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? "text-white/75" : "text-navy-700/80"}`}>
          {description}
        </p>
      )}
    </RevealOnScroll>
  );
}
