import Notes from './Notes.jsx';
import { userdata } from './saving/userdata.js';
import { useEffect, useState } from "react";

function NotesList({ selectedCourse }) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (selectedCourse) {
            setNotes(userdata.getState().data[selectedCourse] || []);
        }
    }, [selectedCourse]);

    return (
        <div className="mt-8">
            <h3 className="text-white text-2xl font-semibold mb-4">Tulokset ({notes.length})</h3>

            {notes.length > 0 ? (
                <div className="space-y-4">
                    {notes.map((note, i) => (
                        <Notes data={{ id: selectedCourse, text: note.text }} key={i} />
                    ))}
                </div>
            ) : (
                <p className="text-white">Ei tuloksia</p>
            )}
        </div>
    );
}

export default NotesList;
