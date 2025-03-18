import {Link} from 'react-router-dom';

function Header() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8 text-center">
                Notes-App
            </h1>
            <nav className="flex space-x-4">
                <Link className="hover:underline" to="/course">
                    Tee muistiinpanoja
                </Link>
                <Link className="hover:underline" to="/list">
                    Listaus
                </Link>
                <Link className="hover:underline" to="/addnew">
                    Lisää kurssi
                </Link>
            </nav>
        </div>
    );
}

export default Header;