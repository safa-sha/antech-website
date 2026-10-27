import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ANTECH | Al Naseeb Technical Services" },
      {
        name: "description",
        content:
          "CCTV, access control, networking and technical services from Al Naseeb Technical Services in Ajman, UAE.",
      },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteNav />
        <Outlet />
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-6 pt-24">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">
        That page does not exist.
      </h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        The page may have moved, or the address may be incorrect.
      </p>
      <a href="/" className="btn-primary mt-8 w-fit">
        Return home
      </a>
    </main>
  );
}
