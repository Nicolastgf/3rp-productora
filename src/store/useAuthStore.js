import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            usuario: null,
            token: null,

            // Guardar usuario y token en el estado
            setAuth: (usuario, token) => set({ usuario, token }),

            // Cerrar sesión
            logout: () => set({ usuario: null, token: null }),
        }),
        {
            name: "auth-storage", // se guarda en localStorage automáticamente
        }
    )
);
