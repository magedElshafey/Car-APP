import { lazyLoad } from "../utils/LazyLoad";
import type { RouteObject } from "react-router-dom";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import Guard from "./Guard";

export const websiteRoutes: RouteObject = {
  element: lazyLoad(() => import("../common/layout/website/WebsiteLayout")),
  children: [
    {
      index: true,
      element: lazyLoad(() => import("../features/home/pages/Home")),
    },

    // {
    //   path: "contact-us",
    //   element: lazyLoad(() => import("../features/contact-us/page/Contactus")),
    //   handle: {
    //     breadcrumb: "contact us",
    //   },
    // },

    // {
    //   path: "submit-review",
    //   element: lazyLoad(
    //     () => import("../features/submit-review/pages/SubmitReview"),
    //   ),
    //   handle: {
    //     breadcrumb: "terms",
    //   },
    // },
    {
      path: "create-car-ad",
      element: (
        <Guard requireAuth>
          {lazyLoad(
            () => import("../features/create-car-ad/pages/CreateCarAd"),
          )}
        </Guard>
      ),
      handle: {
        breadcrumb: "create car ad",
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
      element: lazyLoad(() => import("../features/browse/pages/car-browse")),
      handle: {
        breadcrumb: "browse",
      },
    },
    {
      path: "/cars/:id",
      element: lazyLoad(() => import("../features/browse/pages/car-details")),
      handle: {
        breadcrumb: "car details",
      },
    },
    {
      path: "/cars/compare",
      element: lazyLoad(() => import("../features/browse/pages/car-compare")),
      handle: {
        breadcrumb: "compare cars",
      },
    },
  ],
};
