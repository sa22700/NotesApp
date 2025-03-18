import { coursedata } from './saving/coursedata.js';
import { useState } from 'react';

function Coursenotes({ data }) {
    const deleteNote = coursedata((state) => state.deleteNote);

    const [text] = useState(data.text);

    const handleCloseClick = () => {
        deleteNote(data);
    };

    return (
        <div className="bg-black p-4 rounded-lg shadow-md mb-4">
            <div className="relative">
                <button
                    className="absolute top-2 right-2 text-white hover:underline cursor-pointer"
                    aria-label="Sulje kortti"
                    onClick={handleCloseClick}
                >
                    [x]
                </button>
                <p className="text-white font-semibold max-w-md break-words">{text} - id: {data.id}</p>
                <br />
            </div>
        </div>
    );
}

export default Coursenotes;
