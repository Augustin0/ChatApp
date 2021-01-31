let usersBox = $("#divUsuarios");
let formSend = $("#formSend");
let messageBox = $("#messageBox")
var divChatbox = document.getElementById("divChatbox");


//RENDER VIEW HTML
function renderizarUsuarios(users) {
    let html = ``;
    html += `     <li>  `
    html += `     <a href="javascript:void(0)" class="active"> Chat de <span>${params.get("sala")}</span></a>  ;`
    html += `     </li>  `
    users.forEach((user, i) => {
        html += `<li> `;
        html += `<a data-id="${user.id}" href="javascript:void(0)"><img src="assets/images/users/${i+1}.jpg" alt="user-img" class="img-circle"> <span>${user.nombre}<small class="text-success">online</small></span></a> `;
        html += `</li> `
    });

    usersBox.html(html)
};

function renderMessages(messageFormated, style) {
    let html = ``;

    if (style === "newMessage") {
        html += `<li class="animated fadeIn">`
        html += `<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div> `
        html += `<div class="chat-content">`
        html += `     <h5>${messageFormated.emisor}</h5> `
        html += `   <div class="box bg-light-inverse">${messageFormated.message}</div>`
        html += `</div> `
        html += `<div class="chat-time">${messageFormated.fecha}</div> `
        html += `</li>`
    } else if (style == "yo") {
        html += `<li class="animated fadeIn reverse">`
        html += `<div class="chat-content">`
        html += `     <h5>${messageFormated.emisor}</h5>`
        html += `   <div class="box bg-light-info">${messageFormated.message}</div>`
        html += `</div> `
        html += `<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div> `
        html += `<div class="chat-time">${messageFormated.fecha}</div> `
        html += `</li>`
    } else if (style === "Admin") {
        html += `<li class="animated fadeIn reverse">`
        html += `<div class="chat-content">`
        html += `     <h5>El administrador</h5>`
        html += `   <div class="box bg-light-danger">${messageFormated.message}</div>`
        html += `</div> `
        html += `<div class="chat-time">${messageFormated.fecha}</div> `
        html += `</li>`
    }
    scrollBottom()

    divChatbox.innerHTML += html


}






//LISTENERS

usersBox.on("click", "a", function() {

    let id = $(this).data("id")
    if (id)
        alert(id)

});
formSend.on("submit", function(e) {
    e.preventDefault();
    if (messageBox.val().trim() === "") {
        return
    }

    socket.emit("message", messageBox.val(), (formatMessage) => {
        renderMessages(formatMessage, "yo")
        messageBox.val('').focus()


    })


})



function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}