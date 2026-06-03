import { storage } from "wxt/utils/storage"
import { SITES } from "./sites"

export interface SiteSettings {
  enabled: boolean
}

export interface Settings {
  globalEnabled: boolean
  sites: Record<string, SiteSettings>
  overlayOpacity: number
  imageOpacity: number
  imageHoverOpacity: number
  imageShrinkWidth: number
  hoverExpand: boolean
}

function getDefaultSites(): Record<string, SiteSettings> {
  const sites: Record<string, SiteSettings> = {}
  for (const site of SITES) {
    sites[site.id] = { enabled: true }
  }
  return sites
}

export const DEFAULTS: Settings = {
  globalEnabled: true,
  sites: getDefaultSites(),
  overlayOpacity: 35,
  imageOpacity: 25,
  imageHoverOpacity: 50,
  imageShrinkWidth: 30,
  hoverExpand: true,
}

const settingsItem = storage.defineItem<Settings>("local:settings", {
  fallback: DEFAULTS,
})

export async function getSettings(): Promise<Settings> {
  return settingsItem.getValue()
}

export async function updateSettings(partial: Partial<Settings>): Promise<void> {
  const current = await settingsItem.getValue()
  await settingsItem.setValue({ ...current, ...partial })
}

export async function updateSiteSettings(
  siteId: string,
  partial: Partial<SiteSettings>
): Promise<void> {
  const current = await settingsItem.getValue()
  const siteSettings = { ...current.sites[siteId], ...partial }
  await settingsItem.setValue({
    ...current,
    sites: { ...current.sites, [siteId]: siteSettings },
  })
}

export async function resetSettings(): Promise<void> {
  await settingsItem.setValue(DEFAULTS)
}

export function onSettingsChanged(
  callback: (settings: Settings) => void
): void {
  settingsItem.watch((newVal) => {
    callback(newVal)
  })
}
