import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ToggleTheme() {
    const [theme, setTheme] = useState<"dark" | "light">("dark")

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const initialTheme = savedTheme === "light" ? "light" : "dark"

        setTheme(initialTheme)
        document.documentElement.classList.toggle("light", initialTheme === "light")
    }, [])

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark"
        setTheme(nextTheme)
        localStorage.setItem("theme", nextTheme)
        document.documentElement.classList.toggle("light", nextTheme === "light")
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === "light"}
            aria-label="Toggle light and dark theme"
            className="group inline-flex items-center gap-2 mr-[20px]"
        >
            <span
                className={`relative inline-flex h-8 w-15 items-center rounded-full border transition-all duration-300 ${theme === "light"
                        ? "border-amber-300 bg-amber-100"
                        : "border-slate-600 bg-slate-700"
                    }`}
            >
                <span
                    className={`absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-transform ${theme === "light" ? "translate-x-8" : "translate-x-0.5"
                        } group-hover:shadow-md group-hover:shadow-foreground/20 transition-all duration-300`}
                >
                    {theme === "light" ? <Sun size={14} /> : <Moon size={14} />}
                </span>
            </span>
        </button>
    )
}