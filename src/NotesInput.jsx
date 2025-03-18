import { useState } from "react";
import { analyzeText } from './utils/Analyzer.js';
import { userdata } from './saving/userdata.js';
import { coursedata } from './saving/coursedata.js';


function NotesInput() {
    const addRow = userdata((state) => state.addRow);
    const Courses = coursedata((state) => state.data);
    const [SelectedOption, SetSelectedOption] = useState(null);
    const [text, setText] = useState("");
    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSelectChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedCourse = Courses.find((course) => course.id === selectedId);
        SetSelectedOption(selectedCourse);


    }
    const handleClick = () => {
        if (!SelectedOption) return
        let r = analyzeText(text);
        if (r.length === 0) return
        addRow({id: SelectedOption.id, text: r.text});
        setText("");
    };

    return (
        <div>
            <select className="w-full p-4 border border-gray-300 rounded-md focus:outline-none
    focus:ring-2 focus:ring-blue-400 resize-none bg-white"
            value={SelectedOption ? SelectedOption.id : ""}
            onChange={handleSelectChange}>
            <option value="">Valitse kurssi</option>
            {Courses.map((d) => (<option key={d.id} value={d.id} >{d.text} - {d.id}</option>))}</select>
    <textarea
        onChange={handleChange}
        value={text}
        id={"textinput"}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none
    focus:ring-2 focus:ring-blue-400 resize-none bg-white"></textarea>
            <br />
            <button  onClick={handleClick} className="mt-4 bg-blue-500 text-white
    font-semibold px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none
    focus:ring-2 focus:ring-blue-400 cursor-pointer">Tallenna</button>
        </div>
    );
}

export default NotesInput;