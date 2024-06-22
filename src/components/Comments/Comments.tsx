import { useEffect, useRef } from "react";

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement("script");
    const theme = document.body.classList.contains("dark") ? "dark" : "light";

    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "0jaaack/blog-old");
    scriptElem.setAttribute("data-repo-id", "R_kgDOIrW6Yw");
    scriptElem.setAttribute("data-category", "General");
    scriptElem.setAttribute("data-category-id", "DIC_kwDOIrW6Y84Carw9");
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", theme);
    scriptElem.setAttribute("data-lang", "en");

    ref.current.appendChild(scriptElem);
  }, []);

  return <section ref={ref} />;
}
