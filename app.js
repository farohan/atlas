const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".tab-section");

function showSection(sectionId) {

    sections.forEach(section => {
        section.classList.remove("active");
    });

    navButtons.forEach(button => {
        button.classList.remove("active");
    });

    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
        targetSection.classList.add("active");
    }

    const activeButton = document.querySelector(
        `.nav-btn[data-tab="${sectionId}"]`
    );

    if (activeButton) {
        activeButton.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const sectionId = button.dataset.tab;

        showSection(sectionId);

    });

});

const beginExploringBtn = document.querySelector(".primary-btn");
const tradeRoutesBtn = document.querySelector(".secondary-btn");

if (beginExploringBtn) {

    beginExploringBtn.addEventListener("click", () => {
        showSection("countries");
    });

}

if (tradeRoutesBtn) {

    tradeRoutesBtn.addEventListener("click", () => {
        showSection("routes");
    });

}

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

            }

        });

    },

    {
        threshold: 0.15
    }

);

document.querySelectorAll(
    ".country-card, .industry-card, .concept-card, .stat-card, .route-item, .about-card"
).forEach(card => {

    card.classList.add("reveal");

    observer.observe(card);

});

window.addEventListener("DOMContentLoaded", () => {

    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {

        showSection(hash);

    } else {

        showSection("home");

    }

});

window.addEventListener("keydown", e => {

    const sectionOrder = [
        "home",
        "countries",
        "industries",
        "routes",
        "economics",
        "about"
    ];

    const currentSection =
        document.querySelector(".tab-section.active")?.id || "home";

    const currentIndex =
        sectionOrder.indexOf(currentSection);

    if (e.key === "ArrowRight") {

        const nextIndex =
            (currentIndex + 1) % sectionOrder.length;

        showSection(sectionOrder[nextIndex]);

    }

    if (e.key === "ArrowLeft") {

        const prevIndex =
            (currentIndex - 1 + sectionOrder.length) %
            sectionOrder.length;

        showSection(sectionOrder[prevIndex]);

    }

});
