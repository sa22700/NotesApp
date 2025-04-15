import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Terminal = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([
        "Classic terminal tool\n",
        "(C) Copyright 2025\n",
        "C:\\> "
    ]);
    const startPrompt = "C:\\> ";
    const navigate = useNavigate();
    const timer = (path, delay = 1000) => {setTimeout(() => {navigate(path);}, delay);
    };
    const terminalRef = useRef(null);

    const handleCommand = (command) => {
        const args = command.split(" ");
        const cmd = args[0].toLowerCase();
        let response = [];

        if (cmd.toLowerCase() === "help") {
            response = [
                "Käytettävissä olevat komennot:",
                "ADD         - siirtyy muistiinpanojen lisäys sivulle",
                "LIST        - siirtyy listaus sivulle",
                "ADDNEW      - siirtyy kurssin lisäys sivulle",
                "CLEAR       - tyhjentää terminaalin",
            ];
        } else if (cmd === "add") {
            setOutput((prev) => [...prev, `C:\\> ${input}`, "Siirrytään kurssisivulle...", ...response, "C:\\>"]);
            timer("/course");
        } else if (cmd === "list") {
            setOutput((prev) => [...prev, `C:\\> ${input}`, "Siirrytään kurssilistaukseen...", ...response, "C:\\>"]);
            timer("/list");
        } else if (cmd === "addnew") {
            setOutput((prev) => [...prev, `C:\\> ${input}`, "Siirrytään uuden kurssin lisäykseen...", ...response, "C:\\>"]);
            timer("/addnew");
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

export default Terminal;