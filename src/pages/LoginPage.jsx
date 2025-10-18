import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login/login.css";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [colorMensaje, setColorMensaje] = useState("black");
  const navigate = useNavigate();

  // Si ya hay token, redirigir
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home", { replace: true });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          MailUsuario: mail,
          PasswordUsuario: password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        // Guardar token + usuario
        if (data.token) localStorage.setItem("token", data.token);
        if (data.usuario)
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
        setMensaje("✅ " + data.message);
        setColorMensaje("green");

        // Redirigir
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 600);
      } else {
        setMensaje("⚠️ " + data.message);
        setColorMensaje("red");
      }
    } catch (err) {
      console.error(err);
      setMensaje("Error al conectar con el servidor");
      setColorMensaje("red");
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico</label>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="ejemplo@correo.com"
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <button type="submit">Ingresar</button>
      </form>

      {mensaje && (
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: colorMensaje,
          }}
        >
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default Login;
