import { Link } from "@tanstack/react-router";
import type { Service } from "@/lib/services";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <div data-reveal className="h-full">
      <article className="service-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={service.image}
            alt={`${service.name} installation`}
            loading="lazy"
            width={1280}
            height={832}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute left-5 top-5 font-mono text-xs text-primary">
            0{index + 1}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="min-h-14 text-2xl font-semibold leading-tight">
            {service.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
            {service.short}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <Link
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="text-sm font-medium text-foreground after:absolute after:inset-0"
            >
              Learn more{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/contact"
              search={{ service: service.name }}
              className="relative z-10 text-sm text-primary transition-colors hover:underline"
            >
              Enquire
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
