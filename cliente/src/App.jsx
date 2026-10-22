import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import TaskForm from "./pages/TaskForm";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-orange-50">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/nuevo" element={<TaskForm />} />
                    <Route path="/editar/:id" element={<TaskForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
