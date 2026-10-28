import { Link } from "@tanstack/react-router";
import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import fallbackImg from "@/assets/svc-security1.jpg";
import type { SceneState } from "./CameraScene";

const CameraScene = lazy(() => import("./CameraScene"));

class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const state = useRef<SceneState>({
    progress: 0,
    mouseX: 0,
    mouseY: 0,
    reduced: false,
  }).current;
  const [mode, setMode] = useState<"pending" | "3d" | "image">("pending");

  useEffect(() => {
    state.reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setMode(hasWebGL() ? "3d" : "image");

    const onMove = (e: PointerEvent) => {
      state.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      state.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    if (!state.reduced)
      window.addEventListener("pointermove", onMove, { passive: true });

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        if (!state.reduced) {
          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
          tl.from(
            ".hero-eyebrow",
            { y: 12, opacity: 0, duration: 0.45 },
            0.7,
          )
            .from(
              ".hero-line > span",
              { yPercent: 110, duration: 1.3, stagger: 0.12 },
              1.2,
            )
            .from(".hero-copy", { y: 20, opacity: 0, duration: 1 }, 1.75)
            .from(
              ".hero-cta > *",
              { y: 20, opacity: 0, duration: 0.9, stagger: 0.1 },
              1.9,
            );
        }
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            state.progress = self.progress;
          },
        });
        gsap.to(".hero-text", {
          opacity: 0,
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "40% top",
            scrub: true,
          },
        });
        gsap.fromTo(
          ".hero-next",
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "35% top",
              end: "75% top",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          ".hero-wire",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "45% top",
              end: "90% top",
              scrub: true,
            },
          },
        );
      }, root);
    })();
    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", onMove);
      ctx?.revert();
    };
  }, [state]);

  const fallback = (
    <img
      src={fallbackImg}
      alt="White bullet CCTV security camera mounted on a wall at night"
      width={1280}
      height={832}
      className="h-full w-full object-contain opacity-70"
    />
  );

  return (
    <section
      ref={root}
      className="hero-theme relative h-[230vh]"
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-vignette" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div
          className="absolute right-[-8%] top-[5%] z-0 h-[90%] w-[70%] md:right-[-4%] md:w-[68%] max-md:right-[-29%] max-md:top-[38%] max-md:h-[62%] max-md:w-[94%] max-md:opacity-60 max-sm:right-[-10%] max-sm:top-[62%] max-sm:h-[38%] max-sm:w-[78%] max-sm:opacity-50"
          aria-hidden={mode === "3d"}
        >
          {mode === "3d" && (
            <SceneBoundary fallback={fallback}>
              <Suspense fallback={null}>
                <CameraScene state={state} />
              </Suspense>
            </SceneBoundary>
          )}
          {mode === "image" && fallback}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-fade" />

        <div className="hero-text relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 max-md:justify-center max-md:pt-24">
          <p className="hero-eyebrow mb-4 text-base font-semibold tracking-wide text-muted-foreground md:text-[1.0625rem]">
            Ajman Police Approved CCTV Installer
          </p>
          <h1 className="max-w-[min(60vw,44rem)] text-[clamp(2.1rem,9.5vw,3rem)] font-semibold leading-[0.94] max-md:max-w-full md:text-[4.25rem] lg:text-[5.25rem]">
            <span className="hero-line block overflow-hidden">
              <span className="block">Your security</span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="block">is our</span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="block">responsibility.</span>
            </span>
          </h1>
          <p className="hero-copy mt-6 max-w-lg text-base leading-relaxed text-muted-foreground max-md:mt-5 sm:text-lg">
            Surveillance, access control, networking and technical services from
            ANTECH — Al Naseeb Technical Services, Ajman.
          </p>
          <div className="hero-cta pointer-events-auto mt-8 flex flex-wrap items-center gap-4 max-md:mt-6">
            <div>
              <Link to="/contact" className="btn-primary hero-button">
                Make an enquiry →
              </Link>
            </div>
            <div>
              <Link to="/services" className="btn-ghost hero-button">
                Explore services
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-next pointer-events-none absolute inset-x-0 bottom-[12vh] z-10 mx-auto max-w-7xl px-6 opacity-0">
          <p className="max-w-2xl font-display text-3xl leading-tight sm:text-5xl">
            One partner for the systems that keep your premises protected and
            connected.
          </p>
          <div className="hero-wire mt-10 h-px origin-left bg-line" />
        </div>
      </div>
    </section>
  );
}
