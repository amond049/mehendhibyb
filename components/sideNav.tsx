"use client"

import { useEffect, useState } from "react"

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("welcome")

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = activeSection

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSection = entry.target.id
          }
        })

        if (visibleSection !== activeSection) {
          setActiveSection(visibleSection)
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [activeSection])

  const linkStyle = (id: string) =>
    activeSection === id
      ? "text-yellow-700 font-semibold"
      : "text-gray-700 hover:text-black"

  return (
    <nav
      className="
      hidden md:flex
      flex-col gap-3
      text-sm
      fixed right-10 top-40
      bg-white/30
      backdrop-blur-md
      border border-white/40
      rounded-xl
      p-4
      shadow-lg
    "
    >
      <a href="#welcome" className={linkStyle("welcome")}>
        Welcome
      </a>

      <a href="#services" className={linkStyle("services")}>
        Our Services
      </a>

      <a href="#contact" className={linkStyle("contact")}>
        Contact Us
      </a>
    </nav>
  )
}