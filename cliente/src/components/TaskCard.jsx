
import { Link } from "react-router-dom";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";

function TaskCard({ restaurante, onEliminar, onCambiarDisponibilidad }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 border border-orange-100">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">
                        {restaurante.plato}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {restaurante.categoria_plato}
                    </p>
                </div>

                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    restaurante.disponible_hoy
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}>
                    {restaurante.disponible_hoy ? "Disponible" : "No disponible"}
                </span>
            </div>

            <p className="text-2xl font-bold text-orange-600 mt-5">
                ${Number(restaurante.precio).toLocaleString("es-CO")}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
                <button
                    onClick={() => onCambiarDisponibilidad(restaurante)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                >
                    {restaurante.disponible_hoy
                        ? <XCircle size={17} />
                        : <CheckCircle size={17} />}
                    Cambiar disponibilidad
                </button>

                <Link
                    to={`/editar/${restaurante.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm"
                >
                    <Pencil size={17} />
                    Editar
                </Link>

                <button
                    onClick={() => onEliminar(restaurante)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-sm"
                >
                    <Trash2 size={17} />
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default TaskCard;
