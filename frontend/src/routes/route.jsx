import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import StudentProfile from "../pages/StudentProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "getStudentDetail/:studentId",
        element: <StudentProfile />,
      },
    ],
  },
]);

export default router;
