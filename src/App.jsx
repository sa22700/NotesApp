import { Routes, Route } from "react-router-dom";
import Course from "./courses/course.jsx";
import AddNew from "./courses/addnew.jsx";
import List from "./courses/list.jsx";
import Terminal from "./Terminal.jsx";
import "./styles/app.css";

function App() {
    return (
        <div className="bg-black max-w-4xl mx-auto p-8">
            <Routes>
                <Route path="/" element={<Terminal />} />
                <Route path="/course" element={<Course />} />
                <Route path="/list" element={<List />} />
                <Route path="/addnew" element={<AddNew />} />
            </Routes>
        </div>
    );
}

export default App;
