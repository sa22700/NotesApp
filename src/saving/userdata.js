import { create } from 'zustand';

const userdata = create((set) => ({
    data: JSON.parse(localStorage.getItem("notes")) || {},

    addRow: (courseID, text) =>
        set((state) => {
            const newNote = { id: Date.now(), text };
            const updatedData = {
                ...state.data,
                [courseID]: [...(state.data[courseID] || []), newNote],
            };
            localStorage.setItem("notes", JSON.stringify(updatedData));
            return { data: updatedData };
        }),

    deleteNote: (courseID, noteID) =>
        set((state) => {
            const updatedData = {
                ...state.data,
                [courseID]: state.data[courseID].filter((note) => note.id !== noteID),
            };
            localStorage.setItem("notes", JSON.stringify(updatedData));
            return { data: updatedData };
        }),
}));

export { userdata };
