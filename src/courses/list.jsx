import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userdata } from "../saving/userdata.js";
import { coursedata } from "../saving/coursedata.js";

const List = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([
        "Classic terminal tool\n",
        "(C)Copyright 2025\n",
        "C:\\> "
    ]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [deleteStep, setDeleteStep] = useState(0);
    const navigate = useNavigate();
    const terminalRef = useRef(null);

    const timer = (path, delay = 1000) => {
        setTimeout(() => {
            navigate(path);
        }, delay);
    };

    const handleCommand = (command) => {
        const args = command.split(" ");
        const cmd = args[0].toLowerCase();
        let response = [];

        if (deleteStep === 1) {
            const courseID = parseInt(command);

            if (isNaN(courseID)) {
                response = ["Virhe: Syötä kelvollinen kurssin ID"];
                setDeleteStep(0);
            } else {
                setSelectedCourse(courseID);
                const notes = userdata.getState().data[courseID] || [];

                if (notes.length === 0) {
                    response = [`Kurssilla ID ${courseID} ei ole muistiinpanoja.`];
                    setDeleteStep(0);
                } else {
                    response = [`Muistiinpanot kurssille ID: ${courseID}:`].concat(
                        notes.map(note => `(${note.id}) - ${note.text}`)
                    );
                    response.push("Syötä muistiinpanon ID, jonka haluat poistaa:");
                    setDeleteStep(2);
                }
            }

        } else if (deleteStep === 2) {
            const noteID = parseInt(command);

            if (isNaN(noteID)) {
                response = ["Virhe: Syötä kelvollinen muistiinpanon ID"];
            } else {
                userdata.getState().deleteNote(selectedCourse, noteID);
                response = [`Muistiinpano ID ${noteID} poistettu kurssilta ID ${selectedCourse}`];
            }
            setDeleteStep(0);

        } else if (deleteStep === 3) {
            const courseID = parseInt(command);

            if (isNaN(courseID)) {
                response = ["Virhe: Syötä kelvollinen kurssin ID"];
            } else {
                coursedata.getState().deleteCourse(courseID);
                response = [`Kurssi ID ${courseID} ja sen kaikki muistiinpanot poistettu.`];
            }
            setDeleteStep(0);

        } else if (cmd === "help") {
            response = [
                "Käytettävissä olevat komennot:",
                "ADD         - siiryy muistiinpano sivulle",
                "EXIT        - siirtyy takaisin pääsivulle",
                "LIST        - valitse listasta kurssin muistiinpanot",
                "ADDNEW      - siirtyy /addnew-sivulle",
                "DELETE      - Poistaa valitun kurssin muistiinpanon",
                "DELCOURSE   - Poistaa valitun kurssin",
                "CLEAR       - tyhjentää terminaalin",
            ];

        } else if (cmd === "list") {
            const courses = coursedata.getState().data;
            response = courses.length === 0
                ? ['Ei lisättyjä kursseja!']
                : ['Kurssit:'].concat(courses.map(course => `[${course.id}] ${course.text}`));
        } else if (!isNaN(cmd)) {
            const courseID = parseInt(cmd);
            const notes = userdata.getState().data[courseID] || [];

            if (notes.length === 0) {
                response = [`Kurssilla ID ${courseID} ei ole muistiinpanoja.`];
            } else {
                response = [`Muistiinpanot kurssille ID: ${courseID}:`].concat(
                    notes.map(note => `(${note.id}) - ${note.text}`)
                );
            }

        } else if (cmd === "all") {
            const notes = userdata.getState().data;

            if (Object.keys(notes).length === 0) {
                response = ['Ei lisättyjä muistiinpanoja'];
            } else {
                response = ['Kaikki muistiinpanot:'];
                for (const [courseID, noteList] of Object.entries(notes)) {
                    noteList.forEach(note => {
                        response.push(`[Kurssi ID: ${courseID}] (${note.id}) - ${note.text}`);
                    });
                }
            }

        } else if (cmd === "delete") {
            const courses = coursedata.getState().data;

            if (courses.length === 0) {
                response = ['Ei lisättyjä kursseja!'];
            } else {
                response = ["Valitse kurssin ID, jonka muistiinpanon haluat poistaa:", ""].concat(
                    courses.map(course => `[${course.id}] ${course.text}`)
                );
                setDeleteStep(1);
            }

        } else if (cmd === "delcourse") {
            const courses = coursedata.getState().data;

            if (courses.length === 0) {
                response = ['Ei lisättyjä kursseja!'];
            } else {
                response = ["Valitse kurssin ID, jonka haluat poistaa kokonaan:", ""].concat(
                    courses.map(course => `[${course.id}] ${course.text}`)
                );
                setDeleteStep(3);
            }

        } else if (cmd === "add") {
            setOutput((prev) => [...prev, `C:\\> ${input}`, "siirrytään muistiinpano lisäykseen...", ...response, "C:\\>"]);
            timer("/course", 1000);
        } else if (cmd === "exit") {
            setOutput((prev) => [...prev, `C:\\> ${input}`, "Siirrytään pääsivulle...", ...response, "C:\\>"]);
            timer("/", 1000);
        } else if (cmd === "addnew") {
            setOutput((prev) => [...prev, `C:\\> ${input}`, "Siirrytään uuden kurssin lisäykseen...", ...response, "C:\\>"]);
            timer("/addnew", 1000);
        } else if (cmd === "clear") {
            setOutput(["Classic terminal tool\n", "(C)Copyright 2025\n", "C:\\>"]);
        } else {
            response = [`Virhe: Tuntematon komento "${cmd}". Kirjoita HELP saadaksesi listan komennoista.`];
        }
        setOutput((prev) => [...prev, `C:\\> ${input}`, ...response, "C:\\>"]);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            e.preventDefault();
            handleCommand(input);
            setInput("");
        }
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);

    return (
        <div className="w-full h-screen bg-black text-green-500 font-mono p-4 flex flex-col overflow-hidden pt-25"
             style={{ fontSize: "16px", lineHeight: "1.4" }}>
            <div ref={terminalRef}
                 className="flex-grow overflow-y-auto whitespace-pre-wrap p-2"
                 style={{ maxHeight: "calc(100vh - 50px)", whiteSpace: "pre-wrap" }}>
                {output.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
            <div className="flex bg-black p-2">
                <span className="text-green-500">C:\></span>
                <input
                    className="bg-black text-green-500 border-none outline-none font-mono flex-grow"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    style={{ caretColor: "green" }}
                />
            </div>
        </div>
    );
};

export default List;