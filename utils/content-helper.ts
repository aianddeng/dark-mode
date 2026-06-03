import { getSettings, onSettingsChanged, type Settings } from "./storage"
import type { SiteConfig } from "./sites"

export function applyCSSVariables(settings: Settings): void {
  const root = document.documentElement
  root.removeAttribute("data-dm-off")
  root.style.setProperty("--dm-image-opacity", String(settings.imageOpacity / 100))
  root.style.setProperty("--dm-image-hover-opacity", String(settings.imageHoverOpacity / 100))
  root.style.setProperty("--dm-shrink-width", `${settings.imageShrinkWidth}%`)

  if (settings.hoverExpand) {
    root.removeAttribute("data-dm-no-hover")
  } else {
    root.setAttribute("data-dm-no-hover", "true")
  }
}

export function disableEffects(): void {
  const root = document.documentElement
  root.setAttribute("data-dm-off", "true")
  root.style.setProperty("--dm-image-opacity", "1")
  root.style.setProperty("--dm-image-hover-opacity", "1")
  root.style.setProperty("--dm-shrink-width", "auto")
  root.removeAttribute("data-dm-no-hover")
}

export function isSiteEnabled(settings: Settings, siteId: string): boolean {
  return settings.globalEnabled && (settings.sites[siteId]?.enabled ?? true)
}

function createOverlay(overlayOpacity: number): HTMLDivElement {
  const div = document.createElement("div")
  div.id = "dark-focus-overlay"
  div.style.cssText = `position:fixed;inset:0;z-index:1000000000;background:rgba(0,0,0,${overlayOpacity / 100});pointer-events:none;`
  return div
}

function removeOverlay(): void {
  document.getElementById("dark-focus-overlay")?.remove()
}

export async function initContentScript(
  site: SiteConfig,
  ctx: any
): Promise<void> {
  const settings = await getSettings()

  if (!isSiteEnabled(settings, site.id)) {
    disableEffects()
    return
  }

  applyCSSVariables(settings)
  document.documentElement.appendChild(createOverlay(settings.overlayOpacity))

  onSettingsChanged((newSettings) => {
    const enabled = isSiteEnabled(newSettings, site.id)

    if (enabled) {
      applyCSSVariables(newSettings)
      const existing = document.getElementById("dark-focus-overlay")
      if (existing) {
        existing.style.background = `rgba(0,0,0,${newSettings.overlayOpacity / 100})`
      } else {
        document.documentElement.appendChild(
          createOverlay(newSettings.overlayOpacity)
        )
      }
    } else {
      removeOverlay()
      disableEffects()
    }
  })
}
