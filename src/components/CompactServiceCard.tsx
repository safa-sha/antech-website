import { Link } from "@tanstack/react-router";
import type { Service } from "@/lib/services";

export function CompactServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <div data-reveal className="h-full">
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_16px_36px_-16px_rgba(23,25,28,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface">
          <img
            src={service.image}
            alt={`${service.name} installation`}
            loading="lazy"
            width={720}
            height={450}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
          <span className="absolute left-3.5 top-3.5 inline-flex items-center rounded-md border border-white/60 bg-white/90 px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider text-primary shadow-xs backdrop-blur-xs">
            0{index + 1}
          </span>
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {service.name}
            </h3>
          </div>
          <p className="mt-2.5 flex-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {service.short}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs font-semibold text-foreground">
            <span className="transition-colors group-hover:text-primary">
              Learn more
            </span>
            <span
              className="text-primary transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              �
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
