fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector(".header-placeholder").outerHTML = data

        const burger = document.querySelector(".header_menu-burger")
        const menuList = document.querySelector(".header_menu-list")

        burger.addEventListener('click', function () {
            menuList.classList.toggle("menu-list--active")
        })
    })

fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector(".footer-placeholder").outerHTML = data
    })

fetch("subscribe.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector(".subscribe-placeholder").outerHTML = data

        const name = document.querySelector('#name');
        const email = document.querySelector('#email');
        const btn = document.querySelector(".subscribe_form-btn");

        btn.addEventListener('click', function (event) {
            event.preventDefault()

            if (!name.value.trim()) {
                name.style.border = '1px solid #e10f00'
                return
            }
            name.style.border = '1px solid #131313'

            if (!email.value.trim()) {
                email.style.border = '1px solid #e10f00'
                return
            }
            email.style.border = '1px solid #131313'

            alert(`Вы подписались на рассылку! Ваше имя: ${name.value}, ваша почта ${email.value}`)
            name.value = ""
            email.value = ""
        })
    })

window.addEventListener('load', function () {
})