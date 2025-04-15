import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userdata } from "../saving/userdata.js";
import { coursedata } from "../saving/coursedata.js";

const Course = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([
        "Classic terminal tool\n",
        "(C) Copyright 2025\n",
        "C:\\> "
    ]);
    const startPrompt = "C:\\> ";
    const [addStep, setAddStep] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState(null);
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

        if (addStep === 1) {
            const courseID = parseInt(command);
            const course = coursedata.getState().data.find(c => c.id === courseID);

            if (!course) {
                response = [`Virhe: Kurssin ID:llä ${courseID} ei löytynyt.`];
                setAddStep(0);
            } else {
                setSelectedCourse(course);
                response = [`Kurssi ${course.text} valittu. Kirjoita muistiinpano:`];
                setAddStep(2);
            }

        } else if (addStep === 2) {
            userdata.getState().addRow(selectedCourse.id, command);
            response = [`Muistiinpano lisätty kurssille ${selectedCourse.text}: ${command}`];
            setAddStep(0);
        } else if (cmd === "help") {
            response = [
                "Käytettävissä olevat komennot:",
                "ADD         - lisää muistiinpano kurssille",
                "EXIT        - siirtyy takaisin pääsivulle",
                "LIST        - siirtyy listaus sivulle",
                "ADDNEW      - siirtyy kurssin lisäys sivulle",
                "CLEAR       - tyhjentää terminaalin",
            ];
        } else if (cmd === "add") {
            const courses = coursedata.getState().data;

            if (courses.length === 0) {
                response = ["Ei lisättyjä kursseja!"];
            } else {
                response = ["Syötä kurssin ID, johon haluat lisätä muistiinpanon:"].concat(
                    courses.map(course => `[${course.id}] ${course.text}`)
                );
                setAddStep(1);
            }

        } else if (cmd === "exit") {
            response = ["Siirrytään pääsivulle..."];
            timer("/", 1000);
        } else if (cmd === "list") {
            response = ["Siirrytään kurssilistaukseen..."];
            timer("/list", 1000);
        } else if (cmd === "addnew") {
            response = ["Siirrytään uuden kurssin lisäykseen..."];
            timer("/addnew", 1000);
        }else if (cmd === "clear") {
            setOutput(["Classic terminal tool\n", "(C)Copyright 2025\n", "C:\\>"]);
            return;
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
                <span className="text-green-500">{startPrompt}</span>
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

export default Course;