import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import TaskList from "../components/TaskList";
import {
    fetchRestaurante,
    updateRestaurante,
    deleteRestaurante
} from "../api/restaurante";

function Homepage() {
    const [restaurantes, setRestaurantes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const cargarRestaurantes = async () => {
        try {
            setError("");
            const datos = await fetchRestaurante();
            setRestaurantes(datos);
        } catch (error) {
            setError("No se pudo conectar con el servidor. Verifica que el backend esté activo.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarRestaurantes();
    }, []);

    const eliminarPlato = async (restaurante) => {
        const confirmar = window.confirm(
            `¿Deseas eliminar ${restaurante.plato}?`
        );

        if (!confirmar) return;

        try {
            await deleteRestaurante(restaurante.id);
            await cargarRestaurantes();
        } catch (error) {
            setError(error.response?.data?.detail || "No se pudo eliminar el plato.");
        }
    };

    const cambiarDisponibilidad = async (restaurante) => {
        try {
            await updateRestaurante(restaurante.id, {
                disponible_hoy: !restaurante.disponible_hoy
            });

            await cargarRestaurantes();
        } catch (error) {
            setError(error.response?.data?.detail || "No se pudo cambiar la disponibilidad.");
        }
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Menú del restaurante
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Administra los platos y su disponibilidad diaria.
                    </p>
                </div>

                <Link
                    to="/nuevo"
                    className="flex items-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700"
                >
                    <PlusCircle size={20} />
                    Nuevo plato
                </Link>
            </div>

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-5">
                    {error}
                </div>
            )}

            {cargando ? (
                <p className="text-gray-600">Cargando menú...</p>
            ) : (
                <TaskList
                    restaurantes={restaurantes}
                    onEliminar={eliminarPlato}
                    onCambiarDisponibilidad={cambiarDisponibilidad}
                />
            )}
        </main>
    );
}

export default Homepage;
