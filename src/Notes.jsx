import { userdata } from './saving/userdata.js';
import { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

function Notes({ data }) {
    const deleteNote = userdata((state) => state.deleteNote);

    const [text] = useState(data.text);
    const [date, setDate] = useState(data.date || new Date());

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

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
                <p className="font-semibold max-w-md break-words">id: {data.id} - {text}</p>
                <span><Datetime value={date} onChange={handleDateChange} /></span>
                <br />
            </div>
        </div>
    );
}

export default Notes;
