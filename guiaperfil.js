document.addEventListener('DOMContentLoaded', function() {
    // Elementos del chat
    const chatGuiaContainer = document.getElementById('chat-guia-container');
    const chatGuiaMessages = document.getElementById('chat-guia-messages');
    const chatGuiaInput = document.getElementById('chat-guia-input-text');
    const chatGuiaSendButton = document.getElementById('chat-guia-send-button');
    const cerrarChatGuia = document.getElementById('cerrar-chat-guia');
    const abrirChatGuia = document.getElementById('abrir-chat-guia');
    const mainContent = document.querySelector('body');

    // Elementos de detalles y pago
    const detalleRuta = document.getElementById('detalleRuta');
    const detallesTour = document.getElementById('detalles-tour');
    const seleccionPago = document.getElementById('seleccion-pago');
    const formulariosPago = document.getElementById('formularios-pago');
    const pasarelaPago = document.getElementById('pasarelaPago');

    // Chat functions
    abrirChatGuia.addEventListener('click', function() {
        chatGuiaContainer.style.display = 'flex';
        chatGuiaMessages.innerHTML = `<div>Chat con GuiaBot</div>`;
        mainContent.style.marginRight = '320px';
    });

    cerrarChatGuia.addEventListener('click', function() {
        chatGuiaContainer.style.display = 'none';
        mainContent.style.marginRight = '0';
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

    // Funciones globales para llamadas desde HTML
    window.mostrarDetalles = function(titulo, idioma, salida, horaFin, precio, cupos, descripcion, imagen, itinerario, puntoEncuentro) {
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
        detalleRuta.style.display = 'flex'; // Asegurar que la ventana modal se muestre
        detallesTour.style.display = 'block'; // Mostrar detalles del tour al abrir
        seleccionPago.style.display = 'none';
        formulariosPago.style.display = 'none';
    };

    window.cerrarDetalles = function() {
        detalleRuta.style.display = 'none';
    };

    // Event delegation para botones dinámicos
    document.addEventListener('click', function(e) {
        // Botón "Adquirir viaje"
        if (e.target.classList.contains('comprar-btn-detalle')) {
            e.preventDefault();
            detallesTour.style.display = 'none'; // Ocultar detalles del tour
            seleccionPago.style.display = 'block'; // Mostrar selección de pago
            formulariosPago.style.display = 'none'; // Asegurar que los formularios estén ocultos
        }

        // Botón "Volver a detalles"
        if (e.target.classList.contains('volver-btn')) {
            seleccionPago.style.display = 'none';
            detallesTour.style.display = 'block';
            formulariosPago.style.display = 'none';
        }

        // Botones de métodos de pago
        if (e.target.classList.contains('pago-btn') || e.target.closest('.pago-btn')) {
            e.preventDefault();
            const metodo = e.target.getAttribute('data-metodo') ||
                          e.target.closest('.pago-btn').getAttribute('data-metodo');
            seleccionPago.style.display = 'none';
            formulariosPago.style.display = 'block';

            // Oculta todos los formularios primero
            document.querySelectorAll('.formulario-pago').forEach(form => {
                form.style.display = 'none';
            });

            // Muestra el formulario seleccionado
            document.getElementById(`formulario-${metodo}`).style.display = 'block';

            // Inicializa PayPal si es necesario
            if (metodo === 'paypal') {
                initPayPalButton();
            }
        }

        // Botón "Cambiar método"
        if (e.target.classList.contains('volver-metodos-btn')) {
            formulariosPago.style.display = 'none';
            seleccionPago.style.display = 'block';
            detallesTour.style.display = 'none'; // Ocultar detalles al volver a selección
        }
    });

    // Manejo del formulario de tarjeta BCP
    document.getElementById('formulario-tarjeta')?.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pago procesado con éxito!');
        detalleRuta.style.display = 'none';
    });
});

// Función para inicializar PayPal (ejemplo básico)
function initPayPalButton() {
    if (typeof paypal === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID&currency=USD';
        script.onload = function() {
            renderPayPalButton();
        };
        document.body.appendChild(script);
    } else {
        renderPayPalButton();
    }
}

function renderPayPalButton() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: document.getElementById('precioRuta').innerText.replace('$', '')
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Pago completado por ' + details.payer.name.given_name);
                cerrarDetalles();
            });
        }
    }).render('#paypal-button-container');
}