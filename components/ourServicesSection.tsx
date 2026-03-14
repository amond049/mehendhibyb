"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function ServicesSection() {
  const { t } = useTranslation();
  const images = [
    "https://picsum.photos/800/400?1",
    "https://picsum.photos/800/400?2",
    "https://picsum.photos/800/400?3",
    "https://picsum.photos/800/400?4",
    "https://picsum.photos/800/400?5",
  ]

  const [arrowColor, setArrowColor] = useState("#fff");

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const color = rootStyles.getPropertyValue("--our-services-arrow-icon-color").trim();
    if (color) setArrowColor(color);
  }, []);

  const [index, setIndex] = useState(0)
  const touchStart = useRef<number | null>(null)
  const touchEnd = useRef<number | null>(null)

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(next, 4000)
    return () => clearInterval(interval)
  }, [])

  // Swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return

    const distance = touchStart.current - touchEnd.current

    if (distance > 50) next()
    if (distance < -50) prev()
  }

  return (
    <section
      id="services"
      className="scroll-mt-32 w-full flex justify-center px-4 py-16"
    >
      <div className="max-w-5xl w-full">

        {/* Divider */}
        <div className="flex items-center mb-8">
          <div className="flex-grow border-t border-[var(--our-services-section-divider-border)]"></div>
          <div className="mx-3 text-[var(--our-services-section-text-color)]">✿</div>
          <div className="flex-grow border-t border-[var(--our-services-section-divider-border)]"></div>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl italic font-semibold mb-6 sm:mb-10">
          {t('sections.ourServices.ourServices')}
        </h2>

        {/* Carousel */}
        <div
          className="relative border-2 border-[var(--our-services-section-carousel-border)] rounded-2xl overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          {/* Image */}
          <img
            src={images[index]}
            className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover transition-all duration-500"
          />

          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[var(--our-services-arrow-color)]/70 backdrop-blur p-2 rounded-full hover:bg-var(--our-services-arrow-color)"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[var(--our-services-arrow-color)]/70 backdrop-blur p-2 rounded-full hover:bg-var(--our-services-arrow-color)"
          >
            <ChevronRight size={28} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === index ? "bg-[var(--our-services-dots-color)] w-6" : "bg-[var(--our-services-dots-color)]/50"
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}