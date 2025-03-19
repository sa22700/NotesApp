import { coursedata } from './saving/coursedata.js';
import Coursenotes from "./coursenotes.jsx";

function CourseList() {
    const datalink = coursedata((state) => state.data) || [];

    return (
        <div className="bg-black mt-8">
            <h3 className="text-white text-2xl font-semibold mb-4">Tulokset ({datalink.length})</h3>
            {datalink.length > 0 ? (
                <div className="space-y-4">
                    {datalink.map((d) => (
                        <Coursenotes data={d} key={d.id} />
                    ))}
                </div>
            ) : (
                <p className="text-white">Ei tuloksia</p>
            )}
        </div>
    );
}

export default CourseList;
