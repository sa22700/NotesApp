import { create } from 'zustand';

let courseNoteIDs = {}; // Seuraa jokaisen kurssin viimeisintä muistiinpanon ID:tä

const userdata = create((set) => ({
    data: {}, // Muistiinpanot tallennetaan objektina { kurssiID: [muistiinpanot] }

    addRow: (courseID, text) =>
        set((state) => {
            // Jos kurssille ei ole vielä muistiinpanoja, aloita ID:stä 1
            if (!courseNoteIDs[courseID]) {
                courseNoteIDs[courseID] = 1;
            } else {
                courseNoteIDs[courseID]++; // Kasvatetaan ID:tä
            }

            const newNote = { id: courseNoteIDs[courseID], text };
            const updatedData = {
                ...state.data,
                [courseID]: [...(state.data[courseID] || []), newNote],
            };
            return { data: updatedData };
        }),

    deleteNote: (courseID, noteID) =>
        set((state) => {
            const updatedData = {
                ...state.data,
                [courseID]: state.data[courseID].filter((note) => note.id !== noteID),
            };

            // Jos kurssilla ei ole enää muistiinpanoja, nollataan ID-laskuri
            if (updatedData[courseID].length === 0) {
                delete courseNoteIDs[courseID];
            }

            return { data: updatedData };
        }),

    deleteAllNotesForCourse: (courseID) =>
        set((state) => {
            const updatedData = { ...state.data };
            delete updatedData[courseID]; // Poistetaan kaikki muistiinpanot tälle kurssille

            // Nollataan myös ID-laskuri tälle kurssille
            delete courseNoteIDs[courseID];

            return { data: updatedData };
        }),
}));

export { userdata };
