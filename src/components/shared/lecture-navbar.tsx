import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const router = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)

    const navLinks = [
        { name: "Home", path: "/lecturer" },
        { name: "Course-List", path: "/lecturer/courses" },
        { name: "Schedule", path: "/lecturer/schedule" },
    ]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
            document.addEventListener("keydown", handleEscape)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen])

    const handleNavigation = (path: string) => {
        router(path)
        setIsOpen(false)
    }

    return (
        <div ref={navRef} className="relative z-50">
            <button
                className="md:hidden p-2 rounded-md hover:bg-card-foreground/10 text-card-foreground flex items-center justify-center cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle Navigation"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            <div className="hidden md:flex gap-[40px]">
                {navLinks.map((link) => (
                    <Button
                        key={link.name}
                        onClick={() => handleNavigation(link.path)}
                        className="bg-sidebar-primary text-primary-foreground hover:bg-sidebar-primary/80 px-4 py-2"
                    >
                        {link.name}
                    </Button>
                ))}
            </div>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-md p-2 flex flex-col gap-2 md:hidden">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavigation(link.path)}
                            className="shadow-md border-1 border-card-foreground/20 bg-card/90 text-card-foreground hover:bg-card/60 px-4 py-2 rounded-md w-full
                                cursor-pointer">
                            {link.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}