"use client"

import { useTranslation } from "react-i18next"
import { FaMeta } from "react-icons/fa6";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ContactSection() {
  const [socialMediaIconColor, setSocialMediaIconColor] = useState("#3A3D2A"); // default dark olive

  useEffect(() => {
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
        <div className="flex-grow border-t border-[#B2A36B]/50"></div> {/* soft gold */}
        <div className="mx-3 text-[#3A3D2A] font-semibold">✿</div> {/* dark olive icon */}
        <div className="flex-grow border-t border-[#B2A36B]/50"></div>
      </div>

      {/* Title */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl italic font-bold mb-6 sm:mb-10 text-[#2E3022]">
        {t("sections.contactUs.contactUs")}
      </h2>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-6">

        {/* Meta */}
        <a
          href="#"
          target="_blank"
          className="flex items-center gap-3 px-6 py-4 rounded-xl shadow hover:shadow-lg transition bg-[#FDFDFD]"
        >
          <FaMeta size={24} color={socialMediaIconColor} />
          <span className="text-[#3A3D2A] font-medium">{t("sections.contactUs.meta")}</span>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/mehendhibyb/"
          target="_blank"
          className="flex items-center gap-3 px-6 py-4 rounded-xl shadow hover:shadow-lg transition bg-[#FDFDFD]"
        >
          <FaInstagram size={24} color={socialMediaIconColor} />
          <span className="text-[#3A3D2A] font-medium">{t("sections.contactUs.instagram")}</span>
        </a>

        {/* TikTok (disabled) */}
        <a
          className="flex items-center gap-3 px-6 py-4 rounded-xl transition bg-[#FDFDFD] opacity-50 cursor-not-allowed"
        >
          <FaTiktok size={24} color={socialMediaIconColor}/>
          <span className="text-[#3A3D2A] font-medium">{t("sections.contactUs.tiktok")}</span>
        </a>

      </div>

    </section>
  )
}