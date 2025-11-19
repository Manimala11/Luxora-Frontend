export const scrollToTop = () => window.scrollTo({ top: 0, behavior: "instant" });

export const scrollToProducts = () => window.scrollTo({ top: 330, behavior: "smooth" });

export const navigateToProducts = (navigate, location) => {
    if (location.pathname === "/") {
        scrollToProducts();
    } else {
        navigate("/", { state: { scrollToProduct: true } });
    }
};