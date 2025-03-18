import { useState } from "react";
import { analyzeText } from './utils/Analyzer.js';
import { coursedata } from './saving/coursedata.js';

function CourseInput() {
    const [text, setText] = useState("");
    const addcourse = coursedata((state) => state.addcourse);
    const courseChange = (e) => {
        setText(e.target.value);
    };

    const courseClick = () => {
        let d = analyzeText(text);
        if (d.length === 0) return
        addcourse(d)
        setText("");
    };

    return (
        <div>
    <textarea onChange={(e) => courseChange(e)} value={text} id={"textinput"}
              className="w-full p-4 border border-white
    focus:ring-2 focus:ring-white resize-none bg-white"></textarea>
            <br />
            <button  onClick={courseClick} className="mt-4 bg-gray-500 text-white
    font-semibold px-6 py-3 rounded-md hover:bg-gray-400 focus:outline-none
    focus:ring-2 focus:ring-white cursor-pointer">Tallenna</button>
        </div>
    );
}

export default CourseInput;