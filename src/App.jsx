import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

// 🧠 Importamos el store global
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

// Páginas
import HomePage from "./pages/HamePage";
import Operacion from "./pages/operacion/ListOperacionPage";
import Personas from "./pages/personas/ListPersonsPage";
import Gastos from "./pages/gastos/ListGastosPage";
import CuentaCorrientePage from "./pages/personas/CuentaCorrientePage";

import OperacionDetalle from "./pages/operacion/OperacionDetalle";
import AllOperaciones from "./pages/operacion/AllOperaciones";

import Login from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import CajaPage from "./pages/caja/CajaPage";

function App() {
  const { setAuth } = useAuthStore();

  // 🔹 Sincroniza el token/usuario guardados en localStorage con Zustand
  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (token && usuario) {
      setAuth(usuario, token);
    }
  }, [setAuth]);

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
          path="/operaciones/:id"
          element={
            <PrivateRoute>
              <OperacionDetalle />
            </PrivateRoute>
          }
        />
        <Route
          path="/operaciones/detalle"
          element={
            <PrivateRoute>
              <AllOperaciones />
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
          path="/caja"
          element={
            <PrivateRoute>
              <CajaPage />
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
