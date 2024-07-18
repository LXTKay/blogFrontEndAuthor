import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Error from "./Error";
import InitialView from "./InitialView";
import BlogEntry from "./BlogEntry";
import LogIn from "./LogIn";
import CreateBlogPost from "./CreateBlogPost";
import EditBlogPost from "./EditBlogPost";
import editBlogPostLoader from "./editBlogPostLoader";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <InitialView/>
        },
        {
          path: "login",
          element: <LogIn/>
        },
        {
          path: "posts/:postId",
          element: <BlogEntry/>
        },
        {
          path: "createBlogPost",
          element:<CreateBlogPost/>
        },
        {
          path: "posts/:postId/edit",
          element: <EditBlogPost/>,
          loader: editBlogPostLoader
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;