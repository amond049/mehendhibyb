"use client"

import { Facebook, Instagram, Youtube } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-32 py-20">

      {/* Divider */}
      <div className="flex items-center mb-10">
        <div className="flex-grow border-t border-gray-400"></div>
        <div className="mx-3 text-gray-500">✿</div>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Title */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl italic font-semibold mb-6 sm:mb-10">
        Contact Us
      </h2>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-6">

        {/* Meta */}
        <a
          href="#"
          className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <Facebook />
          <span>Meta</span>
        </a>

        {/* Instagram */}
        <a
          href="#"
          className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <Instagram />
          <span>Instagram</span>
        </a>

        {/* TikTok */}
        <a
          href="#"
          className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow hover:shadow-lg transition"
        >
          🎵
          <span>TikTok</span>
        </a>

        {/* YouTube */}
        <a
          href="#"
          className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <Youtube />
          <span>YouTube</span>
        </a>

        {/* X / Twitter */}
        <a
          href="#"
          className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow hover:shadow-lg transition"
        >
          ✕
          <span>X</span>
        </a>

      </div>

    </section>
  )
}