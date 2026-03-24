import { lazyLoad } from "../utils/LazyLoad";
import type { RouteObject } from "react-router-dom";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

export const websiteRoutes: RouteObject = {
  element: lazyLoad(() => import("../common/layout/website/WebsiteLayout")),
  children: [
    {
      index: true,
      element: lazyLoad(() => import("../features/home/pages/Home")),
    },

    {
      path: "contact-us",
      element: lazyLoad(() => import("../features/contact-us/page/Contactus")),
      handle: {
        breadcrumb: "contact us",
      },
    },

    {
      path: "submit-review",
      element: lazyLoad(
        () => import("../features/submit-review/pages/SubmitReview"),
      ),
      handle: {
        breadcrumb: "terms",
      },
    },
    {
      path: "create-car-ad",
      element: lazyLoad(
        () => import("../features/create-car-ad/pages/CreateCarAd"),
      ),
      handle: {
        breadcrumb: "create car ad",
      },
    },

    {
      path: "blogs",
      element: lazyLoad(() => import("../features/blogs/pages/AllBlogs")),
      handle: {
        breadcrumb: "blogs",
      },
    },
    {
      path: "blogs/:slug",
      element: lazyLoad(
        () => import("../features/blogs/pages/BlogDetailsPage"),
      ),
      handle: {
        breadcrumb: "blog name",
        queryKey: [apiRoutes.blogs],
      },
    },
    {
      path: "/car-browse",
      element: lazyLoad(
        () => import("../features/browse/pages/car-browse"),
      ),
      handle: {
        breadcrumb: "browse"
      }
    },
  ],
};
