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
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const activeItem = activeIndex === null ? null : items[activeIndex]

  const themeColor =
    isPlaying && activeItem?.spotify?.themeColor
      ? activeItem.spotify.themeColor
      : "#111111"

  // track viewport size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // reset player + play button when image changes or modal closes
  // show play button after 2s delay once lightbox opens
  useEffect(() => {
    setIsPlaying(false)
    setShowPlayButton(false)

    if (activeIndex === null) return

    const timer = setTimeout(() => setShowPlayButton(true), 2000)
    return () => clearTimeout(timer)
  }, [activeIndex])

  // lock body scroll while lightbox is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [activeIndex])

  useEffect(() => {
    if (activeIndex === null) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activeIndex])

  function handleClose() {
    setActiveIndex(null)
    setIsPlaying(false)
  }

  return (
    <>
      {/* ── Grid ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <figure
            key={`${item.path}-${item.date}-${index}`}
            className="overflow-hidden rounded-xl border border-stone-300 bg-stone-100"
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
              <p className="text-sm text-stone-500">{item.formattedDate}</p>
              {item.text && (
                <p className="text-sm text-stone-700">{item.text}</p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 p-0 sm:p-4 backdrop-blur-sm transition-colors duration-700"
          style={{ backgroundColor: `${themeColor}cc` }}
          onClick={handleClose}
        >
          <div className="flex h-full items-center justify-center">
            <div
              className="
                relative w-full h-full flex flex-col
                sm:h-auto sm:max-w-6xl sm:rounded-2xl
                overflow-hidden shadow-2xl transition-all duration-700
              "
              style={{ backgroundColor: themeColor }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header ── */}
              <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
                <div className="min-w-0">
                  <p
                    className="text-xs uppercase tracking-widest transition-colors duration-700"
                    style={{
                      color:
                        themeColor === "#111111"
                          ? "#9ca3af"
                          : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {activeItem.formattedDate}
                  </p>
                  {activeItem.text && (
                    <p
                      className="mt-0.5 text-xs sm:text-sm transition-colors duration-700 line-clamp-2"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {activeItem.text}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="ml-4 shrink-0 text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  close
                </button>
              </div>

              {/* ── Body ── */}
              {/*
                Mobile:  image fills full space, Spotify card is absolute-bottom overlay
                Desktop: image left | Spotify panel right (side-by-side)
              */}
              <div
                className={`
                  flex flex-1 overflow-hidden
                  ${!isMobile && isPlaying ? "flex-row" : "items-center justify-center"}
                `}
              >
                {/* Image area — always full size */}
                <div className="relative flex min-w-0 flex-1 items-center justify-center p-3">
                  <Image
                    className="h-auto max-h-[76vh] w-auto max-w-full rounded-lg object-contain"
                    src={activeItem.src}
                    alt={activeItem.text ?? "gallery-photo-full"}
                    width={1600}
                    height={1200}
                    priority
                  />

                  {/* Play pill — bottom-right of image area */}
                  {activeItem.spotify && !isPlaying && showPlayButton && (
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="
                        absolute bottom-4 right-4
                        flex items-center gap-1.5 sm:gap-2
                        rounded-full
                        px-3 py-1.5 sm:px-4 sm:py-2
                        text-xs sm:text-sm font-medium text-white
                        backdrop-blur-sm border border-white/15
                        hover:border-[#1DB954]/60 hover:text-[#1DB954]
                        animate-fade-in
                        transition-all duration-200 shadow-lg
                      "
                      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
                    >
                      <svg
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                      Play {activeItem.spotify.songName}
                    </button>
                  )}

                  {/* ── Mobile Spotify card — absolute bottom overlay ── */}
                  {isMobile && isPlaying && activeItem.spotify && (
                    <div
                      className="absolute bottom-3 left-3 right-3 rounded-xl overflow-hidden shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* "now playing" label + close */}
                      <div
                        className="flex items-center justify-between px-3 pt-2.5 pb-1"
                        style={{ backgroundColor: themeColor }}
                      >
                        <p
                          className="text-xs uppercase tracking-widest"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          now playing
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsPlaying(false)}
                          className="text-xs transition-colors"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "rgba(255,255,255,0.9)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
                          }
                        >
                          ✕
                        </button>
                      </div>
                      {/* Compact horizontal iframe */}
                      <iframe
                        src={`https://open.spotify.com/embed/track/${activeItem.spotify.trackId}?utm_source=generator`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        style={{ display: "block", borderRadius: "0 0 12px 12px" }}
                      />
                    </div>
                  )}
                </div>

                {/* ── Desktop Spotify side panel ── */}
                {!isMobile && isPlaying && activeItem.spotify && (
                  <div
                    className="w-80 shrink-0 flex flex-col justify-center gap-3 p-5 transition-colors duration-700"
                    style={{ backgroundColor: themeColor }}
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className="text-xs uppercase tracking-widest"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        now playing
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsPlaying(false)}
                        className="text-xs transition-colors duration-200"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                        }
                      >
                        ✕
                      </button>
                    </div>
                    <iframe
                      style={{ borderRadius: "12px" }}
                      src={`https://open.spotify.com/embed/track/${activeItem.spotify.trackId}?utm_source=generator`}
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
