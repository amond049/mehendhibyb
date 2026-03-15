"use client"

import { useTranslation } from "react-i18next"
import { FaXTwitter, FaMeta } from "react-icons/fa6";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ContactSection() {
  const [socialMediaIconColor, setSocialMediaIconColor] = useState("#000"); // fallback

  useEffect(() => {
    // This runs only in the browser
    const rootStyles = getComputedStyle(document.documentElement);
    const color = rootStyles
      .getPropertyValue("--social-media-icon-color")
      .trim();
    if (color) setSocialMediaIconColor(color);
  }, []);

  const { t } = useTranslation();
  return (
    <section id="contact" className="scroll-mt-32 py-20">

      {/* Divider */}
      <div className="flex items-center mb-10">
        <div className="flex-grow border-t border-[var(--contact-us-section-divider-border)]"></div>
        <div className="mx-3 text-[var(--contact-us-section-text-color)]">✿</div>
        <div className="flex-grow border-t border-[var(--contact-us-section-divider-border)]"></div>
      </div>

      {/* Title */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl italic font-semibold mb-6 sm:mb-10">
        {t("sections.contactUs.contactUs")}
      </h2>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Meta */}
        <a
          href="#"
          target="_blank"
          className="flex items-center gap-3 bg-[var(--social-media-background)] px-6 py-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <FaMeta size={24} color={socialMediaIconColor} />
          <span>{t("sections.contactUs.meta")}</span>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/mehendhibyb/"
          target="_blank"
          className="flex items-center gap-3 bg-[var(--social-media-background)] px-6 py-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <FaInstagram size={24} color={socialMediaIconColor} />
          <span>{t("sections.contactUs.instagram")}</span>
        </a>

        {/* TikTok */}
        <a
          className="flex items-center gap-3 bg-[var(--social-media-background-disabled)] px-6 py-4 rounded-xl transition" 
        >
          <FaTiktok size={24} color={socialMediaIconColor}/>
          <span>{t("sections.contactUs.tiktok")}</span>
        </a>

      </div>

    </section>
  )
}