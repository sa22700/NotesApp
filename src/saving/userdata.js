import { create } from 'zustand';

let courseNoteIDs = {};

const userdata = create((set) => ({
    data: {
        1: [
            { id: 1, text: "Integraalin laskeminen", date: "Tue Apr 15 2025 16:52:05 GMT+0300 (Itä-Euroopan kesäaika)" },
            { id: 2, text: "Derivaattaesimerkki", date: "Tue Apr 15 2025 16:52:05 GMT+0300 (Itä-Euroopan kesäaika)" }
        ],
        2: [
            { id: 1, text: "Newtonin II laki", date: "Tue Apr 15 2025 16:52:05 GMT+0300 (Itä-Euroopan kesäaika)" }
        ],
        3: [
            { id: 1, text: "Muuttujat ja tietotyypit", date: "Tue Apr 15 2025 16:52:05 GMT+0300 (Itä-Euroopan kesäaika)" },
            { id: 2, text: "If-else -rakenteet", date: "Tue Apr 15 2025 16:52:05 GMT+0300 (Itä-Euroopan kesäaika)" },
            { id: 3, text: "For-silmukkaesimerkki", date: "Tue Apr 15 2025 16:52:05 GMT+0300 (Itä-Euroopan kesäaika)" }
        ]
    },

    addRow: (courseID, text) =>
        set((state) => {
            if (!courseNoteIDs[courseID]) {
                courseNoteIDs[courseID] = 1;
            } else {
                courseNoteIDs[courseID]++;
            }
            const newNote = { id: courseNoteIDs[courseID], date: new Date().toString(), text: text };
            const updatedData = {...state.data, [courseID]: [...(state.data[courseID] || []), newNote],
            };
            return { data: updatedData };
        }),

    deleteNote: (courseID, noteID) =>
        set((state) => {
            const updatedData = {...state.data, [courseID]: state.data[courseID].filter((note) => note.id !== noteID),
            };

            if (updatedData[courseID].length === 0) {
                delete courseNoteIDs[courseID];}
            return { data: updatedData };
        }),

    deleteAllNotesForCourse: (courseID) =>
        set((state) => {
            const updatedData = { ...state.data };
            delete updatedData[courseID];
            delete courseNoteIDs[courseID];
            return { data: updatedData };
        }),
}));

export { userdata };
