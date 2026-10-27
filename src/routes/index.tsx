import { Link, createFileRoute } from "@tanstack/react-router";
import { ContactCta } from "@/components/ContactCta";
import {
  BrandsSection,
  CertificationSection,
} from "@/components/CredentialsAndBrands";
import { Hero } from "@/components/Hero";
import { CompactServiceCard } from "@/components/CompactServiceCard";
import { SERVICES } from "@/lib/services";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ANTECH | Security, CCTV & Technical Services in Ajman" },
      {
        name: "description",
        content:
          "Explore CCTV, access control, time management, computer, networking and gate barrier services from ANTECH in Ajman.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const servicesRef = useReveal<HTMLElement>();

  return (
    <main>
      <Hero />
      <section ref={servicesRef} data-reveal-group className="service-section">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p data-reveal className="eyebrow">
                What we do
              </p>
              <h2
                data-reveal
                className="mt-4 max-w-2xl text-4xl font-semibold sm:text-6xl"
              >
                Systems that keep your premises protected and connected.
              </h2>
            </div>
            <Link
              to="/services"
              data-reveal
              className="btn-ghost w-fit shrink-0"
            >
              All services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <CompactServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section data-reveal-group className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div data-reveal>
              <p className="eyebrow">Why ANTECH?</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">Technical systems, considered together.</h2>
              <p className="mt-5 max-w-xl leading-7 text-muted-foreground">Explore connected services for premises, teams and the technology they use.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "A broad service range", text: "Security, access, attendance, computers, networking and vehicle entry systems." },
                { title: "Site-aware planning", text: "Start with the premises and the needs the system is expected to address." },
                { title: "Systems that connect", text: "Consider how cameras, network infrastructure and access needs relate to one another." },
              ].map((reason, index) => (
                <article data-reveal key={reason.title} className="rounded-xl border border-border bg-card p-5 sm:p-6">
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{reason.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CertificationSection />
      <BrandsSection />
      <ContactCta />
    </main>
  );
}
