export default defineContentScript({
  matches: ["*://*.racknerd.com/*"],
  runAt: "document_start",
  async main(ctx) {
    const isProductPage = window.location.href.includes("a=confproduct")
    const isCartPage = window.location.href.includes("a=view")

    if (isProductPage) {
      ctx.addEventListener(window, "DOMContentLoaded", () => {
        configurationSelection("inputConfigOption413")
        configurationSelection("inputConfigOption252", 4)

        clickButton("btnCompleteProductConfig")
      })
    } else if (isCartPage) {
      window.location.href = "/aff.php?aff=11492&pid=923"

      // if (itemsCheck(300)) {
      //   window.location.href = "/aff.php?aff=11492&pid=923"
      // }
    }
  },
})

function configurationSelection(id: string, option?: number) {
  const selectElement = document.getElementById(id) as HTMLSelectElement
  if (selectElement) {
    const optionIndex =
      option || Math.floor(Math.random() * (selectElement.options.length + 1))

    selectElement.options[optionIndex].selected = true
  }
}

function clickButton(id: string) {
  const buttonElement = document.getElementById(id)
  if (buttonElement) {
    buttonElement.click()
  }
}

function itemsCheck(
  length: number,
  selector: string = ".view-cart-items .row"
) {
  const items = document.querySelectorAll(selector)

  return items.length >= length
}
