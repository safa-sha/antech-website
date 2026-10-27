import { useEffect, useRef } from "react";

/** Staggered fade-up of elements marked [data-reveal] inside the container, on scroll. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>("[data-reveal-group]", el)
          .concat(el.matches("[data-reveal-group]") ? [el] : [])
          .forEach((group) => {
            const items = group.querySelectorAll("[data-reveal]");
            gsap.from(items, {
              y: 20,
              opacity: 0,
              scale: group.hasAttribute("data-reveal-scale") ? 0.985 : 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: group,
                start: "top 82%",
                once: true,
              },
            });
          });
      }, el);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);
  return ref;
}
