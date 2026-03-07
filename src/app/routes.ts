import { createBrowserRouter } from "react-router";
import { Login } from "./screens/Login";
import { Registration } from "./screens/Registration";
import { Catalog } from "./screens/Catalog";
import { ItemDetail } from "./screens/ItemDetail";
import { Cart } from "./screens/Cart";
import { MyRequests } from "./screens/MyRequests";
import { ReportIssue } from "./screens/ReportIssue";
import { AdminDashboard } from "./screens/AdminDashboard";
import { InventoryManagement } from "./screens/InventoryManagement";
import { UserProfile } from "./screens/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Registration,
  },
  {
    path: "/catalog",
    Component: Catalog,
  },
  {
    path: "/item/:id",
    Component: ItemDetail,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/requests",
    Component: MyRequests,
  },
  {
    path: "/report",
    Component: ReportIssue,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/inventory",
    Component: InventoryManagement,
  },
  {
    path: "/profile",
    Component: UserProfile,
  },
]);
