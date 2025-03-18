import { coursedata } from './saving/coursedata.js';
import { useState } from 'react';

function Coursenotes({ data }) {
    const deleteNote = coursedata((state) => state.deleteNote);

    const [text] = useState(data.text);

    const handleCloseClick = () => {
        deleteNote(data);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:underline cursor-pointer"
                    aria-label="Sulje kortti"
                    onClick={handleCloseClick}
                >
                    [x]
                </button>
                <p className="font-semibold max-w-md break-words">{text} - id: {data.id}</p>
                <br />
            </div>
        </div>
    );
}

export default Coursenotes;
