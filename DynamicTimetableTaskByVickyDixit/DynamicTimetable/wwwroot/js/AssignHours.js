document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("hoursForm");
    const enteredHoursLabel = document.getElementById("enteredTotalHours");
    const totalWeekHours = parseInt(document.getElementById("totalWeekHours").textContent, 10);
    const hourInputs = document.querySelectorAll(".subject-hours");
    const subjectInputs = document.querySelectorAll(".subject-name");
    const generateButton = document.getElementById("generateButton");

    enteredHoursLabel.textContent = "0 Hours";

    function updateTotalHours() {
        let totalHours = 0;

        hourInputs.forEach(input => {
            input.value = input.value.replace(/[^0-9]/g, '');
            const value = parseInt(input.value, 10);
            if (!isNaN(value)) {
                totalHours += value;
            }
        });

        enteredHoursLabel.textContent = `${totalHours} Hours`;

        if (totalHours === totalWeekHours) {
            enteredHoursLabel.classList.remove("text-danger");
            enteredHoursLabel.classList.add("text-success");
            generateButton.disabled = false;
        } else {
            enteredHoursLabel.classList.remove("text-success");
            enteredHoursLabel.classList.add("text-danger");
            generateButton.disabled = true;
        }
    }

    function validateDuplicates() {
        let subjectSet = new Set();
        let hasDuplicate = false;

        subjectInputs.forEach(input => {
            const value = input.value.trim().toLowerCase();
            const parentDiv = input.parentElement;
            const errorSpan = parentDiv.querySelector(".error-message");

            if (value !== "" && subjectSet.has(value)) {
                errorSpan.textContent = "Duplicate subject name!";
                errorSpan.classList.remove("d-none");
                input.classList.add("is-invalid");
                hasDuplicate = true;
            } else {
                subjectSet.add(value);
                errorSpan.classList.add("d-none");
                input.classList.remove("is-invalid");
            }
        });

        return !hasDuplicate;
    }

    function validateOnSubmit() {
        let isValid = true;
        let totalHours = 0;

        subjectInputs.forEach(input => {
            const value = input.value.trim();
            const parentDiv = input.parentElement;
            const errorSpan = parentDiv.querySelector(".error-message");

            if (value === "") {
                errorSpan.textContent = "Subject name cannot be empty!";
                errorSpan.classList.remove("d-none");
                input.classList.add("is-invalid");
                isValid = false;
            }
        });

        hourInputs.forEach(input => {
            const value = parseInt(input.value, 10);
            if (isNaN(value) || value <= 0) {
                input.classList.add("is-invalid");
                isValid = false;
            }
            totalHours += value || 0;
        });

        if (totalHours !== totalWeekHours) {
            alert("Total assigned hours must exactly match the total weekly hours!");
            isValid = false;
        }

        return isValid;
    }

    function removeErrorOnTyping(input) {
        input.addEventListener("input", function () {
            if (input.classList.contains("is-invalid")) {
                input.classList.remove("is-invalid");
                const parentDiv = input.parentElement;
                const errorSpan = parentDiv.querySelector(".error-message");
                if (errorSpan) errorSpan.classList.add("d-none");
            }
            validateDuplicates();
        });
    }

    hourInputs.forEach(input => {
        input.addEventListener("input", updateTotalHours);
        removeErrorOnTyping(input);
    });

    subjectInputs.forEach(input => {
        input.addEventListener("input", validateDuplicates);
        removeErrorOnTyping(input);
    });

    form.addEventListener("submit", function (event) {
        if (!validateOnSubmit() || !validateDuplicates()) {
            event.preventDefault();
        }
    });
});
