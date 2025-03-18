import { create } from 'zustand';

const userdata = create((set) => ({
    data: {}, // Muistiinpanot tallennetaan aiheen ID:n perusteella

    addRow: (courseID, text) =>
        set((state) => ({
            data: {
                ...state.data,
                [courseID]: [...(state.data[courseID] || []), text],
            },
        })),

    deleteNote: (courseID, text) =>
        set((state) => ({
            data: {
                ...state.data,
                [courseID]: state.data[courseID].filter((t) => t !== text),
            },
        })),
}));

export { userdata };
