import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, adminRoutes } from "../router";

const AppRouter = () => {
    const authState = useSelector((state) => state.auth);

    return (
        <Routes>
            {
                publicRoutes.map((route) => (
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                ))
            }
            {
                authState.isAuthenticated &&
                adminRoutes.map((route) => (
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                )) 
            }
        </Routes>
    )
}

export default AppRouter;