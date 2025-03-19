import { create } from 'zustand';

const coursedata = create((set) => ({
    data: JSON.parse(localStorage.getItem("courses")) || [],

    addcourse: (d) =>
        set((state) => {
            const newCourse = { id: Date.now(), text: d.text };
            const updatedData = [...state.data, newCourse];

            localStorage.setItem("courses", JSON.stringify(updatedData)); // Tallennus
            return { data: updatedData };
        }),

    deleteNote: (del) =>
        set((state) => {
            const updatedData = state.data.filter((d) => d.id !== del.id);
            localStorage.setItem("courses", JSON.stringify(updatedData));
            return { data: updatedData };
        }),
}));

export { coursedata };
