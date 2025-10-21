import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

// Páginas
import Home from "./pages/HamePage";
import Operacion from "./pages/operacion/ListOperacionPage";
import Personas from "./pages/personas/ListPersonsPage";
import Gastos from "./pages/gastos/ListGastosPage";
import CuentaCorrientePage from "./pages/personas/CuentaCorrientePage";
import OperacionDetalle from "./pages/operacion/OperacionDetalle";
import AllOperaciones from "./pages/operacion/AllOperaciones";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />

        {/* Otras rutas */}
        <Route path="/operacion" element={<Operacion />} />
        <Route path="/operaciones/:id" element={<OperacionDetalle />} />
        <Route path="/operaciones/detalle" element={<AllOperaciones />} />
        <Route path="/personas/:tipo" element={<Personas />} />
        <Route path="/gastos" element={<Gastos />} /> 
        <Route path="/cuentacorriente/:tipo/:idPersona" element={<CuentaCorrientePage/>} /> 



        {/* Ruta para 404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
