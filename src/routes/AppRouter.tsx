// AppRouter.tsx
import { useRoutes } from "react-router-dom";
import { routeConfig } from "./index.tsx";

const AppRouter = () => {
  const routes = useRoutes(routeConfig);
  return routes;
};

export default AppRouter;
