const header = document.querySelector("header");

const articlesSlider = document.querySelector(".articles-slider");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

document.addEventListener("scroll", ()=> {
    window.scrollY !== 0 ? header.classList.add("reduced") : header.classList.remove("reduced");
})

window.addEventListener("load", ()=> {
    const dateElem = document.querySelector(".welcome .date");

    const daysNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentTime = new Date();

    const dayOfTheWeek = currentTime.getDay();
    const dayOfTheMonth = currentTime.getDate();
    const month = currentTime.getMonth();

    dateElem.innerText = `${daysNames[dayOfTheWeek]}, ${dayOfTheMonth} ${months[month]}`;
})

function scrollSlider(elem, value) {
    const scrollLeft = elem.scrollLeft;
    elem.scroll(scrollLeft + value, 0);
}

function addElem(container, site) {
    const firstElem = document.querySelector(".articles-slider > .container:first-child");
    const lastElem = document.querySelector(".articles-slider > .container:last-child");
    if (site === "right") {
        container.appendChild(firstElem.cloneNode(true));
        container.removeChild(container.firstElementChild);
    }
    if (site === "left") {
        container.prepend(lastElem.cloneNode(true));
        container.removeChild(container.lastElementChild);
    }
} 

let autoScroll;
autoScroll = setInterval(() => {
    addElem(articlesSlider, "right");
    scrollSlider(articlesSlider, 1000);
}, 5000);

function restartScroll() {
    stopScroll();
    autoScroll = setInterval(() => {
        addElem(articlesSlider, "right");
        scrollSlider(articlesSlider, 1000);
    }, 5000);
}

nextButton.addEventListener("click", ()=> {
    addElem(articlesSlider, "right");
    scrollSlider(articlesSlider, 1000);
    restartScroll();
})
prevButton.addEventListener("click", ()=> {
    addElem(articlesSlider, "left");
    scrollSlider(articlesSlider, -1000);
    restartScroll();
})

function stopScroll() {
    clearInterval(autoScroll);
}

