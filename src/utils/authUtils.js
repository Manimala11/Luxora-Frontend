import { jwtDecode } from "jwt-decode";

export const triggerAuthUpdate = () => window.dispatchEvent(new Event("manualStorageUpdate"));

export const listenToAuthChanges = (callback) => {
    const checkAuth = () => {
        const token = localStorage.getItem("token");
        if (!token) return callback(false);

        try {
            const decoded = jwtDecode(token);

            if (decoded.exp && decoded.exp < Date.now() / 1000) {
                localStorage.removeItem("token");
                callback(false);
                triggerAuthUpdate();
                window.dispatchEvent(new CustomEvent("tokenExpired"));
            } else callback(true);
        } catch {
            localStorage.removeItem("token");
            callback(false);
            triggerAuthUpdate();
            window.dispatchEvent(new CustomEvent("tokenExpired"));
        }
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("manualStorageUpdate", checkAuth)

    const interval = setInterval(checkAuth, 10000);

    return () => {
        clearInterval(interval);
        window.removeEventListener("storage", checkAuth);
        window.removeEventListener("manualStorageUpdate", checkAuth)
    }
}