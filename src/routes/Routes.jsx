import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/loginSignUp/Login";
import SignUp from "../pages/loginSignUp/SignUp";
import Assignments from "../pages/Assignments";
import CreateAssignment from "../pages/CreateAssignment";
import MyAssignments from "../pages/MyAssignments";
import SubmittedAssignments from "../pages/SubmittedAssignments";
import PrivateRoute from "./PrivateRoute";
import UpdateAssignment from "../pages/UpdateAssignment";
import AssignmentDetails from "../pages/AssignmentDetails";
import MarkAssignment from "../pages/MarkAssignment";




const router = createBrowserRouter([

    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/assignments',
                element: <Assignments></Assignments>,
                loader: () => fetch('https://online-group-study-server-three.vercel.app/assignmentsCount')
            },
            {
                path: '/createAssignments',
                element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
            },
            {
                path: '/myAssignments',
                element: <PrivateRoute><MyAssignments></MyAssignments></PrivateRoute>

            },
            {
                path: '/submittedAssignments',
                element: <PrivateRoute><SubmittedAssignments></SubmittedAssignments></PrivateRoute>
            },
            {
                path: '/updateAssignment/:id',
                element: <PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>,
                loader: ({ params }) => fetch(`https://online-group-study-server-three.vercel.app/updateAssignment/${params.id}`, { credentials: 'include' })
            },
            {
                path: '/assignmentDetails/:id',
                element: <PrivateRoute><AssignmentDetails></AssignmentDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://online-group-study-server-three.vercel.app/assignmentDetails/${params.id}`, { credentials: 'include' })
            },
            {
                path: '/markAssignment/:id',
                element: <PrivateRoute><MarkAssignment></MarkAssignment></PrivateRoute>,
                loader: ({ params }) => fetch(`https://online-group-study-server-three.vercel.app/markAssignment/${params.id}`, { credentials: 'include' })
            },





        ],

    },
]);


export default router;