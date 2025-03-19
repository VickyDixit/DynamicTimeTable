    document.addEventListener("DOMContentLoaded", function () {
            const form = document.getElementById("timetableForm");

    function validateInput(input, errorMessage) {
        input.value = input.value.replace(/[^0-9]/g, '');
    const value = input.value.trim();
    const min = parseInt(input.min, 10);
    const max = parseInt(input.max, 10);
    const errorSpan = input.closest('.mb-3').querySelector('.error-message');
    const icon = input.closest('.mb-3').querySelector('.error-icon');

    if (value === "" || isNaN(value)) {
        errorSpan.textContent = errorMessage.empty;
    input.classList.add("is-invalid");
    icon.classList.remove("d-none");
                } else if (value < min || value > max) {
        errorSpan.textContent = errorMessage.range;
    input.classList.add("is-invalid");
    icon.classList.remove("d-none");
                } else {
        errorSpan.textContent = "";
    input.classList.remove("is-invalid");
    icon.classList.add("d-none");
                }
            }

    const fields = [
    {
        selector: '[name="WorkingDays"]',
    errorMessage: {
        empty: "Please enter the number of working days.",
    range: "Working days should be between 1 and 7."
                    }
                },
    {
        selector: '[name="SubjectsPerDay"]',
    errorMessage: {
        empty: "Please enter the subjects per day.",
    range: "Subjects per day should be between 1 and 8."
                    }
                },
    {
        selector: '[name="TotalSubjects"]',
    errorMessage: {
        empty: "Please enter the total number of subjects.",
    range: "Total subjects should be at least 1."
                    }
                }
    ];

            fields.forEach(field => {
                const input = document.querySelector(field.selector);
    input.addEventListener("input", function () {
        validateInput(this, field.errorMessage);
                });
            });

    form.addEventListener("submit", function (event) {
        let isValid = true;

                fields.forEach(field => {
                    const input = document.querySelector(field.selector);
    validateInput(input, field.errorMessage);
    if (input.classList.contains("is-invalid")) {
        isValid = false;
                    }
                });

    if (!isValid) {
        event.preventDefault();
    event.stopPropagation();
                }

    this.classList.add("was-validated");
            }, false);
        });

    // Redirect to Index if refreshed
    window.addEventListener("beforeunload", function (e) {
        sessionStorage.setItem("formFilled", "true");
        });