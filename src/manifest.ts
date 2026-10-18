import { defineFrontModule } from "@neton/application-front-contract";

// page.key 必须与后端 sql/postgresql/V001__baseline.sql 的 system_menus.component 一一对应。
export default defineFrontModule({
  id: "benefit",
  contractVersion: "1.0.0",
  locales: [{ lang: "zh-CN", entry: "zh-CN" }, { lang: "en-US", entry: "en-US" }],
  pages: [
    { key: "benefit/items/index", path: "/benefit/items", entry: "items", rendering: "client" },
    { key: "benefit/redemptions/index", path: "/benefit/redemptions", entry: "redemptions", rendering: "client" },
  ],
});
