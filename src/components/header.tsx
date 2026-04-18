import { ScrambleText } from "@/components/scramble-text"

export function Header() {
  return (
    <header className="mb-16 space-y-4">
      <h1 className="text-5xl font-semibold tracking-tight text-white text-balance mb-4 animate-fade-in">
        <span className="inline-block">
          <ScrambleText text="Amit Kumar" />
        </span>
      </h1>
      <p className="text-gray-500 animate-fade-in">
        software developer at Vaastman Solution · Patna, india
      </p>
      <p className="text-pretty max-w-[52ch] animate-fade-in-up">
        i&apos;m a MCA postgrad. To make a system reliable, maintainable, I spend time on architecture and desining a system.
      </p>
    </header>
  )
}
