import { useState, useEffect } from "react";
import { analyzeText } from './utils/Analyzer.js';
import { userdata } from './saving/userdata.js';
import { coursedata } from './saving/coursedata.js';
import NotesList from "./NotesList.jsx";

function NotesInput() {
    const addRow = userdata((state) => state.addRow);
    const Courses = coursedata((state) => state.data);

    const [SelectedOption, SetSelectedOption] = useState(null);
    const [text, setText] = useState("");

    useEffect(() => {
        setText("");
    }, [SelectedOption]);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSelectChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedCourse = Courses.find((course) => course.id === selectedId);
        SetSelectedOption(selectedCourse);
    };

    const handleClick = () => {
        if (!SelectedOption) return;
        let r = analyzeText(text);
        if (!r.text || r.text.trim().length === 0) return;

        addRow(SelectedOption.id, r.text);
        setText("");
    };

    return (
        <div>
            <select
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                value={SelectedOption ? SelectedOption.id : ""}
                onChange={handleSelectChange}
            >
                <option value="">Valitse kurssi</option>
                {Courses.map((d) => (
                    <option key={d.id} value={d.id}>
                        {d.text} - {d.id}
                    </option>
                ))}
            </select>

            <textarea
                onChange={handleChange}
                value={text}
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 resize-none"
            ></textarea>

            <br />
            <button
                onClick={handleClick}
                className="mt-4 bg-gray-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            >
                Tallenna
            </button>

            {/* Lähetetään valittu kurssi NotesListille */}
            <NotesList selectedCourse={SelectedOption?.id} />
        </div>
    );
}

export default NotesInput;
