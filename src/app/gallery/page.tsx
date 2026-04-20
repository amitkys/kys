import { Gallery } from "@/components/gallery";
import galleryItems from "@/data/gallery.json"

export default function Page() {
    return (
        <div className="p-4">
            <Gallery items={galleryItems} />
        </div>
    )
}
