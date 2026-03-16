"use client"

import useSWR from "swr"
import { useTranslation } from "react-i18next"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function StainingResultsGallery() {
  const { t } = useTranslation()
  const { data: images, error } = useSWR("/api/grabStaining", fetcher)

  if (error) return <div className="text-center">Failed to load images</div>
  if (!images) return <div className="text-center">Loading...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
      {images.map((src: string, idx: number) => (
        <div key={idx} className="flex flex-col items-center space-y-2">
          <img
            src={src}
            alt={`Staining result ${idx + 1}`}
            className="rounded-xl w-full h-64 object-cover"
          />
        <p
        className="text-gray-700 text-center italic"
        dangerouslySetInnerHTML={{ __html: t(`informationPage.stainingResultsCaption${idx + 1}`) }}
        />
        </div>
      ))}
    </div>
  )
}