import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createRestaurante,
    fetchRestauranteById,
    updateRestaurante,
    deleteRestaurante
} from "../api/restaurante";

function TaskForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(Boolean(id));
    const [error, setError] = useState("");

    const [formulario, setFormulario] = useState({
        plato: "",
        categoria_plato: "",
        precio: "",
        disponible_hoy: true
    });

    useEffect(() => {
        if (!id) return;

        const cargarPlato = async () => {
            try {
                const datos = await fetchRestauranteById(id);

                setFormulario({
                    plato: datos.plato,
                    categoria_plato: datos.categoria_plato,
                    precio: datos.precio,
                    disponible_hoy: datos.disponible_hoy
                });
            } catch (error) {
                setError("No se pudo cargar el plato solicitado.");
            } finally {
                setCargando(false);
            }
        };

        cargarPlato();
    }, [id]);

    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target;

        setFormulario({
            ...formulario,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError("");

        const datos = {
            ...formulario,
            precio: Number(formulario.precio)
        };

        try {
            if (id) {
                await updateRestaurante(id, datos);
            } else {
                await createRestaurante(datos);
            }

            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.detail ||
                "No se pudo guardar el plato."
            );
        }
    };

    const manejarEliminar = async () => {
        const confirmar = window.confirm(
            "¿Estás seguro de eliminar este plato?"
        );

        if (!confirmar) return;

        try {
            await deleteRestaurante(id);
            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.detail ||
                "No se pudo eliminar el plato."
            );
        }
    };

    if (cargando) {
        return <p className="max-w-2xl mx-auto p-6">Cargando plato...</p>;
    }

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {id ? "Editar plato" : "Registrar plato"}
                </h1>

                <p className="text-gray-500 mb-6">
                    Completa los datos del menú del restaurante.
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
                        {error}
                    </div>
                )}

                <form onSubmit={manejarEnvio} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Nombre del plato
                        </label>

                        <input
                            type="text"
                            name="plato"
                            value={formulario.plato}
                            onChange={manejarCambio}
                            minLength={2}
                            maxLength={100}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Ej. Bandeja paisa"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Categoría del plato
                        </label>

                        <input
                            type="text"
                            name="categoria_plato"
                            value={formulario.categoria_plato}
                            onChange={manejarCambio}
                            minLength={2}
                            maxLength={50}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Ej. Plato principal"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Precio (COP)
                        </label>

                        <input
                            type="number"
                            name="precio"
                            value={formulario.precio}
                            onChange={manejarCambio}
                            min="0.01"
                            step="0.01"
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="25000"
                        />
                    </div>

                    <label className="flex items-center gap-3 text-gray-700">
                        <input
                            type="checkbox"
                            name="disponible_hoy"
                            checked={formulario.disponible_hoy}
                            onChange={manejarCambio}
                            className="w-5 h-5 accent-orange-600"
                        />
                        Disponible hoy
                    </label>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <button
                            type="submit"
                            className="bg-orange-600 text-white px-5 py-3 rounded-lg hover:bg-orange-700"
                        >
                            {id ? "Guardar cambios" : "Registrar plato"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="bg-gray-200 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-300"
                        >
                            Cancelar
                        </button>

                        {id && (
                            <button
                                type="button"
                                onClick={manejarEliminar}
                                className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
                            >
                                Eliminar plato
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </main>
    );
}

export default TaskForm;
