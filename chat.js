const abrirChat = document.getElementById('abrir-chat');
const modalChat = document.getElementById('modal-chat');
const cerrarModal = document.getElementsByClassName('cerrar-modal')[0];
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input-text');
const chatSendButton = document.getElementById('chat-send-button');

// Abrir el modal
abrirChat.onclick = function() {
    console.log('HOla');
    modalChat.style.display = 'block';
};

// Cerrar el modal
cerrarModal.onclick = function() {
    modalChat.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == modalChat) {
        modalChat.style.display = 'none';
    }
};

// Manejar el chat
chatSendButton.addEventListener('click', function() {
    const message = chatInput.value;
    if (message.trim() === '') return;

    displayMessage('usuario', message);

    setTimeout(function() {
        displayMessage('agente', '¡Gracias por tu mensaje! Te responderemos pronto.');
    }, 1000);

    chatInput.value = '';
});

function displayMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${sender}: ${text}`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}