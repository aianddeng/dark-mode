import "./style.css"

export default defineContentScript({
  matches: ["*://*.v2ex.com/*"],
  runAt: "document_start",
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: "html",
      append: "last",
      onMount: (container) => {
        const cover_div = document.createElement("div")
        cover_div.style =
          "position: fixed; inset: 0; z-index: 1000000000; background: rgba(0,0,0,.35); pointer-events: none;"
        container.append(cover_div)
      },
    })

    ui.mount()
  },
})
