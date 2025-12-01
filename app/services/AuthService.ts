export const API_URL = "http://localhost:8085/iam";

interface LoginResultSuccess {
    isSuccess: true;
    token: string;
}

interface LoginResultError {
    isSuccess: false;
    error: string;
}

export type LoginResult = LoginResultSuccess | LoginResultError;

export async function login(email: string, password: string): Promise<LoginResult> {
    try {
        const response = await fetch(`${API_URL}/Account/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        // 🛑 Validar según el backend (isSuccess = 200 si OK)
        if (data.isSuccess !== 200) {
            return {
                isSuccess: false,
                error: "Usuario o contraseña incorrectos",
            };
        }

        const token = data.value;

        if (!token || typeof token !== "string") {
            return {
                isSuccess: false,
                error: "Usuario o contraseña incorrectos",
            };
        }

        return {
            isSuccess: true,
            token,
        };

    } catch (error) {
        console.error("Error al hacer login:", error);
        return {
            isSuccess: false,
            error: "Error de conexión con el servidor",
        };
    }
}
