/*
Copyright [2025] [Pirkka Toivakka]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
limitations under the License.
*/

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
