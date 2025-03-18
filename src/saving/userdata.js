import {create} from 'zustand'


let data_origin = [];
const userdata = create((set) => ({
    data: data_origin,
    addRow: (r) => set((state) => ({data: [...state.data, { ...r }]})),
    deleteNote: (del) => set((state) => ({data: state.data.filter((r) => r.text !== del.text)})),
}));

export {userdata}