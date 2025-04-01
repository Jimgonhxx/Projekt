document.addEventListener("DOMContentLoaded", () => {
    // Rejestracja użytkownika
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("register-username").value;
            const password = document.getElementById("register-password").value;

            fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Rejestracja nie powiodła się. Użytkownik może już istnieć.");
                    }
                    return response.text();
                })
                .then(() => {
                    alert("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Wystąpił błąd podczas rejestracji.");
                });
        });
    }

    // Logowanie użytkownika
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Logowanie nie powiodło się. Sprawdź dane logowania.");
                    }
                    return response.json();
                })
                .then((data) => {
                    localStorage.setItem("token", data.token);
                    alert("Zalogowano pomyślnie!");
                    window.location.href = "projekt.html";
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Wystąpił błąd podczas logowania.");
                });
        });
    }

    // Sprawdzenie, czy użytkownik jest zalogowany
    const token = localStorage.getItem("token");
    const allowedPaths = ["/views/login.html", "/views/register.html"]; // Poprawione ścieżki

    if (!token && !allowedPaths.some(path => window.location.pathname.endsWith(path))) {
        alert("Musisz być zalogowany, aby uzyskać dostęp do tej strony.");
        window.location.href = "login.html";
    }
});