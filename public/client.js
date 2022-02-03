const socket = io()
let userName;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')



do {
    userName = prompt('Please enter your name')
} while (!userName);




textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})



function sendMessage(UserMsg) {
    let msg = {
        user: userName,
        message: UserMsg
    }
    // append message
    appendMessaage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    //send to server
    socket.emit('Send-Message-To-Server', msg)

}


// append messages
function appendMessaage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `<h4>${msg.user}</h4>
                  <p>${msg.message}</p>`
    mainDiv.innerHTML = markup

    // console.log(mainDiv)

    messageArea.appendChild(mainDiv)
}



// Recieve message
socket.on('Recieve-Message-From-Server', (msg) => {
    appendMessaage(msg, 'incoming')
})


//Scroll to the bottom when message recive/send
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}