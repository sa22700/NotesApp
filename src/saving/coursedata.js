import { create } from 'zustand';
import { userdata } from './userdata.js'; // Importoidaan muistiinpanojen hallinta

let courseID = 1; // ID alkaa 1:stä

const coursedata = create((set) => ({
    data: [], // Tyhjä lista kursseille

    addcourse: (d) =>
        set((state) => {
            const newCourse = { id: courseID++, text: d.text }; // ID kasvaa yhdellä jokaiselle lisäykselle
            const updatedData = [...state.data, newCourse];
            return { data: updatedData }; // Palautetaan päivitetty data
        }),

    deleteCourse: (courseID) =>
        set((state) => {
            const updatedData = state.data.filter((d) => d.id !== courseID);

            // Poistetaan kurssin muistiinpanot
            userdata.getState().deleteAllNotesForCourse(courseID);

            return { data: updatedData };
        }),
}));

export { coursedata };
