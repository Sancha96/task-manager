import React from "react";

import async from "../components/Async";

import {
    // BookOpen,
    Briefcase,
    // Calendar as CalendarIcon,
    // CheckSquare,
    // CreditCard,
    // Grid,
    // Heart,
    Layout,
    // List,
    // Map,
    // Monitor,
    // ShoppingCart,
    // PieChart,
    // Sliders,
    Users,
} from "react-feather";
import {Routes} from "../constants/links";
import {People} from "@material-ui/icons";
import Students from "../pages/Students";

// Guards
// const AuthGuard = async(() => import("../components/AuthGuard"));

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));

// Components components
// const Alerts = async(() => import("../components/Alerts"));
// const Avatars = async(() => import("../components/Avatars"));
// const Badges = async(() => import("../components/Badges"));
// const Buttons = async(() => import("../components/Buttons"));
// const Cards = async(() => import("../components/Cards"));
// const Chips = async(() => import("../components/Chips"));
// const Dialogs = async(() => import("../components/Dialogs"));
// const ExpPanels = async(() => import("../components/ExpansionPanels"));
// const Lists = async(() => import("../components/Lists"));
// const Menus = async(() => import("../components/Menus"));
// const Pagination = async(() => import("../components/Pagination"));
// const Progress = async(() => import("../components/Progress"));
// const Snackbars = async(() => import("../components/Snackbars"));
// const Tooltips = async(() => import("../components/Tooltips"));

// Pages components
const Profile = async(() => import("../pages/Profile"));
// const Tasks = async(() => import("../pages/Tasks"));
const Projects = async(() => import("../pages/Projects"));

const pagesRoutes = {
    id: "Профиль",
    path: Routes.Profile,
    icon: <Layout />,
    component: Profile,
    children: null,
};

const projectsRoutes = {
    id: "Проекты",
    path: Routes.Projects,
    icon: <Briefcase />,
    component: Projects,
    children: null,
};

const studentsRoutes = {
    id: "Студенты",
    path: Routes.Students,
    icon: <People />,
    component: Students,
    children: null,
};

// const tasksRoutes = {
//     id: "Tasks",
//     path: "/tasks",
//     icon: <CheckSquare />,
//     badge: "17",
//     component: Tasks,
//     children: null,
// };

// const calendarRoutes = {
//     id: "Calendar",
//     path: "/calendar",
//     icon: <CalendarIcon />,
//     component: Calendar,
//     children: null,
// };

// const authRoutes = {
//     id: "Auth",
//     path: Routes.Login,
//     icon: <Users />,
//     component: SignIn,
//     children: null,
// };

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
    pagesRoutes,
    projectsRoutes,
    studentsRoutes,
];

// Routes using the Auth layout
// export const authLayoutRoutes = [authRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
    pagesRoutes,
    projectsRoutes,
    studentsRoutes,
];
