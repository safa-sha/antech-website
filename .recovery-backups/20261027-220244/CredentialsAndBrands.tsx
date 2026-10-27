import { useReveal } from "@/hooks/use-reveal";

const brands = [
  { name: "Hikvision", src: "/images/partners/hikvision.png" },
  { name: "Dahua", src: "/images/partners/dahua.png" },
  { name: "TP-Link", src: "/images/partners/tp-link.png" },
  { name: "D-Link", src: "/images/partners/d-link.png" },
  { name: "ZKTeco", src: "/images/partners/zkteco.png" },
];

export function CertificationSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-reveal-group
      data-reveal-scale
      aria-labelledby="certification-heading"
      className="bg-background text-foreground"
    >
      <div
        data-reveal
        className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:gap-16"
      >
        <div>
          <p className="eyebrow">Credentials</p>
          <h2
            id="certification-heading"
            className="mt-4 text-4xl font-semibold sm:text-5xl"
          >
            Our Certification
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Ajman Police issued this certificate for CCTV surveillance
            installation by Al Naseeb Technical Services. The certificate
            displayed lists an expiry date of 12 November 2025; current
            certification status has not been confirmed.
          </p>
          <a
            href="/images/ajman-police-certificate.png"
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-7"
          >
            View Certificate <span aria-hidden="true">↗</span>
          </a>
        </div>
        <a
          href="/images/ajman-police-certificate.png"
          target="_blank"
          rel="noreferrer"
          aria-label="View the full Ajman Police certificate (opens in a new tab)"
          className="block w-full max-w-xl justify-self-center rounded-xl border border-border bg-white p-2 transition-shadow hover:shadow-md"
        >
          <img
            src="/images/ajman-police-certificate.png"
            alt="Ajman Police certificate of civil service provider for Al Naseeb Technical Services; listed expiry date 12 November 2025"
            width={1240}
            height={877}
            loading="lazy"
            className="aspect-[1240/877] w-full rounded-md object-contain"
          />
        </a>
      </div>
    </section>
  );
}

export function BrandsSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-reveal-group
      aria-labelledby="brands-heading"
      className="border-t border-border bg-surface text-foreground"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <p data-reveal className="eyebrow">
            Technology we work with
          </p>
          <h2
            data-reveal
            id="brands-heading"
            className="mt-4 text-3xl font-semibold sm:text-4xl"
          >
            Brands We Work With
          </h2>
        </div>
        <ul className="mt-10 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-10">
          {brands.map((brand) => (
            <li
              key={brand.name}
              data-reveal
              className="flex h-20 w-40 items-center justify-center sm:h-24 sm:w-48"
            >
              <img
                src={brand.src}
                alt={`${brand.name} logo`}
                loading="lazy"
                className="h-full w-44 max-w-full object-contain mix-blend-multiply"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
