import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
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
      { name: "description", content: "Contact Al Naseeb Technical Services in Ajman for CCTV and technical service enquiries." },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { service } = Route.useSearch();
  const ref = useReveal<HTMLElement>();
  const mapQuery = encodeURIComponent(COMPANY.address);
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
  const emailHref = `mailto:${COMPANY.email}${service ? `?subject=${encodeURIComponent(`Enquiry about ${service}`)}` : ""}`;

  return (
    <main ref={ref}>
      <section data-reveal-group className="mx-auto max-w-7xl px-6 pb-16 pt-32 sm:pb-20">
        <div className="max-w-3xl">
          <h1 data-reveal className="text-4xl font-semibold leading-[1.05] sm:text-6xl">Let&apos;s talk about your project.</h1>
          <p data-reveal className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Contact Al Naseeb Technical Services to discuss your security and technical service needs.</p>
          {service && <p data-reveal className="mt-6 inline-flex flex-wrap rounded-full border border-border bg-surface px-5 py-3 text-sm">Enquiry about:<span className="ml-2 font-medium text-primary">{service}</span></p>}
        </div>
      </section>

      <section data-reveal-group aria-label="Contact information and map" className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 lg:grid-cols-[0.9fr_1.1fr] sm:pb-32">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <section data-reveal className="rounded-2xl border border-border bg-card p-6 sm:p-7">
            <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary"><Phone size={18} /></span><h2 className="text-xl font-semibold">Call or message</h2></div>
            <ul className="mt-5 space-y-3">
              {COMPANY.phones.map((phone) => <li key={phone.tel}><a href={`tel:${phone.tel}`} className="text-lg text-muted-foreground transition-colors hover:text-foreground">{phone.display}</a></li>)}
            </ul>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} className="btn-primary mt-6" target="_blank" rel="noreferrer">Message on WhatsApp <ArrowUpRight size={16} aria-hidden="true" /></a>
          </section>
          <section data-reveal className="rounded-2xl border border-border bg-card p-6 sm:p-7">
            <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary"><MapPin size={18} /></span><h2 className="text-xl font-semibold">Visit us</h2></div>
            <p className="mt-5 leading-7 text-muted-foreground">{COMPANY.address}</p>
            <a href={directionsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">Get directions <ArrowUpRight size={14} aria-hidden="true" /></a>
            <div className="mt-6 flex items-start gap-3"><Mail size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" /><a href={emailHref} className="break-all text-muted-foreground hover:text-foreground">{COMPANY.email}</a></div>
            <div className="mt-5 flex items-start gap-3"><Clock3 size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" /><p className="text-sm leading-6 text-muted-foreground"><span className="font-medium text-foreground">Business hours</span><br />{COMPANY.hours}</p></div>
          </section>
        </div>

        <div data-reveal className="min-h-[360px] overflow-hidden rounded-2xl border border-border bg-surface sm:min-h-[480px]">
          <iframe title="Google Maps search for Al Naseeb Technical Services in Al Muwaihat 3, Ajman" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[360px] w-full border-0 sm:min-h-[480px]" allowFullScreen />
        </div>
      </section>
    </main>
  );
}
