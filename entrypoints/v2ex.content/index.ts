import "./style.css"
import { SITES } from "@/utils/sites"
import { initContentScript } from "@/utils/content-helper"

const site = SITES.find((s) => s.id === "v2ex")!

export default defineContentScript({
  matches: [site.match],
  runAt: "document_start",
  main(ctx) {
    initContentScript(site, ctx)
  },
})
