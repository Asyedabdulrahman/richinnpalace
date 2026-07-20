import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-bg-dark min-h-screen flex flex-col items-center justify-center font-sans space-y-6">
      <div className="flex flex-col items-center space-y-3">
        <span className="font-serif text-3xl md:text-4xl tracking-[0.3em] text-gold font-light animate-pulse">
          Rich Inn Palace
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-text-gray font-light">
          Preparing your sanctuary...
        </span>
      </div>
      <Loader2 className="animate-spin text-gold/60 stroke-[1.25]" size={20} />
    </div>
  );
}
