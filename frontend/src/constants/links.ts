export enum Routes {
    Login = "/",
    Register = "/register",
    Profile = "/profile",
    Projects = "/projects",
    Project = "/projects/:id",
    Board = "/projects/:id/:stageId",
    ProjectsCreate = "/projects/create",
    TasksCreate = "/tasks/create",
    Students = "/students",
    Admin = "/admin",
    NotFound = "*",
}