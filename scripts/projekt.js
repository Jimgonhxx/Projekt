// Skrypt do wybierania tylko jednego checkboxa w grupie (np. płeć)
document.querySelectorAll('.gender-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            document.querySelectorAll('.gender-checkbox').forEach(cb => {
                if (cb !== event.target) {
                    cb.checked = false; // Odznacz inne checkboxy
                }
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Załaduj toster z pliku toast.html
    fetch('../components/toast.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html); // Dodaj toster na końcu <body>
        })
        .catch(error => console.error('Błąd podczas ładowania tostera:', error));

    const button = document.getElementById("button");

    // Funkcja do wyświetlania tostera
    function showToast(message, type = "danger") {
        const toastBody = document.querySelector("#liveToast .toast-body");
        const toastElement = document.getElementById("liveToast");

        if (!toastBody || !toastElement) {
            console.error("Toster nie został znaleziony w DOM.");
            return;
        }

        // Ustaw treść tostera
        toastBody.textContent = message;

        // Zmień kolor tostera w zależności od typu (np. danger, success)
        toastElement.className = `toast align-items-center text-bg-${type} border-0`;

        // Inicjalizacja i pokazanie tostera
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }

    button.addEventListener("click", () => {
        // Pobierz wartości z formularza
        const age = document.getElementById("age").value;
        const weight = document.getElementById("weight").value;
        const height = document.getElementById("height").value;
        const unit = document.getElementById("unit").value;
        const activity = document.getElementById("activity").value;
        const goal = document.getElementById("goal").value;

        // Sprawdź, czy wybrano płeć
        const genderCheckboxes = document.querySelectorAll(".gender-checkbox");
        const genderSelected = Array.from(genderCheckboxes).some(checkbox => checkbox.checked);

        // Walidacja danych
        if (!genderSelected) {
            showToast("Proszę wybrać płeć.");
            return;
        }
        if (!age || age <= 0) {
            showToast("Proszę podać poprawny wiek.");
            return;
        }
        if (!weight || weight <= 0) {
            showToast("Proszę podać poprawną wagę.");
            return;
        }
        if (!height || height <= 0) {
            showToast("Proszę podać poprawny wzrost.");
            return;
        }
        if (!unit) {
            showToast("Proszę wybrać jednostkę wzrostu.");
            return;
        }
        if (!activity) {
            showToast("Proszę wybrać poziom aktywności.");
            return;
        }
        if (!goal) {
            showToast("Proszę wybrać cel.");
            return;
        }

        // Przekierowanie na inną stronę
        showToast("Dane zostały zatwierdzone!", "success");
        setTimeout(() => {
            window.location.href = "projekt2.html";
        }, 2000); // Przekierowanie po 2 sekundach
    });
});


document.addEventListener("DOMContentLoaded", () => {
    // Załaduj nagłówek
    fetch('../components/header.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html); // Dodaj nagłówek na początku <body>
        })
        .catch(error => console.error('Błąd podczas ładowania nagłówka:', error));

    // Załaduj stopkę
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html); // Dodaj stopkę na końcu <body>
        })
        .catch(error => console.error('Błąd podczas ładowania stopki:', error));
});