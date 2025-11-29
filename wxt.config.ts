import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: () => ({
    key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuw4VcQYZ+VuTEPhB6JONuMGMnuDMatkbbkJogJ3AJOteNmsDcgX7u/HOGFJhr8DgxBvkGnjki0jTS5DrNEPeFpcxd0VKVijXJ3HVtMX0jK9crqHhHBal7jAzhTc66sbOvmBRx1NnnGaJtQk/R/iGjHaI/f9/Ag//QMiHtqvpCc+FqX1PPDju/JkOEif1y6llNpY8v92pdP9eyhU4Pf9rf3xykvHmM+ykSvAj+1vApyOzuZByTBImVvB57CA3HjGgcgXDCbTAD8snvMpD8HE7rlDNH4IJ8Do0ijQ8ZlTcTYEoDNSV/YMA+Sg6rU8c9tNQ72HyLolYN0+xQbbXzMBp/QIDAQAB",
  }),
})
