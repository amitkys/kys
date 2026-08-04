export const siteConfig = {
  name: "Amit Kumar",
  shortName: "amitkys",
  description: "Applied AI Engineer",
  url: "https://kys.id0.uk",
  domain: "kys.id0.uk",
  avatarUrl: "https://github.com/amitkys.png",
  twitterHandle: "@kys",
  titleTemplate: "%s | Amit Kumar",
  links: {
    email: "mailto:amitkys59@gmail.com",
    x: "https://x.com/amitkys",
    github: "https://github.com/amitkys",
    linkedin: "https://www.linkedin.com/in/amit-kumar-895023196/",
  },
}

export const socialLinks = [
  { title: "email", href: siteConfig.links.email },
  { title: "x.com", href: siteConfig.links.x },
  { title: "github", href: siteConfig.links.github },
  { title: "linkedin", href: siteConfig.links.linkedin },
]

export function getOgHomeUrl(title?: string) {
  if (!title) {
    return `${siteConfig.url}/og/home`
  }
  return `${siteConfig.url}/og/home?title=${encodeURIComponent(title)}`
}

export function getOgBlogUrl(title: string, top?: string) {
  const params = new URLSearchParams({ title })
  if (top) {
    params.set("top", top)
  }
  return `${siteConfig.url}/og/blog?${params.toString()}`
}

export function getBlogPostUrl(slug: string) {
  return `${siteConfig.url}/blog/${slug}`
}
