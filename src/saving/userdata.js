import { create } from 'zustand';

let courseNoteIDs = {};

const userdata = create((set) => ({
    data: {},

    addRow: (courseID, text) =>
        set((state) => {
            if (!courseNoteIDs[courseID]) {
                courseNoteIDs[courseID] = 1;
            } else {
                courseNoteIDs[courseID]++;
            }
            const newNote = { id: courseNoteIDs[courseID], date: new Date().toString(), text };
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
