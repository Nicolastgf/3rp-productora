import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

// Páginas
import HomePage from "./pages/HamePage";
import Operacion from "./pages/operacion/ListOperacionPage";
import Personas from "./pages/personas/ListPersonsPage";
import Gastos from "./pages/gastos/ListGastosPage";
import CuentaCorrientePage from "./pages/personas/CuentaCorrientePage";
import Login from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

// Componente para controlar NavBar y rutas
const MainContent = () => {
  const location = useLocation();
  const mostrarNavBar = location.pathname !== "/"; // 🔹 Oculta NavBar solo en login

  return (
    <>
      {mostrarNavBar && <NavBar />}

      <Routes>
        {/* 🔓 Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* 🔐 Rutas privadas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/operacion"
          element={
            <PrivateRoute>
              <Operacion />
            </PrivateRoute>
          }
        />
        <Route
          path="/personas/:tipo"
          element={
            <PrivateRoute>
              <Personas />
            </PrivateRoute>
          }
        />
        <Route
          path="/gastos"
          element={
            <PrivateRoute>
              <Gastos />
            </PrivateRoute>
          }
        />
        <Route
          path="/cuentacorriente/:tipo/:idPersona"
          element={
            <PrivateRoute>
              <CuentaCorrientePage />
            </PrivateRoute>
          }
        />

        {/* Ruta 404 */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
};

export default App;
