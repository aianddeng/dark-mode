import "./style.css"

export default defineContentScript({
  matches: ["*://*.xiaohongshu.com/*"],
  runAt: "document_end",
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        const cover_div = document.createElement("div")
        cover_div.style =
          "position: fixed; inset: 0; z-index: 1000000000; background: rgba(0,0,0,.5); pointer-events: none;"
        container.append(cover_div)
      },
    })

    ui.mount()
  },
})
