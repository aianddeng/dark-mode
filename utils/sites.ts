export interface SiteConfig {
  id: string
  name: string
  emoji: string
  domain: string
  match: string
}

export const SITES: SiteConfig[] = [
  {
    id: "juejin",
    name: "掘金",
    emoji: "⛏️",
    domain: "juejin.cn",
    match: "*://*.juejin.cn/*",
  },
  {
    id: "v2ex",
    name: "V2EX",
    emoji: "💬",
    domain: "v2ex.com",
    match: "*://*.v2ex.com/*",
  },
  {
    id: "xiaohongshu",
    name: "小红书",
    emoji: "📕",
    domain: "xiaohongshu.com",
    match: "*://*.xiaohongshu.com/*",
  },
  {
    id: "zhihu",
    name: "知乎",
    emoji: "🔵",
    domain: "zhihu.com",
    match: "*://*.zhihu.com/*",
  },
]

export function getSiteByDomain(hostname: string): SiteConfig | undefined {
  return SITES.find((s) => hostname.includes(s.domain))
}
