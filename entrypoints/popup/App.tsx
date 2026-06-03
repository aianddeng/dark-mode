import { useState, useEffect, useCallback } from "react"
import {
  getSettings,
  updateSettings,
  updateSiteSettings,
  resetSettings,
  onSettingsChanged,
  type Settings,
  DEFAULTS,
} from "@/utils/storage"
import { SITES, getSiteByDomain } from "@/utils/sites"
import "./App.css"

function App() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [currentDomain, setCurrentDomain] = useState<string | null>(null)

  useEffect(() => {
    getSettings().then(setSettings)
    onSettingsChanged(setSettings)

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]?.url) {
        try {
          const url = new URL(tabs[0].url)
          setCurrentDomain(url.hostname)
        } catch {}
      }
    })
  }, [])

  const handleGlobalToggle = useCallback(async () => {
    await updateSettings({ globalEnabled: !settings?.globalEnabled })
  }, [settings])

  const handleSiteToggle = useCallback(
    async (siteId: string) => {
      const current = settings?.sites[siteId]?.enabled ?? true
      await updateSiteSettings(siteId, { enabled: !current })
    },
    [settings]
  )

  const handleReset = useCallback(async () => {
    await resetSettings()
  }, [])

  if (!settings) return null

  const currentSite = currentDomain ? getSiteByDomain(currentDomain) : null

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <span className="logo">🌙</span>
          <h1>Dark Focus</h1>
        </div>
        <label className="toggle">
          <input
            type="checkbox"
            checked={settings.globalEnabled}
            onChange={handleGlobalToggle}
          />
          <span className="toggle-slider" />
        </label>
      </header>

      <section className="section">
        <h2 className="section-title">站点</h2>
        <div className="site-list">
          {SITES.map((site) => {
            const isActive = currentSite?.id === site.id
            const isEnabled = settings.sites[site.id]?.enabled ?? true
            return (
              <div
                key={site.id}
                className={`site-item ${isActive ? "active" : ""}`}
              >
                <div className="site-info">
                  <span className="site-emoji">{site.emoji}</span>
                  <span className="site-name">{site.name}</span>
                  {isActive && <span className="site-badge">当前</span>}
                </div>
                <label className="toggle small">
                  <input
                    type="checkbox"
                    checked={settings.globalEnabled && isEnabled}
                    disabled={!settings.globalEnabled}
                    onChange={() => handleSiteToggle(site.id)}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">调节</h2>
        <div className="slider-group">
          <Slider
            label="遮罩透明度"
            value={settings.overlayOpacity}
            min={0}
            max={80}
            disabled={!settings.globalEnabled}
            onChange={(v) => updateSettings({ overlayOpacity: v })}
          />
          <Slider
            label="图片透明度"
            value={settings.imageOpacity}
            min={0}
            max={100}
            disabled={!settings.globalEnabled}
            onChange={(v) => updateSettings({ imageOpacity: v })}
          />
          <Slider
            label="悬停图片透明度"
            value={settings.imageHoverOpacity}
            min={0}
            max={100}
            disabled={!settings.globalEnabled}
            onChange={(v) => updateSettings({ imageHoverOpacity: v })}
          />
          <Slider
            label="图片缩放宽度"
            value={settings.imageShrinkWidth}
            min={10}
            max={80}
            disabled={!settings.globalEnabled}
            onChange={(v) => updateSettings({ imageShrinkWidth: v })}
          />
        </div>
        <div className="toggle-row">
          <span className="toggle-label">悬停展开图片</span>
          <label className="toggle small">
            <input
              type="checkbox"
              checked={settings.hoverExpand}
              disabled={!settings.globalEnabled}
              onChange={() =>
                updateSettings({ hoverExpand: !settings.hoverExpand })
              }
            />
            <span className="toggle-slider" />
          </label>
        </div>
      </section>

      <footer className="footer">
        <button className="reset-btn" onClick={handleReset}>
          恢复默认
        </button>
      </footer>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  disabled,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  disabled: boolean
  onChange: (v: number) => void
}) {
  return (
    <div className={`slider ${disabled ? "disabled" : ""}`}>
      <div className="slider-header">
        <span className="slider-label">{label}</span>
        <span className="slider-value">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

export default App
