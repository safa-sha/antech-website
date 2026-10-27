import { Link } from "@tanstack/react-router";
import { COMPANY } from "@/lib/services";
import { useReveal } from "@/hooks/use-reveal";

export function ContactCta() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      data-reveal-group
      className="dark-panel relative overflow-hidden py-32"
    >
      <div className="absolute inset-0 bg-vignette" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p data-reveal className="eyebrow">
          Start a project
        </p>
        <h2 data-reveal className="mt-6 text-4xl font-semibold sm:text-6xl">
          Tell us what you need to protect.
        </h2>
        <div
          data-reveal
          className="mt-10 flex [&>*]:shrink-0 flex-wrap justify-center gap-3"
        >
          <Link to="/contact" className="btn-primary">
            Make an enquiry →
          </Link>
          <a href={`tel:${COMPANY.phones[0]!.tel}`} className="btn-ghost">
            Call {COMPANY.phones[0]!.display}
          </a>
        </div>
      </div>
    </section>
  );
}
