import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ContactCta } from "@/components/ContactCta";
import { getService } from "@/lib/services";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) {
      throw notFound();
    }
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.service.name ?? "Service"} | ANTECH` },
      {
        name: "description",
        content:
          loaderData?.service.short ??
          "Technical services from ANTECH in Ajman.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { service } = Route.useLoaderData();
  const ref = useReveal<HTMLElement>();

  return (
    <main>
      <section
        ref={ref}
        data-reveal-group
        className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pb-32"
      >
        <Link
          data-reveal
          to="/services"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          <span aria-hidden="true">←</span> All services
        </Link>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow">ANTECH services</p>
            <h1 className="mt-5 text-5xl font-semibold sm:text-7xl">
              {service.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {service.intro}
            </p>
            <Link
              to="/contact"
              search={{ service: service.name }}
              className="btn-primary mt-8"
            >
              Enquire about this service <span aria-hidden="true">→</span>
            </Link>
          </div>
          <img
            data-reveal
            src={service.image}
            alt={`${service.name} installation`}
            width={1280}
            height={832}
            className="aspect-[16/10] w-full rounded-2xl border border-border object-cover"
          />
        </div>
        <div className="mt-20 grid gap-12 border-t border-border pt-12 md:grid-cols-2">
          <section data-reveal>
            <h2 className="text-2xl font-semibold">Applications</h2>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              {service.applications.map((application) => (
                <li key={application} className="flex gap-3">
                  <span className="text-primary" aria-hidden="true">
                    →
                  </span>
                  {application}
                </li>
              ))}
            </ul>
          </section>
          <section data-reveal>
            <h2 className="text-2xl font-semibold">Service includes</h2>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-primary" aria-hidden="true">
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
      <ContactCta />
    </main>
  );
}
