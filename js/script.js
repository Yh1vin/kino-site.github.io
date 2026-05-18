// const burger = document.querySelector(".header_menu-burger");
// const menuList = document.querySelector(".header_menu-list");
let data = []
const moviesCards = document.querySelector(".movies_cards")


const numbers = document.querySelectorAll(".movies_pagination-item")
const pagination = document.querySelector(".movies_pagination")

pagination.addEventListener('click', function (event) {
    if (event.target.classList.contains("movies_pagination-item")) {

        let start = 0
        let end = 0

        if (event.target.textContent == "1") {
            start = 0
            end = 20
        }

        if (event.target.textContent == "2") {
            start = 20
            end = 40
        }

        if (event.target.textContent == "3") {
            start = 40
            end = 60
        }

        if (event.target.textContent == "4") {
            start = 60
            end = 80
        }

        if (event.target.textContent == "5") {
            start = 80
            end = 100
        }

        if (!event.target.classList.contains("item--active")) {
            moviesCards.innerHTML = ""
            for (let i = start; i < end; i++) {
                draw_card(data[i])
            }
            numbers.forEach(n => {
                n.classList.remove("item--active")
            })
            event.target.classList.add("item--active")
        }
    }
})



// burger.addEventListener('click', function () {
//     menuList.classList.toggle("menu-list--active");
// })

function draw_card(film) {
    moviesCards.innerHTML += `
        <div class="movies_card">
            <img class="movies_card-img" src="http://185.72.144.247:7757${film.poster_URL}" alt="card-img">
            <h3 class="movies_card-title">${film.title}</h3>
            <div class="movies_card-wrapper">
                <p class="movies_card-data">${film.year} год</p>
                <p class="movies_card-data">Рейтинг: ${film.rating}</p>
            </div>
            <a class="movies_card-link" href="movie.html?id=${film.id} ">Смотреть</a>
        </div>
    `
}

async function get_films() {
    try {
        const res = await fetch("http://185.72.144.247:7757/films")

        if (!res.ok) {
            throw new Error("Ошибка! " + res.status)
        }

        data = await res.json()
        console.log(data)

        for (let i = 0; i < 20; i++) {
            draw_card(data[i])
        }
    }
    catch (err) {
        console.error(err)
    }
}

window.addEventListener("load", function () {
    get_films()
})