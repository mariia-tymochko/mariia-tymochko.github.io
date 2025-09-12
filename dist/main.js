/* Main site script: loads Markdown into sections, animations, and UX helpers */
function isExternalUrl(href) {
    try {
        const url = new URL(href, window.location.href);
        return url.origin !== window.location.origin;
    }
    catch {
        return false;
    }
}
async function loadMarkdownInto(el) {
    const src = el.dataset.mdSrc;
    if (!src)
        return;
    try {
        const res = await fetch(src, { cache: "no-cache" });
        if (!res.ok)
            throw new Error(`HTTP ${res.status} for ${src}`);
        const md = await res.text();
        // marked is provided via CDN script in index.html
        // @ts-ignore
        const html = typeof marked !== "undefined" ? marked.parse(md) : md;
        el.innerHTML = html;
        postProcessContent(el);
    }
    catch (err) {
        console.error(err);
        el.innerHTML = `<p style="color:#f88">Не вдалося завантажити контент. Спробуйте пізніше.</p>`;
    }
}
function postProcessContent(root) {
    // External links open in new tab
    root.querySelectorAll("a[href]").forEach((a) => {
        if (isExternalUrl(a.getAttribute("href") || "")) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
        }
    });
    // Lazy images
    root.querySelectorAll("img").forEach((img) => {
        img.loading = "lazy";
        img.decoding = "async";
    });
}
function setupRevealAnimations() {
    const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                io.unobserve(entry.target);
            }
        }
    }, { root: null, rootMargin: "0px 0px -15% 0px", threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}
function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
            const id = a.getAttribute("href") || "";
            const target = id && document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}
function setCurrentYear() {
    const y = document.getElementById("year");
    if (y)
        y.textContent = String(new Date().getFullYear());
}
async function bootstrap() {
    setCurrentYear();
    setupRevealAnimations();
    setupSmoothAnchors();
    const containers = Array.from(document.querySelectorAll("[data-md-src]"));
    await Promise.all(containers.map(loadMarkdownInto));
}
// Wait for DOM
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
}
else {
    void bootstrap();
}
export {};
//# sourceMappingURL=main.js.map