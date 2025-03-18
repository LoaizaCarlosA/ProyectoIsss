<template>
    <div>
      <!-- Contenedor para la tabla Handsontable -->
      <div id="example1"></div>
    </div>
  </template>
  
  <script>
  // Importar Handsontable
  import Handsontable from 'handsontable';
  import 'handsontable/dist/handsontable.full.css';
  
  export default {
    data() {
      return {
        data: [], // Aquí se almacenarán los datos que traemos del backend
      };
    },
    mounted() {
      // Hacemos la llamada fetch para obtener los datos del backend
      fetch('http://localhost:5000/api/excel-data')  // Asegúrate de que la URL sea correcta
        .then(response => response.json())  // Convertimos la respuesta a JSON
        .then(data => {
          this.data = data;  // Asignamos los datos obtenidos a la variable 'data'
  
          // Crear la tabla con Handsontable usando los datos que obtuvimos
          const container = document.querySelector('#example1');
          const hot = new Handsontable(container, {
            data: this.data,  // Usamos los datos obtenidos del backend
            colHeaders: Object.keys(this.data[0]),  // Usamos las claves del primer objeto como encabezados
            rowHeaders: true,
            filters: true,
            dropdownMenu: true,
            contextMenu: true,
            afterChange: (changes, source) => {
              if (source === 'loadData') return;  // Evitar guardar cuando solo se carga la tabla
              const updatedData = hot.getData();  // Obtener los datos modificados
  
              // Enviar los datos modificados al backend
              fetch('http://localhost:5000/api/save-excel-data', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ updatedData }),  // Enviar datos modificados
              }).then(response => {
                if (response.ok) {
                  console.log('Datos guardados correctamente');
                } else {
                  console.log('Error al guardar los datos');
                }
              });
            },
          });
        })
        .catch(error => console.error('Error:', error));  // Manejo de errores
    },
  };
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos si necesitas personalizar la tabla */
  </style>
  