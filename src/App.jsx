import {Outlet, Routes, Route} from "react-router-dom";
import Header from "./Header.jsx";
import Course from "./courses/course.jsx";
import Addnew from "./courses/addnew.jsx";
import "./styles/app.css";
import List from "./courses/list.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="course" element={<Course />} />
                <Route path="list" element={<List />} />
                <Route path="addnew" element={<Addnew />} />
            </Route>
        </Routes>
    );
}

function Layout() {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <Header />
            <Outlet />
        </div>
    );
}

export default App;
