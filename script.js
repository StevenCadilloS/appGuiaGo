const ciudadesPorDepartamento = {
  cusco: ['Cusco', 'Urubamba', 'Machu Picchu'],
  arequipa: ['Arequipa', 'Caylloma', 'Camaná'],
  loreto: ['Iquitos', 'Yurimaguas', 'Nauta'],
  ancash: ['Huaraz', 'Chimbote', 'Caraz'],
  piura: ['Piura', 'Talara', 'Sullana'],
  lambayeque: ['Chiclayo', 'Lambayeque', 'Ferreñafe']
};

const departamentoSelect = document.getElementById('departamento');
const ciudadSelect = document.getElementById('ciudad');
const tipoTurismoSelect = document.getElementById('tipo-turismo');
const fechaInput = document.getElementById('disponibilidad-fecha');
const horaSelect = document.getElementById('disponibilidad-hora');
const idiomasCheckboxes = document.querySelectorAll('input[name="idiomas"]');
const listaGuias = document.querySelector('.lista-guias');
const botonesPerfil = document.querySelectorAll('.ver-perfil');
const modalPerfil = document.getElementById('modal-perfil');
const contenidoPerfil = document.getElementById('contenido-perfil');
const botonCerrar = document.querySelector('.cerrar');

departamentoSelect.addEventListener('change', () => {
  const departamentoSeleccionado = departamentoSelect.value;
  ciudadSelect.innerHTML = '<option value="">Todas</option>';

  if (departamentoSeleccionado && ciudadesPorDepartamento[departamentoSeleccionado]) {
      ciudadesPorDepartamento[departamentoSeleccionado].forEach(ciudad => {
          const opcion = document.createElement('option');
          opcion.value = ciudad;
          opcion.textContent = ciudad;
          ciudadSelect.appendChild(opcion);
      });
  }
});


const chatGuiaContainer = document.getElementById('chat-guia-container');
const chatGuiaMessages = document.getElementById('chat-guia-messages');
const chatGuiaInput = document.getElementById('chat-guia-input-text');
const chatGuiaSendButton = document.getElementById('chat-guia-send-button');
const cerrarChatGuia = document.getElementById('cerrar-chat-guia');

document.querySelectorAll('.abrir-chat-guia').forEach(button => {
    button.addEventListener('click', function() {
        chatGuiaContainer.style.display = 'flex';
        const guiaNombre = this.getAttribute('data-guia-nombre');
        chatGuiaMessages.innerHTML = `<div>Chat con ${guiaNombre}</div>`;
    });
});

cerrarChatGuia.addEventListener('click', function() {
    chatGuiaContainer.style.display = 'none';
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

