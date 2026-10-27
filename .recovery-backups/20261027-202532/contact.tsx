import { createFileRoute } from "@tanstack/react-router";
import { COMPANY } from "@/lib/services";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => {
    const service = search["service"];
    return typeof service === "string" ? { service } : {};
  },
  head: () => ({
    meta: [
      { title: "Contact ANTECH | Al Naseeb Technical Services" },
      {
        name: "description",
        content:
          "Contact Al Naseeb Technical Services in Ajman for CCTV and technical service enquiries.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { service } = Route.useSearch();
  const ref = useReveal<HTMLElement>();

  return (
    <main
      ref={ref}
      data-reveal-group
      className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pb-32"
    >
      <p data-reveal className="eyebrow">
        Get in touch
      </p>
      <h1
        data-reveal
        className="mt-5 max-w-3xl text-5xl font-semibold sm:text-7xl"
      >
        Let&apos;s talk about your project.
      </h1>
      <p data-reveal className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Contact Al Naseeb Technical Services to discuss your security and
        technical service needs.
      </p>
      {service && (
        <p
          data-reveal
          className="mt-8 inline-flex rounded-full border border-border bg-surface px-5 py-3 text-sm"
        >
          Enquiry about:{" "}
          <span className="ml-2 font-medium text-primary">{service}</span>
        </p>
      )}
      <div data-reveal className="mt-14 grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-semibold">Call or message</h2>
          <ul className="mt-6 space-y-4">
            {COMPANY.phones.map((phone) => (
              <li key={phone.tel}>
                <a
                  href={`tel:${phone.tel}`}
                  className="text-lg text-muted-foreground hover:text-foreground"
                >
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            className="btn-primary mt-8"
            target="_blank"
            rel="noreferrer"
          >
            Message on WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </section>
        <section className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-semibold">Visit or email</h2>
          <a
            href={COMPANY.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block text-muted-foreground hover:text-foreground"
          >
            {COMPANY.address}
          </a>
          <a
            href={`mailto:${COMPANY.email}${service ? `?subject=${encodeURIComponent(`Enquiry about ${service}`)}` : ""}`}
            className="mt-4 block text-muted-foreground hover:text-foreground"
          >
            {COMPANY.email}
          </a>
          <p className="mt-8 text-sm text-muted-foreground">
            Business hours: {COMPANY.hours}
          </p>
        </section>
      </div>
    </main>
  );
}
