import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DishCategories from "./pages/DishCategoryPage";
import CreateDishCategory from "./pages/DishCategoryCreatePage";
import DishPage from "./pages/DishPage";
import DishCreatePage from "./pages/DishCreatePage";
import BranchListPage from "./pages/BranchPage";
import CreateBranchPage from "./pages/BranchCreatePage";
import PromocodeListPage from "./pages/PromocodePage";
import CreatePromocodePage from "./pages/PromocodeCreatePage";
import UserListPage from "./pages/UserListPage";
import UserCreatePage from "./pages/UserCreatePage";
import OrderPage from "./pages/OrderPage";
import BranchEditPage from "./pages/BranchEditPage";
import DishCategoryEdit from "./pages/DishCategoryEditPage";
import DishEditPage from "./pages/DishEditPage";
import EditPromocodePage from "./pages/PromocodeEditPage";

export const adminRoutes = [
    { path: "/", element: <HomePage/>},
    { path: "/dish-categories", element: <DishCategories/>},
    { path: "/dish-categories/create", element: <CreateDishCategory/>},
    { path: "/dishes", element: <DishPage/>},
    { path: "/dishes/create", element: <DishCreatePage/>},
    { path: "/dishes/:id/edit", element: <DishEditPage/>},
    { path: "/dish-categories/:id/edit", element: <DishCategoryEdit/>},
    { path: "/branches", element: <BranchListPage/>},
    { path: "/branches/create", element: <CreateBranchPage/>},
    { path: "/branches/:id/edit", element: <BranchEditPage/>},
    { path: "/promocodes", element: <PromocodeListPage/>},
    { path: "/promocodes/create", element: <CreatePromocodePage/>},
    { path: "/promocodes/:id/edit", element: <EditPromocodePage/>},
    { path: "/users", element: <UserListPage/>},
    { path: "/users/create", element: <UserCreatePage/>},
    { path: "/orders", element: <OrderPage/>},
]

export const publicRoutes = [
    { path: "/login", element: <LoginPage/> },
    { path: "/", element: <HomePage/>},
]