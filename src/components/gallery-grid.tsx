"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { GalleryItem } from "@/components/gallery"

type GalleryGridItem = GalleryItem & {
  src: string
  formattedDate: string
  fallbackAlt: string
}

type GalleryGridProps = {
  items: GalleryGridItem[]
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeItem = activeIndex === null ? null : items[activeIndex]

  useEffect(() => {
    if (activeIndex === null) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [activeIndex])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <figure
            key={`${item.path}-${item.date}-${index}`}
            className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/60"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="block w-full cursor-zoom-in overflow-hidden"
            >
              <Image
                className="h-56 w-full object-cover object-center md:h-72"
                src={item.src}
                alt={item.text ?? item.fallbackAlt}
                width={1200}
                height={900}
              />
            </button>
            <figcaption className="space-y-1 p-3">
              <p className="text-sm text-gray-500">{item.formattedDate}</p>
              {item.text && (
                <p className="text-sm text-gray-300">{item.text}</p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
        >
          <div className="flex h-full items-center justify-center">
            <div
              className="w-full max-w-5xl overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm text-gray-400">{activeItem.formattedDate}</p>
                  {activeItem.text && (
                    <p className="mt-1 text-sm text-gray-200">{activeItem.text}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="ml-4 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  close
                </button>
              </div>

              <div className="flex max-h-[80vh] items-center justify-center bg-black p-3">
                <Image
                  className="h-auto max-h-[76vh] w-auto max-w-full object-contain"
                  src={activeItem.src}
                  alt={activeItem.text ?? "gallery-photo-full"}
                  width={1600}
                  height={1200}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
