import { createFileRoute } from "@tanstack/react-router";
import { ContactCta } from "@/components/ContactCta";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/lib/services";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services | ANTECH" },
      {
        name: "description",
        content:
          "CCTV security systems, access control, time management, computer services, networking and gate barriers in Ajman.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const headingRef = useReveal<HTMLElement>();
  const servicesRef = useReveal<HTMLElement>();

  return (
    <main>
      <section
        ref={headingRef}
        data-reveal-group
        className="mx-auto max-w-7xl px-6 pb-16 pt-32 sm:pb-20"
      >
        <h1
          data-reveal
          className="max-w-3xl text-4xl font-semibold sm:text-6xl"
        >
          Practical systems for safer, smarter spaces.
        </h1>
        <p data-reveal className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Explore our security, access, attendance and technical services for
          homes and businesses.
        </p>
      </section>
      <section
        ref={servicesRef}
        data-reveal-group
        className="service-section"
        aria-label="Available services"
      >
        <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32">
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </main>
  );
}
