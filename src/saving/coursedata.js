/*
Copyright [2025] [Pirkka Toivakka]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
limitations under the License.
*/

import { create } from 'zustand';
import { userdata } from './userdata.js';

let courseID = 4;

const coursedata = create((set) => ({
    data: [
        { id: 1, text: "Matematiikka" },
        { id: 2, text: "Fysiikka" },
        { id: 3, text: "Ohjelmointi 2" }
    ],

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
