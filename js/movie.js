const similarCards = document.querySelector(".similar_cards")
let year = 0
let id = -1

function draw_card(film) {
    similarCards.innerHTML += `
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

async function get_similar() {
    try {
        const res = await fetch(`http://185.72.144.247:7757/films`)

        if (!res.ok) {
            throw new Error("Ошибка! " + res.status)
        }

        const data = await res.json()
        const dataFiltered = data.filter(film => film.year == year && film.id != id)
        for (let i = 0; i < 4; i++) {
            draw_card(dataFiltered[i])
        }

    } catch (err) {
        console.error(err)
    }
}



function draw_film(film) {
    document.querySelector(".film_title").textContent = film.title

    document.querySelector(".film_img").src = `http://185.72.144.247:7757${film.poster_URL}`

    document.querySelector(".film_img").src = `http://185.72.144.247:7757${film.poster_URL}`

    document.querySelector(".film_desc").textContent = film.desc

    for (let i = 0; i < film.genres.length - 1; i++) {
        document.querySelector(".film_ganres").textContent += film.genres[i].name + " / "
    }

    document.querySelector(".film_ganres").textContent += film.genres[film.genres.length - 1].name

    document.querySelector(".film_data-number.year").textContent = film.year
    year = film.year
    document.querySelector(".film_data-number.age").textContent = film.age_rating + "+"
    document.querySelector(".film_data-number.rating").textContent = film.rating
    document.querySelector(".film_data-number.timing").textContent = film.duration + " мин"

    const stars = document.querySelectorAll(".film_rating svg")
    const ratingFloor = Math.floor(film.rating)
    const ratingPercent = Math.trunc((film.rating - ratingFloor) * 100) + 1

    for (let i = 0; i < ratingFloor; i++) {
        stars[i].style.fill = "#8502FF"
    }

    const gradient = `
        <linearGradient id = 'starGradient'>
            <stop offset = '${ratingPercent}%' stop-color =
            '#8502FF' />
            <stop offset = '${ratingPercent}%' stop-color =
            'transparent'/>
        </linearGradient>
    `
    stars[ratingFloor].innerHTML += gradient
    stars[ratingFloor].style.fill = "url('#starGradient')"



    for (let i = 0; i < film.actors.length; i++) {
        document.querySelector(".film_actors-list").innerHTML += `   
        <li class="film_actors-item">${film.actors[i].name} 
        ${film.actors[i].surname}</li>
    `
    }
    get_similar()
}

async function get_film(id) {
    try {
        const res = await fetch(`http://185.72.144.247:7757/films/${id}`)

        if (!res.ok) {
            throw new Error("Ошибка! " + res.status)
        }

        const data = await res.json()
        draw_film(data)

    } catch (err) {
        console.error(err)
    }
}

window.addEventListener('load', function () {

    const params = new URLSearchParams(window.location.search)
    id = params.get("id")
    get_film(id)
})

window.addEventListener('scroll', function () {
    const similar = document.querySelector(".similar")
    const position = similar.getBoundingClientRect()

    if (position.bottom >= 10) {
        get_similar()
    }
}, { once: true });