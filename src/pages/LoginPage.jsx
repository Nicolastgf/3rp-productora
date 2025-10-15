import { useState } from "react";
import "../styles/login/login.css";

const Login = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [colorMensaje, setColorMensaje] = useState("black");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/v1/login", {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    MailUsuario: mail,
                    PasswordUsuario: password,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMensaje("✅ " + data.message);
                setColorMensaje("green");

                // Guardar usuario logueado (opcional)
                localStorage.setItem("usuario", JSON.stringify(data.usuario));

                // Redirigir después de un breve delay
                setTimeout(() => {
                    window.location.href = "/home"; // ajustá la ruta según tu app
                }, 1500);
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
                <p style={{ marginTop: "1rem", textAlign: "center", color: colorMensaje }}>
                    {mensaje}
                </p>
            )}
        </div>
    );
};

export default Login;
