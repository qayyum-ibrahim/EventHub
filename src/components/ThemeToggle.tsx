import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined" && localStorage.theme) {
      return localStorage.theme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.theme = theme;
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 bg-border dark:bg-border/50 text-sm border rounded"
    >
      Toggle {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}
