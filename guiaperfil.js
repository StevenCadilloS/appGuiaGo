const chatGuiaContainer = document.getElementById('chat-guia-container');
const chatGuiaMessages = document.getElementById('chat-guia-messages');
const chatGuiaInput = document.getElementById('chat-guia-input-text');
const chatGuiaSendButton = document.getElementById('chat-guia-send-button');
const cerrarChatGuia = document.getElementById('cerrar-chat-guia');
const abrirChatGuia = document.getElementById('abrir-chat-guia');
/*const perfilGuiaSection = document.querySelector('.perfil-guia'); // Selecciona la sección principal del perfil
const rutasGuiaSection = document.querySelector('.rutas-guia'); // Selecciona la sección de rutas*/
const mainContent = document.querySelector('.main-content');

abrirChatGuia.addEventListener('click', function() {
    chatGuiaContainer.style.display = 'flex';
    chatGuiaMessages.innerHTML = `<div>Chat con Juan Pérez</div>`;
    mainContent.style.width = 'calc(100% - 320px)'; // Reducir el ancho del contenedor principal
});

cerrarChatGuia.addEventListener('click', function() {
    chatGuiaContainer.style.display = 'none';
    mainContent.style.width = '100%'; // Restaurar el ancho original
});

chatGuiaSendButton.addEventListener('click', function() {
    const message = chatGuiaInput.value;
    if (message.trim() === '') return;
    displayMessage('usuario', message);
    setTimeout(function() {
        displayMessage('guia', '¡Gracias por tu mensaje!');
    }, 1000);
    chatGuiaInput.value = '';
});

function displayMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${sender}: ${text}`;
    chatGuiaMessages.appendChild(messageDiv);
    chatGuiaMessages.scrollTop = chatGuiaMessages.scrollHeight;
}

function mostrarDetalles(titulo, idioma, salida, horaFin, precio, cupos, descripcion, imagen, itinerario, puntoEncuentro) {
    document.getElementById('tituloRuta').innerText = titulo;
    document.getElementById('idiomaRuta').innerText = idioma;
    document.getElementById('salidaRuta').innerText = salida;
    document.getElementById('horaFinRuta').innerText = horaFin;
    document.getElementById('precioRuta').innerText = precio;
    document.getElementById('cuposRuta').innerText = cupos;
    document.getElementById('descripcionRuta').innerText = descripcion;
    document.getElementById('itinerarioRuta').innerText = itinerario;
    document.getElementById('puntoEncuentroRuta').innerText = puntoEncuentro;
    document.getElementById('imagenRuta').src = imagen;
    document.getElementById('detalleRuta').style.display = 'flex';
}

function cerrarDetalles() {
    document.getElementById('detalleRuta').style.display = 'none';
}

function mostrarFormularioPago() {
    document.getElementById('formularioPago').style.display = 'block';
  }
  
  function procesarPago() {
    // Aquí puedes añadir la lógica para procesar el pago
    // Por ahora, solo mostraremos una alerta
    alert('Pago procesado con éxito');
    document.getElementById('formularioPago').style.display = 'none';
    cerrarDetalles();
}