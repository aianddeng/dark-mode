import { storage } from "wxt/utils/storage"
import { DEFAULTS } from "@/utils/storage"

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
      storage.setItem("local:settings", DEFAULTS)
    }
  })
})
