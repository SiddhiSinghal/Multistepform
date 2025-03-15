document.addEventListener("DOMContentLoaded", function () {
    const formSteps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const backBtns = document.querySelectorAll(".back-btn");
    const progressSteps = document.querySelectorAll(".step");
    const form = document.getElementById("multiStepForm");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const summary = document.getElementById("summary");

    let currentStep = localStorage.getItem("currentStep")
        ? parseInt(localStorage.getItem("currentStep"))
        : 0;
    
    const formData = localStorage.getItem("formData")
        ? JSON.parse(localStorage.getItem("formData"))
        : {};

    function loadFormData() {
        document.getElementById("name").value = formData["name"] || "";
        document.getElementById("dob").value = formData["dob"] || "";
        document.getElementById("gender").value = formData["gender"] || "";
        document.getElementById("email").value = formData["email"] || "";
        document.getElementById("phone").value = formData["phone"] || "";
        document.getElementById("address").value = formData["address"] || "";
    }

    function showStep(step) {
        formSteps.forEach((formStep, index) => {
            formStep.classList.toggle("active", index === step);
            progressSteps[index].classList.toggle("active", index <= step);
        });

        if (step === 2) {
            updateSummary();
        }

        localStorage.setItem("currentStep", step);
    }

    function updateSummary() {
        formData["name"] = document.getElementById("name").value;
        formData["dob"] = document.getElementById("dob").value;
        formData["gender"] = document.getElementById("gender").value;
        formData["email"] = document.getElementById("email").value;
        formData["phone"] = document.getElementById("phone").value;
        formData["address"] = document.getElementById("address").value;

        localStorage.setItem("formData", JSON.stringify(formData));

        summary.innerHTML = `
            <strong>Name:</strong> ${formData["name"]} <br>
            <strong>Date of Birth:</strong> ${formData["dob"]} <br>
            <strong>Gender:</strong> ${formData["gender"]} <br>
            <strong>Email:</strong> ${formData["email"]} <br>
            <strong>Phone:</strong> ${formData["phone"]} <br>
            <strong>Address:</strong> ${formData["address"]}
        `;
    }

    nextBtns.forEach((button) => {
        button.addEventListener("click", () => {
            currentStep++;
            showStep(currentStep);
        });
    });

    backBtns.forEach((button) => {
        button.addEventListener("click", () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        alert("Submitting data...");

        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Data submitted successfully!");
            localStorage.clear();
        } else {
            alert("Error submitting data.");
        }
    });

    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
    });

    loadFormData();
    showStep(currentStep);
});
