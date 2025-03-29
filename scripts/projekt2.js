// Funkcja do wyświetlania treningu w zależności od lokalizacji wybranej przez użytkownika
function selectTraining(location) {
    const resultDiv = document.getElementById("training-result");

    // Definicje zdjęć i opisów dla każdego miejsca
    const trainingOptions = {
        home: {
            message: "Trening w domu! Możesz skorzystać z maty, hantli lub ćwiczeń z masą własnego ciała.",
            images: [
                "../images/home-training/home-training1.webp",
                "../images/home-training/home-training2.webp",
                "../images/home-training/home-training3.jpg"
            ]
        },
        gym: {
            message: "Trening na siłowni! Skorzystaj z maszyn, wolnych ciężarów i zajęć grupowych.",
            images: [
                "../images/gym-training/gym-training1.jpg",
                "../images/gym-training/gym-training2.jpg",
                "../images/gym-training/gym-training3.webp"
            ]
        },
        outdoor: {
            message: "Trening na świeżym powietrzu! Spróbuj biegania, jazdy na rowerze lub treningu w parku.",
            images: [
                "../images/outdoor-training/outdoor-training1.jpg",
                "../images/outdoor-training/outdoor-training2.jpg",
                "../images/outdoor-training/outdoor-training3.jpg"
            ]
        }
    };

    // Pobierz dane dla wybranego miejsca
    const selectedOption = trainingOptions[location];

    if (!selectedOption) {
        resultDiv.innerHTML = "<p>Nie znaleziono danych dla wybranego miejsca treningu.</p>";
        return;
    }

    // Generowanie HTML dla slidera
    const imagesHtml = selectedOption.images
        .map((imageUrl, index) => `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img src="${imageUrl}" class="d-block w-100" alt="${location} training ${index + 1}">
            </div>
        `)
        .join("");

    resultDiv.innerHTML = `
        <p class="training-message">${selectedOption.message}</p>
        <div id="trainingCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                ${imagesHtml}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#trainingCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#trainingCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;
}

// Funkcja do wyświetlania tostera
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