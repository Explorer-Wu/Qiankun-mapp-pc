import { lazy } from "react";
import Home from "@@views/home/index"
import EchartsCom from  "@@views/charts/index"
import EchartsD2 from  "@@views/charts/echartsd2"
import EchartsD3 from  "@@views/charts/echartsd3"
import FormsCom from  "@@views/forms"
import Tables from  "@@views/tables/index"
import Pictures from  "@@views/pictures"
import Error from  "@@views/error"

// const Root = lazy(() => import("@@components/LayoutTemp"));
// const Home = lazy(() => import("@@views/home/index"));
// const EchartsCom = lazy(() => import("@@views/charts/index"));
// const EchartsD2 = lazy(() => import("@@views/charts/echartsd2"));
// const EchartsD3 = lazy(() => import("@@views/charts/echartsd3"));
// const FormsCom = lazy(() => import("@@views/forms"));
// const Tables = lazy(() => import("@@views/tables/index"));
// const Pictures = lazy(() => import("@@views/pictures"));
// const Error = lazy(() => import("@@views/error"));

const routes =
  // [
  //   {
  //     component: Root,
  //     routes:
  [
    {
      path: "/",
      exact: true,
      component: Home,
    },
    {
      path: "/views/",
      exact: true,
      component: Home,
      // requiresAuth: false,
    },
    {
      path: "/views/home",
      component: Home,
      // requiresAuth: false,
    },
    // {
    //     path: '/signin',
    //     component: Signin,
    //     requiresAuth: false,
    // },
    // {
    //     path: "/users",
    //     component: Users,
    //     requiresAuth: true,
    // },
    {
      path: "/views/charts",
      component: EchartsCom,
      routes: [
        {
          path: "/views/charts/index",
          // exact: true,
          component: EchartsD2,
        },
        {
          path: "/views/charts/d3charts",
          // exact: true,
          component: EchartsD3,
        },
      ],
    },
    {
      path: "/views/forms",
      component: FormsCom,
    },
    {
      path: "/views/tables",
      component: Tables,
    },
    {
      path: "/views/pictures",
      component: Pictures,
    },
    {
      // path: '/error',
      // name: '404',
      path: "*",
      component: Error,
    },
  ];
//   },
// ];

export default routes;
