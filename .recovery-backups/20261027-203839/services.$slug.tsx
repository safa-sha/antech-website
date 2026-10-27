import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ContactCta } from "@/components/ContactCta";
import { SERVICES, getService } from "@/lib/services";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.service.name ?? "Service"} | ANTECH` },
      { name: "description", content: loaderData?.service.short ?? "Technical services from ANTECH in Ajman." },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { service } = Route.useLoaderData();
  const pageRef = useReveal<HTMLElement>();
  const relatedServices = service.related
    .map((slug) => SERVICES.find((item) => item.slug === slug))
    .filter((item) => item && item.slug !== service.slug);

  return (
    <main ref={pageRef}>
      <section data-reveal-group className="mx-auto max-w-7xl px-6 pb-20 pt-32 sm:pb-24">
        <nav data-reveal aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/services" className="inline-flex items-center gap-2 transition-colors hover:text-foreground"><ArrowLeft size={15} /> All services</Link>
          <span aria-hidden="true">/</span><span aria-current="page">{service.name}</span>
        </nav>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">ANTECH services</p>
            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">{service.name}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{service.intro}</p>
            <Link to="/contact" search={{ service: service.name }} className="btn-primary mt-8">Enquire about this service <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
          <img data-reveal src={service.image} alt={`${service.name} service`} width={1280} height={832} className="aspect-[16/10] w-full rounded-2xl border border-border object-cover" />
        </div>
      </section>

      <section data-reveal-group className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div data-reveal>
            <p className="eyebrow">Service overview</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold sm:text-4xl">A considered setup for your premises.</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            {service.overview.map((paragraph) => <p data-reveal key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section data-reveal-group className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <p className="eyebrow">Solution areas</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">What to plan for</h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">The final scope depends on the premises, existing equipment and the needs discussed for your project.</p>
            <ul className="mt-7 divide-y divide-border border-y border-border">
              {service.includes.map((item) => <li key={item} className="flex gap-3 py-4 text-foreground"><Check size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}
            </ul>
          </div>
          <div data-reveal className="rounded-2xl border border-border bg-card p-7 sm:p-9">
            <p className="eyebrow">Where it can help</p>
            <h2 className="mt-4 text-3xl font-semibold">Applications and benefits</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Typical settings for this service include:</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {service.applications.map((application) => <li key={application} className="rounded-full border border-border bg-white px-4 py-2 text-sm">{application}</li>)}
            </ul>
            <ul className="mt-7 space-y-4 text-sm leading-6 text-muted-foreground">
              {service.benefits.map((benefit) => <li key={benefit} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />{benefit}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section data-reveal-group aria-labelledby="related-heading" className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <p data-reveal className="eyebrow">Explore more</p>
          <h2 data-reveal id="related-heading" className="mt-3 text-3xl font-semibold">Related services</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((related) => related && <Link data-reveal key={related.slug} to="/services/$slug" params={{ slug: related.slug }} className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
              <span><span className="block font-semibold text-foreground">{related.name}</span><span className="mt-1 block text-sm text-muted-foreground">{related.short}</span></span><ArrowRight size={18} className="ml-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
            </Link>)}
          </div>
        </div>
      </section>
      <ContactCta />
    </main>
  );
}
