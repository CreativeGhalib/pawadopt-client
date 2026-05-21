import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("pawadopt-theme") || "light");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("pawadopt-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline bg-white text-ink transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
