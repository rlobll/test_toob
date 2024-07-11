import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Main from "./components/main";
import Section1 from "./routes/section1";
import Section3 from "./routes/section3";
import Test1 from "./routes/test1";

// createBrowserRouter 함수를 사용하여 라우터를 생성
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: "true",
        element: <Main />,
      },
      {
        path: "section1",
        element: <Section1 />,
      },
      {
        path: "/test1",
        element: <Test1 />,
      },
      {
        path: "/section3",
        element: <Section3 />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
