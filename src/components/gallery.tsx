import { formatDate } from "@/lib/utils"
import { GalleryGrid } from "@/components/gallery-grid"

export type GalleryItem = {
  path: string
  date: string
  text?: string
}

type GalleryProps = {
  items: GalleryItem[]
}

export function getGalleryImageSrc(path: string) {
  if (path.startsWith("/")) {
    return path
  }

  return `/gallery/${path}`
}

export function Gallery({ items }: GalleryProps) {
  const preparedItems = items.map((item, index) => ({
    ...item,
    src: getGalleryImageSrc(item.path),
    formattedDate: formatDate(item.date),
    fallbackAlt: `gallery-photo-${index + 1}`,
  }))

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          amitkys gallery
        </h1>
        <p className="text-sm text-gray-500">
          moments from the gallery archive
        </p>
      </div>

      <GalleryGrid items={preparedItems} />
    </section>
  )
}
