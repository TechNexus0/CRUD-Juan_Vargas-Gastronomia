import TaskCard from "./TaskCard";

function TaskList({ restaurantes, onEliminar, onCambiarDisponibilidad }) {
    if (restaurantes.length === 0) {
        return (
            <div className="text-center bg-white rounded-xl p-10 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-700">
                    No hay platos registrados
                </h3>

                <p className="text-gray-500 mt-2">
                    Agrega un plato para comenzar a crear tu menú.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {restaurantes.map((restaurante) => (
                <TaskCard
                    key={restaurante.id}
                    restaurante={restaurante}
                    onEliminar={onEliminar}
                    onCambiarDisponibilidad={onCambiarDisponibilidad}
                />
            ))}
        </div>
    );
}

export default TaskList;
