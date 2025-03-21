import { create } from 'zustand';
import { userdata } from './userdata.js';

let courseID = 1;

const coursedata = create((set) => ({
    data: [],

    addcourse: (d) =>
        set((state) => {
            const newCourse = { id: courseID++, text: d.text };
            const updatedData = [...state.data, newCourse];
            return { data: updatedData };
        }),

    deleteCourse: (courseID) =>
        set((state) => {
            const updatedData = state.data.filter((d) => d.id !== courseID);
            userdata.getState().deleteAllNotesForCourse(courseID);
            return { data: updatedData };
        }),
}));

export { coursedata };
