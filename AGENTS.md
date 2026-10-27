<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Business data (services, contact) lives only in src/lib/services.ts; pages read from it so facts stay in one place.
- The hero 3D scene is lazy-loaded client-side with a WebGL check and error boundary falling back to an image, so it never renders blank or on the server.
- GSAP scroll animations must target wrapper elements, not elements with CSS transform transitions, to avoid fighting transitions.
