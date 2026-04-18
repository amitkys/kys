import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"
import { workItems } from "@/app/work/lib/work-items"
import { projects } from "@/app/projects/lib/project-list"

// on main page show only 3 work items
const featuredWorkItems: Item[] = workItems.slice(0, 3)

// on main page, show only 2 projects
const featuredProjectItems: Item[] = projects.slice(0, 2).map((project) => ({
  title: project.title,
  description: project.description,
  role: project.role,
  href: project.href,
}))

export default function HomePage() {
  return (
    <>
      <Header />
      {/* <BlogSection /> */}
      {/* show "all work" link only if there is more work than featured ones (3) */}
      <SectionList
        title="work"
        items={featuredWorkItems}
        viewAllHref={workItems.length > 3 ? "/work" : undefined}
        viewAllText={workItems.length > 3 ? "all work" : undefined}
      />
      {/* show "all projects" link only if there are more projects than featured ones (2) */}
      <SectionList
        title="projects"
        items={featuredProjectItems}
        viewAllHref={projects.length > 2 ? "/projects" : undefined}
        viewAllText={projects.length > 2 ? "all projects" : undefined}
      />
      <LinksSection />
    </>
  )
}
