import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

// Páginas
import Home from "./pages/HamePage";
import Operacion from "./pages/operacion/ListOperacionPage";
import Personas from "./pages/personas/ListPersonsPage";
import Gastos from "./pages/gastos/ListGastosPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />

        {/* Otras rutas */}
        <Route path="/operacion" element={<Operacion />} />
        <Route path="/personas/:tipo" element={<Personas />} />
        <Route path="/gastos" element={<Gastos />} /> 


        {/* Ruta para 404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
