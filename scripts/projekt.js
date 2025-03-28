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
    const button = document.getElementById("button");

    button.addEventListener("click", () => {
        // Get all required inputs
        const age = document.getElementById("age").value;
        const weight = document.getElementById("weight").value;
        const height = document.getElementById("height").value;
        const unit = document.getElementById("unit").value;
        const activity = document.getElementById("activity").value;
        const goal = document.getElementById("goal").value;

        // Check if at least one gender checkbox is selected
        const genderCheckboxes = document.querySelectorAll(".gender-checkbox");
        const genderSelected = Array.from(genderCheckboxes).some(checkbox => checkbox.checked);

        // Validate inputs
        if (!genderSelected) {
            alert("Proszę wybrać płeć.");
            return;
        }
        if (!age || age <= 0) {
            alert("Proszę podać poprawny wiek.");
            return;
        }
        if (!weight || weight <= 0) {
            alert("Proszę podać poprawną wagę.");
            return;
        }
        if (!height || height <= 0) {
            alert("Proszę podać poprawny wzrost.");
            return;
        }
        if (!unit) {
            alert("Proszę wybrać jednostkę wzrostu.");
            return;
        }
        if (!activity) {
            alert("Proszę wybrać poziom aktywności.");
            return;
        }
        if (!goal) {
            alert("Proszę wybrać cel.");
            return;
        }

        // Redirect to another page
        window.location.href = "projekt2.html";
    });
});