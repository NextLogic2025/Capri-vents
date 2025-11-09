import { useCallback } from "react";

const USERS = [
  {
    email: "cliente@cafrilosa.com",
    password: "cliente123",
    role: "cliente",
    name: "Cliente Gold",
  },
  {
    email: "vendedor@cafrilosa.com",
    password: "vendedor123",
    role: "vendedor",
    name: "Carlos Vendedor",
  },
  {
    email: "supervisor@cafrilosa.com",
    password: "supervisor123",
    role: "supervisor",
    name: "Ana Supervisor",
  },
];

const useAuthMock = () => {
  const simulateDelay = (action) => setTimeout(action, 600);

  const login = useCallback((email, password) => {
    const normalizedEmail = String(email || "").trim();
    const normalizedPassword = String(password || "").trim();

    const user = USERS.find(
      (item) => item.email === normalizedEmail && item.password === normalizedPassword
    );

    // TODO: reemplazar esta lógica por llamada real al backend o Firebase/Supabase
    if (!user) {
      return { success: false, message: "Correo o contraseña incorrectos" };
    }

    return { success: true, user };
  }, []);

  const logout = useCallback(() => {
    console.log("Logout mock ejecutado");
    // TODO: conectar con backend aquí para invalidar sesión/token
  }, []);

  const register = useCallback((data) => {
    console.log("Register mock", data);
    // TODO: conectar con backend aquí (registro)
    simulateDelay(() => {});
  }, []);

  const sendForgotPasswordCode = useCallback((email) => {
    console.log("Send forgot password code mock", email);
    // TODO: conectar con backend aquí (enviar código de recuperación)
    simulateDelay(() => {});
  }, []);

  const verifyForgotPasswordCode = useCallback((email, code) => {
    console.log("Verify forgot password code mock", { email, code });
    // TODO: conectar con backend aquí (validar código)
    simulateDelay(() => {});
  }, []);

  const resetPassword = useCallback((email, newPassword) => {
    console.log("Reset password mock", { email, newPassword });
    // TODO: conectar con backend aquí (resetear contraseña)
    simulateDelay(() => {});
  }, []);

  return {
    login,
    logout,
    register,
    sendForgotPasswordCode,
    verifyForgotPasswordCode,
    resetPassword,
  };
};

export default useAuthMock;
