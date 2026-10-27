import { Link, createFileRoute } from "@tanstack/react-router";
import { ContactCta } from "@/components/ContactCta";
import {
  BrandsSection,
  CertificationSection,
} from "@/components/CredentialsAndBrands";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
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
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
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
          <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
      <CertificationSection />
      <BrandsSection />
      <ContactCta />
    </main>
  );
}
