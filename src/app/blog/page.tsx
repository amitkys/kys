import { ScrambleText } from "@/components/scramble-text"
import { Posts } from "@/components/posts"
import { getPublishedPosts } from "@/lib/blog"
import { Metadata } from "next"
import { getOgHomeUrl } from "@/config/site"

const posts = getPublishedPosts().sort(
  (a, b) =>
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
)

export default async function BlogPage() {
  return (
    <main className="animate-fade-in-up relative">
      <h1 className="text-4xl font-bold mb-8 text-foreground">
        <span className="text-accent accent-glow mr-2">*</span>
        <ScrambleText text="blog" />
      </h1>

      {/* <p className="hidden sm:block text-sm text-stone-500 mb-8">
        press{" "}
        <kbd className="px-1.5 py-0.5 text-xs border border-stone-300 bg-stone-200/50 text-stone-600 rounded">
          /
        </kbd>{" "}
        to search • use{" "}
        <kbd className="px-1.5 py-0.5 text-xs border border-stone-300 bg-stone-200/50 text-stone-600 rounded">
          ctrl / ⌘ j
        </kbd>{" "}
        and{" "}
        <kbd className="px-1.5 py-0.5 text-xs border border-stone-300 bg-stone-200/50 text-stone-600 rounded">
          ctrl / ⌘ k
        </kbd>{" "}
        or{" "}
        <kbd className="px-1.5 py-0.5 text-xs border border-stone-300 bg-stone-200/50 text-stone-600 rounded">
          ↑
        </kbd>{" "}
        and{" "}
        <kbd className="px-1.5 py-0.5 text-xs border border-stone-300 bg-stone-200/50 text-stone-600 rounded">
          ↓
        </kbd>{" "}
        to navigate
      </p> */}

      <Posts posts={posts} />
    </main>
  )
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Writings on programming, computer science, and more.",
  openGraph: {
    images: [
      {
        url: getOgHomeUrl("blog"),
      },
    ],
  },
}
