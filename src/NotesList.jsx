import Notes from './Notes.jsx';
import { userdata } from './saving/userdata.js';

function NotesList({ selectedCourse }) {
    const data = userdata((state) => state.data);

    // Näytetään vain valitun aiheen muistiinpanot
    const filteredNotes = selectedCourse ? data[selectedCourse] || [] : [];

    return (
        <div className="mt-8">
            <h3 className="text-white text-2xl font-semibold mb-4">Tulokset ({filteredNotes.length})</h3>

            {filteredNotes.length > 0 ? (
                <div className="space-y-4">
                    {filteredNotes.map((text, i) => (
                        <Notes data={{ id: selectedCourse, text }} key={i} />
                    ))}
                </div>
            ) : (
                <p className="text-white space-y-4">Ei tuloksia</p>
            )}
        </div>
    );
}

export default NotesList;
