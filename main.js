//Amaliyot
let total
let pagination = { // pagiantion default holatdagi qiymatlari
    page: 1,
    per_page:3,
}

getUsers()
async function getUsers() { // ushbu funksiya API ga so'rov yuboradi va undan data qabul qiladi
    let usersData = await fetch(`https://reqres.in/api/users?page=${pagination.page}&per_page=${pagination.per_page}`)// fetch metodi yordamida API ga request yuborish
    let newJson = await usersData.json() //kelgan datani JSON formatga o'tkazish

    let users = newJson.data // users o'zgaruvchisiga newJson obyektini data qiymatini o'zlashtiryapti
    total = newJson.total;
    funcPagination(newJson.total_pages, pagination) //funksiyaga newJson obyektini total_pages'i va paginationni yuboryapmiz
    // console.log(users);
    render(users) //render funksiyaga usersni yuboryapmiz
}
// <li class="page-item active" aria-current="page">
//                 <span class="page-link">1</span>
//               </li>
//               <li class="page-item"><a class="page-link" href="#">2</a></li>
//               <li class="page-item"><a class="page-link" href="#">3</a></li>

function funcPagination(counter,paginationNumber){// funksiya yuborilgan qiymatlarni counter va paginationNumber sifatida kutib olyapti.Ushbu funksiya pagination yasash uchun ishlatiladi
    let pagination = document.querySelector(".pagination")
    pagination.innerHTML = ''
    for(i=1; i<=counter; i++){
        let li = document.createElement("li")
        li.classList.add("page-item",'my-5')
        if(i == paginationNumber.page){
            li.classList.add("active")
        }
        li.setAttribute('aria-current','page')
        li.setAttribute("onclick",`paginationClickFunc(${i})`)

        let span = document.createElement("span")
        span.classList.add("page-link")
        span.innerText = i

        li.append(span)
        pagination.append(li)
    }
}

function paginationClickFunc(num){
    pagination.page = num
    getUsers()
}
function selectPerPagesValue() {
    let perpage = document.querySelector(".perpage").value 
    pagination.per_page = perpage
    let page_count = Math.ceil(total/perpage) // Umumiy data'ni perpage'ga bo'lib ceil qilsak pagination'ni sonini aniqlab olsak bo'ladi
    // console.log(total, page_count);
    if(page_count < pagination.page){ 
        pagination.page = page_count
    }
    getUsers()
}
async function selectCurentUser(num) {
    let currentUser = await fetch(`https://reqres.in/api/users/${num}`)
    let newUser = await currentUser.json()

    let user = newUser.data
    let modalBody = document.querySelector(".modal-body")
    let image = document.createElement("img")
    image.src = user.avatar
    image.alt = user.first_name

    let first_name = document.createElement("p")
    first_name.innerText = `First name:  ${user.first_name}`

    let last_name = document.createElement("p")
    last_name.innerText = `Last name:  ${user.last_name}`

    let email = document.createElement("p")
    email.innerText = `Email:  ${user.email}`
    modalBody.innerHTML = ''
    modalBody.append(image,first_name,last_name,email)

}


function render(arr) {// ma'lumotlarni ekranda card sifatida chiqarish uchun tuzildi
    let row = document.querySelector(".forUsers")
    row.innerHTML = ''
    arr.map((item) =>{
        let col4 = document.createElement("div")
        col4.classList.add("col-4","mt-5")

        let card = document.createElement("div")
        card.classList.add("card","py-5")
        card.setAttribute("onclick", `selectCurentUser(${item.id})`)
        card.setAttribute("data-bs-toggle","modal")
        card.setAttribute("data-bs-target","#exampleModal")

        let forFlex = document.createElement("div")
        forFlex.classList.add("d-flex","justify-content-between")
        
        let forImage = document.createElement("div")
    
        let image = document.createElement("img")
        image.src = item.avatar

        let forDatas = document.createElement("div")

        let first_name = document.createElement("p")
        first_name.innerText = item.first_name

        let last_name = document.createElement("p")
        last_name.innerText = item.last_name

        let email = document.createElement("p")
        email.innerText = item.email

        forImage.append(image)
        forDatas.append(first_name,last_name,email)

        forFlex.append(forImage,forDatas)
        card.append(forFlex)
        col4.append(card)
        row.append(col4)
    })
}