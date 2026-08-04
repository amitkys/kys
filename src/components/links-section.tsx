import Link from "next/link"
import { socialLinks } from "@/config/site"

export function LinksSection() {
  return (
    <section className="animate-fade-in-up mt-4 pt-10 pb-16 border-t border-stone-300">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
        <span className="text-accent accent-glow mr-2">*</span> elsewhere
      </h2>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-stone-500 hover:text-accent transition-colors duration-200"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
