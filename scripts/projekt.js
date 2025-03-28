
// nawigacja do strony projekt2.html
// Przykład użycia JavaScript do nawigacji do innej strony
document.getElementById("button").addEventListener("click", function() {
    window.location.href = "projekt2.html";
});

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