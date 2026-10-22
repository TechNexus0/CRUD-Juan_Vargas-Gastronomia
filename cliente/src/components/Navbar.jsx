import { Link } from "react-router-dom";
import { Utensils, PlusCircle, House } from "lucide-react";

function Navbar() {
    return (
        <nav className="bg-orange-600 text-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                    <Utensils size={28} />
                    Restaurante
                </Link>

                <div className="flex items-center gap-5">
                    <Link to="/" className="flex items-center gap-2 hover:text-orange-200">
                        <House size={19} />
                        Menú
                    </Link>

                    <Link to="/nuevo" className="flex items-center gap-2 hover:text-orange-200">
                        <PlusCircle size={19} />
                        Agregar plato
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
