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

let courseNoteIDs = {};

const userdata = create((set) => ({
    data: {
        1: [
        ],
    },

    addRow: (courseID, text) =>
        set((state) => {
            if (!courseNoteIDs[courseID]) {
                courseNoteIDs[courseID] = 1;
            } else {
                courseNoteIDs[courseID]++;
            }
            const newNote = { id: courseNoteIDs[courseID], date: new Date().toString(), text: text };
            const updatedData = {...state.data, [courseID]: [...(state.data[courseID] || []), newNote],
            };
            return { data: updatedData };
        }),

    deleteNote: (courseID, noteID) =>
        set((state) => {
            const updatedData = {...state.data, [courseID]: state.data[courseID].filter((note) => note.id !== noteID),
            };

            if (updatedData[courseID].length === 0) {
                delete courseNoteIDs[courseID];}
            return { data: updatedData };
        }),

    deleteAllNotesForCourse: (courseID) =>
        set((state) => {
            const updatedData = { ...state.data };
            delete updatedData[courseID];
            delete courseNoteIDs[courseID];
            return { data: updatedData };
        }),
}));

export { userdata };
