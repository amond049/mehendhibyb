"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ServicesSection() {
  const { t } = useTranslation()
  const { data: allImages, error } = useSWR("/api/grabRoulette", fetcher)
  const [images, setImages] = useState<string[]>([])

  // Pick 5 random images and add cache-busting
  useEffect(() => {
    if (allImages?.length) {
      const shuffled = [...allImages].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 5).map((url: string) => {
        return `${url}&cb=${Date.now()}` // append timestamp to prevent caching
      })
      setImages(selected)
    }
  }, [allImages])

  const [arrowColor, setArrowColor] = useState("#fff")
  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement)
    const color = rootStyles.getPropertyValue("--our-services-arrow-icon-color").trim()
    if (color) setArrowColor(color)
  }, [])

  const [index, setIndex] = useState(0)
  const touchStart = useRef<number | null>(null)
  const touchEnd = useRef<number | null>(null)

  const next = () => setIndex((prev) => (prev + 1) % images.length)
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(next, 4000)
    return () => clearInterval(interval)
  }, [images])

  // Swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX
  }
  const handleTouchEnd = () => {
    if (touchStart.current === null || touchEnd.current === null) return
    const distance = touchStart.current - touchEnd.current
    if (distance > 50) next()
    if (distance < -50) prev()
  }

  if (error) return <div className="text-center mt-10">Failed to load carousel images</div>
  if (!images.length) return <div className="text-center mt-10">Loading...</div>

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
        <div className="max-w-2xl mx-auto text-center mt-8">
          <p className="mb-4 text-lg text-gray-700">
            We perform the following services:
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700 text-left sm:text-center sm:list-none sm:flex sm:justify-center sm:gap-6">
            <li className="font-bold">Henna</li>
            <li className="font-bold">Jagua</li>
            <li className="font-bold">Body Paint</li>
            <li className="font-bold">Temporary Tattoos</li>
          </ul>

          <p className="mt-4 text-lg text-gray-700">
            And more to come, stay tuned!
          </p>
          <p className="mt-4 text-lg text-gray-700">You can see some of my work below, if you want to see more, check out my <a href="/portfolio" className="text-blue-500 hover:underline">portfolio</a>!</p>
        </div>
        <br></br>
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
            loading="lazy"
          />

          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[var(--our-services-arrow-color)]/70 backdrop-blur p-2 rounded-full hover:bg-[var(--our-services-arrow-color)]"
          >
            <ChevronLeft size={28} color={arrowColor} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[var(--our-services-arrow-color)]/70 backdrop-blur p-2 rounded-full hover:bg-[var(--our-services-arrow-color)]"
          >
            <ChevronRight size={28} color={arrowColor} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === index
                    ? "bg-[var(--our-services-dots-color)] w-6"
                    : "bg-[var(--our-services-dots-color)]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}