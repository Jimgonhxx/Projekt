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
        const age = parseInt(document.getElementById("age").value);
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        const unit = document.getElementById("unit").value;
        const activity = document.getElementById("activity").value;
        const goal = document.getElementById("goal").value;
    
        // Sprawdź, czy wybrano płeć
        const genderCheckboxes = document.querySelectorAll(".gender-checkbox");
        const gender = Array.from(genderCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.parentElement.textContent.trim())[0];
    
        // Walidacja danych
        if (!gender || !age || age <= 0 || !weight || weight <= 0 || !height || height <= 0 || !unit || !activity || !goal) {
            showToast("Proszę wypełnić wszystkie pola poprawnie.");
            return;
        }
    
        // Oblicz BMI
        const heightM = unit === "cm" ? height / 100 : height * 0.3048; // Konwersja wzrostu na metry
        const bmi = (weight / (heightM * heightM)).toFixed(2);
    
        // Przygotuj dane do wysłania
        const data = {
            gender,
            age,
            weight,
            height,
            activity,
            goal,
            bmi
        };
    
        // Wyślij dane do backendu
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Błąd podczas zapisywania danych.');
                }
                return response.text();
            })
            .then(() => {
                // Zapytaj użytkownika, czy chce zobaczyć swoje BMI
                if (confirm("Dane zostały zapisane. Czy chcesz zobaczyć swoje BMI?")) {
                    // Przekieruj do strony z wynikiem BMI
                    window.location.href = `bmi.html?bmi=${bmi}`;
                } else {
                    showToast("Dane zostały zapisane, ale wynik BMI nie został wyświetlony.", "success");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showToast("Wystąpił błąd podczas zapisywania danych.");
            });
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