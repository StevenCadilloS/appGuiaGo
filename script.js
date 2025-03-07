// script.js
// Manejar el envío del formulario de búsqueda
document.querySelector('.search-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que el formulario se envíe

  // Obtener los valores del formulario
  const destination = document.getElementById('destination').value;
  const date = document.getElementById('date').value;
  const type = document.getElementById('type').value;

  // Validar los campos
  if (!destination || !date || !type) {
      alert('Por favor, completa todos los campos.');
      return;
  }

  // Simular una búsqueda (puedes reemplazar esto con una llamada a una API)
  alert(`Buscando guías en ${destination} para el ${date} (${type})`);

  // Aquí podrías redirigir a otra página o mostrar resultados dinámicos
});