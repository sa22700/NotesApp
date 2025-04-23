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

import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {coursedata} from "../saving/coursedata.js";

const Addnew = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([
        "Classic terminal tool\n",
        "(C) Copyright 2025\n"
    ]);
    const startPrompt = "C:\\> ";
    const [addStep, setAddStep] = useState(null)
    const navigate = useNavigate();
    const timer = (path, delay = 1000) => {setTimeout(() => {navigate(path);}, delay);
    };
    const terminalRef = useRef(null);
    const handleCommand = (command) => {
        const args = command.split(" ");
        const cmd = args[0].toLowerCase();
        let response = [];

        if (addStep === 1) {
            const courseName = command.trim();
            if (!courseName) {
                response = [`C:\\> ${input}`, 'Virhe: Kurssin nimi ei voi olla tyhjä!'];
            }else {
                coursedata.getState().addcourse({text: courseName});
                response = [`C:\\> ${input}`, `Kurssi ${courseName} lisätty onnistuneesti.`];
            }
            setAddStep(0);

        }else if (cmd.toLowerCase() === "help") {
            response = [
                `C:\\> ${cmd}`,
                "Käytettävissä olevat komennot:",
                "ADD         - lisää kurssi",
                "ADDNOTE     - siirtyy muistiinpanojen lisäys sivulle",
                "EXIT        - siirtyy takaisin pääsivulle",
                "LIST        - siirtyy listaus sivulle",
                "CLEAR       - tyhjentää terminaalin",
            ];
        }else if (cmd === "add") {
            response = [`C:\\> ${cmd}`, 'Syötä uuden kurssin nimi: '];
            setAddStep(1);

        }else if (cmd === "addnote") {
            setOutput((prev) => [...prev, `C:\\> ${cmd}`, "Siirrytään muistiinpanojen lisäykseen...", ...response]);
            timer("/course", 1000)

        }else if (cmd === "exit") {
            setOutput((prev) => [...prev, `C:\\> ${cmd}`, "Siirrytään pääsivulle...", ...response]);
            timer("/", 1000)

        } else if (cmd === "list") {
            setOutput((prev) => [...prev, `C:\\> ${cmd}`, "Siirrytään kurssilistaukseen...", ...response]);
            timer("/list", 1000)

        } else if (cmd === "clear") {
            setOutput(["Classic terminal tool\n", "(C) Copyright 2025\n", `C:\\> ${cmd}`]);

        } else {
            response = [`C:\\> ${input}`, `Virhe: Tuntematon komento "${input}". Kirjoita HELP saadaksesi listan komennoista.`];
        }
        setOutput((prev) => [...prev, ``, ...response]);
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

export default Addnew;