import { create } from 'zustand';

const useCourseSelection = create((set) => ({
    selectedCourseId: null,
    setSelectedCourseId: (id) => set({ selectedCourseId: id }),
}));

export default useCourseSelection;
