const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
//відправляє подію 'new-user' на сервер WebSocket із іменем користувача, яке введено. Це повідомляє 
//серверу, що новий користувач приєднався.
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
//записали в змінну message значення введене в інпуті
  const message = messageInput.value
  appendMessage(`You: ${message}`)
//відправили
  socket.emit('send-chat-message', message)
//очистили інпут
  messageInput.value = ''
})
//функція створює новий елемент div, додає до нього текст повідомлення і додає цей елемент до контейнера повідомлень 
//на сторінці, щоб відобразити повідомлення користувачам.
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}