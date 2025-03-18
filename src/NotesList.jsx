import Notes from './Notes.jsx';
import { userdata} from './saving/userdata.js';

function NotesList() {
    const data = userdata((state) => state.data);
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Tulokset ({data.length})</h3>
            {data.length > 0 && (
                <div className="space-y-4">
                    {
                        data.map((d, i) => {
                            return <Notes data={d} key={i}/>
                        })
                    }
                </div>
            )}
            {data.length === 0 && <p className="space-y-4">Ei tuloksia</p>
            }
        </div>
    );
}

export default NotesList;