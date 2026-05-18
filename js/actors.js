const actorsWrapper = document.querySelector(".actors_wrapper")
const pagination = document.querySelector('.movies_pagination')
const paginationNumbers = document.querySelectorAll(".movies_pagination-item")

const actorCards = document.querySelector(".wrapper-cards")
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal_close");
const modalBtn = document.querySelector(".modal_btn");
const recent = document.querySelector(".recent");
const recentWrapper = document.querySelector(".recent_wrapper");

function close_modal() {
    modal.style.display = "none"
}

modalClose.addEventListener('click', function () {
    close_modal()
})

modalBtn.addEventListener('click', function () {
    close_modal()
})

let page = 1
let data = []


let history = localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : []

function draw_recent() {
    if (history.length == 0) {
        recent.style.display = "none"
    }
    else {
        history.forEach(actor_id => {
            draw_card(data[actor_id], recentWrapper)
        })
    }
}


function draw_modal(actor) {
    document.querySelector(".modal_img").src = "http://185.72.144.247:7757" + actor.image_URL
    document.querySelector(".modal_fio").innerHTML = `${actor.name}
    <br>${actor.surname}`
    document.querySelector(".modal_age").textContent = `Бозпаст: ${actor.age}`

    const filmsElem = document.querySelector(".modal_films-list")
    const filmsData = actor.films

    filmsElem.innerHTML = ""

    filmsData.forEach(film => {
        filmsElem.innerHTML += `<li class="modal_films-item">${film.title}</li>`

    })

    document.querySelector(".modal_bio-text").textContent = actor.Biography
}

async function get_actor(id) {
    try {
        const res = await fetch(`http://185.72.144.247:7757/actors/${id}`)

        if (!res.ok) {
            throw new Error("Ошибка! " + res.status)
        }

        const actor = await res.json()


        if (history.length <= 3) {
            history.unshift(+id)
        }
        else {
            history.pop()
            history.unshift(+id)
        }


        localStorage.setItem("history", JSON.stringify(history))

        draw_modal(actor)
        modal.style.display = "block"

    } catch (err) {
        console.error(err)
    }
}

recentWrapper.addEventListener('click', function (event) {
    const card = event.target.closest(".actor_card")

    if (card) {
        const id = (card.getAttribute("data-id"))
        get_actor(id)
    }
})

actorCards.addEventListener('click', function (event) {
    const card = event.target.closest(".actor_card")

    if (card) {
        const id = (card.getAttribute("data-id"))
        get_actor(id)
    }
})

function drow_page(page, cards_per_page = 15) {
    start = cards_per_page * page - cards_per_page
    end = start + cards_per_page

    if (end > data.length) end = data.length

    for (let i = start; i < end; i++) {
        draw_card(data[i], actorsWrapper)
    }
}

pagination.addEventListener('click', function (event) {
    if (event.target.classList.contains("item--prev")) {
        if (page != 1) {
            page--
            actorsWrapper.innerHTML = ""
            drow_page(page)

            paginationNumbers.forEach(item => {
                if (item.textContent == page) {
                    item.classList.add("item--active")
                }
                else {
                    item.classList.remove("item--active")
                }
            });
        }
    }
    else if (event.target.classList.contains("item--next")) {
        if (page != 6) {
            page++
            actorsWrapper.innerHTML = ""
            drow_page(page)

            paginationNumbers.forEach(item => {
                if (item.textContent == page) {
                    item.classList.add("item--active")
                }
                else {
                    item.classList.remove("item--active")
                }
            });
        }
    }
    else if (event.target.classList.contains("movies_pagination-item") && !event.target.classList.contains("item--active")) {
        actorsWrapper.innerHTML = ""
        drow_page(+event.target.textContent)
        page = +event.target.textContent

        paginationNumbers.forEach(item => {
            item.classList.remove("item--active")
        });
        event.target.classList.add("item--active");
    }
})

function draw_card(actor, element) {
    element.innerHTML += `
        <div class="actors_card actor_card" data-id = ${actor.id}>
            <img class="actors_card-img" src="http://185.72.144.247:7757/${actor.image_URL}" alt="card-img">
            <h3 class="actors_card-name">${actor.name}  ${actor.surname}</h3>
        </div>
    `
}

async function show_all_actors() {
    try {
        const res = await fetch("http://185.72.144.247:7757/actors")

        if (!res.ok) {
            throw new Error("Ошибка! " + res.status)
        }

        data = await res.json()
        drow_page[1]
        draw_recent()
    }
    catch (err) {
        console.error(err)
    }
}

window.addEventListener('load', function () {
    show_all_actors()

})