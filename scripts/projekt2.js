function selectTraining(location) {
    const resultDiv = document.getElementById("training-result");

    let message = "";
    switch (location) {
        case "home":
            message = "Wybrałeś trening w domu! Możesz skorzystać z maty, hantli lub ćwiczeń z masą własnego ciała.";
            break;
        case "gym":
            message = "Wybrałeś trening na siłowni! Skorzystaj z maszyn, wolnych ciężarów i zajęć grupowych.";
            break;
        case "outdoor":
            message = "Wybrałeś trening na świeżym powietrzu! Spróbuj biegania, jazdy na rowerze lub treningu w parku.";
            break;
        default:
            message = "Wybierz miejsce treningu.";
    }

    // Wyświetl wynik w sekcji
    resultDiv.innerHTML = `
        <div class="alert alert-info" role="alert">
            ${message}
        </div>
    `;
}

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