import React from 'react';
import Select from 'react-select';
import { coursedata } from '../saving/coursedata.js';


function CourseSelect() {
    const data = coursedata((state) => state.data);


    const options = data.map((d) => ({ value: d.id, label: d.name }));

    const [SelectedOption, SetSelectedOption] = React.useState(null);

    const handleChange = (selected) => {
        SetSelectedOption(selected);
        onselect(selected);
    };

            return (
                <div>
                    <Select
                        value={SelectedOption}
                        onChange={handleChange}
                        options={options}
                        placeholder="Valitse kurssi"
                        className="w-full mb-4"
                    />
                </div>
            );
        }

    export default CourseSelect;