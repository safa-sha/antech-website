import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function BrandLogo() {
  return (
    <img
      src="/images/logo.png"
      alt="Al Naseeb Technical Services (ANTECH)"
      width={1177}
      height={400}
      className="h-10 w-auto object-contain"
    />
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`site-nav fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "site-nav-scrolled" : ""}`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
      >
        <Link to="/" aria-label="ANTECH home" onClick={() => setOpen(false)}>
          <BrandLogo />
        </Link>
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="text-sm text-muted-foreground transition-colors hover:text-primary data-[status=active]:font-semibold data-[status=active]:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="btn-primary hidden !py-2.5 !text-sm md:inline-flex"
        >
          Enquire
        </Link>
        <button
          className="md:hidden p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`mt-1.5 block h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
          />
        </button>
      </nav>
      {open && (
        <div className="site-nav-menu border-t border-border md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-2xl"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
