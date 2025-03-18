import {create} from 'zustand'

let ID = 1
let data_course = [];
const coursedata = create((set) => ({
    data: data_course,
    addcourse: (d) => set((state) => ({data: [...state.data, {id: ID++, ...d}]})),
    deleteNote: (del) => set((state) => ({data: state.data.filter((d) => d.id !== del.id)})),
}))

export {coursedata}