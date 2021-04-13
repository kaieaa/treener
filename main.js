var createBtn = document.getElementById("createBtn").addEventListener("click", userLogin);
var con = 0;
var div = document.getElementById("userSaved");

async function fetchAsync() {
    let response = await fetch('/API/controllers/usersController.js');
    let post = await response.json();

    return post;
}

function loadPost(){
    fetchAsync()
    .then((post)=>{
        for (let index = 0; index < 1; index++) {
            div.innerHTML+=
                `<div class="bg-dark text-white border border-white card col-3 m-1 mx-auto">
                <div class="card-body">
                    <h5 class="card-title">ID: ${post[con].id}</h5>
                    <p class="card-text">${post[con].title}</p>
                </div>
            </div>`
        }
    })
}