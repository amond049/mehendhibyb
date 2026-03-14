"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("welcome")
  const { t } = useTranslation()

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
      ? "text-[var(--sidenav-active-section)] font-semibold"
      : "text-[var(--sidenav-inactive-section)] hover:text-[var(--sidenav-inactive-section-hover)] transition-colors"

  return (
    <nav
      className="
      hidden md:flex
      flex-col gap-3
      text-sm
      fixed right-10 top-40
      bg-[var(--sidenav-background-color)]
      backdrop-blur-md
      border border-[var(--sidenav-border)]
      rounded-xl
      p-4
      shadow-lg
    "
    >
      <a href="#welcome" className={linkStyle("welcome")}>
        {t("sections.sideNav.welcome")}
      </a>

      <a href="#services" className={linkStyle("services")}>
        {t("sections.sideNav.ourServices")}
      </a>

      <a href="#contact" className={linkStyle("contact")}>
        {t("sections.sideNav.contactUs")}
      </a>
    </nav>
  )
}