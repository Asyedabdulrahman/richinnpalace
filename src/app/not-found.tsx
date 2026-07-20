import Link from "next/link";

export const metadata = {
  title: "Sanctuary Not Found | SÉRA Jaipur",
  description: "The chamber you are looking for does not exist or has been quietly archived.",
};

export default function NotFound() {
  return (
    <div className="bg-bg-dark min-h-screen flex items-center justify-center font-sans text-center px-6">
      <div className="space-y-8 max-w-md">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gold font-medium">
          ERROR 404
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-text-offwhite font-light tracking-wide">
          Sanctuary <br />
          not found.
        </h1>
        <p className="font-sans text-xs md:text-sm text-text-gray font-light leading-relaxed max-w-xs mx-auto">
          The path you have followed leads to an uncarved space. It may have been renamed or quietly retired.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-gold text-bg-dark text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-gold-hover transition-colors"
          >
            Return to Sanctuary
          </Link>
        </div>
      </div>
    </div>
  );
}
