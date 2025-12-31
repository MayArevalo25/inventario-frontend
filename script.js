const API_URL = 'http://localhost:3000/api/productos';

cargarProductos();

// LISTAR
async function cargarProductos() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const tabla = document.getElementById('tablaProductos');
  tabla.innerHTML = '';

  data.forEach(p => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.descripcion}</td>
      <td>${p.categoria}</td>
      <td>${p.precio}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn btn-warning btn-sm">Editar</button>
        <button class="btn btn-danger btn-sm">Eliminar</button>
      </td>
    `;

    // EDITAR
    tr.children[5].children[0].onclick = () => {
      document.getElementById('productoId').value = p.id;
      document.getElementById('nombre').value = p.nombre;
      document.getElementById('descripcion').value = p.descripcion;
      document.getElementById('categoria').value = p.categoria;
      document.getElementById('precio').value = p.precio;
      document.getElementById('stock').value = p.stock;
    };

    // ELIMINAR
    tr.children[5].children[1].onclick = async () => {
      if (!confirm('¿Seguro de eliminar?')) return;
      await fetch(`${API_URL}/${p.id}`, { method: 'DELETE' });
      cargarProductos();
    };

    tabla.appendChild(tr);
  });
}

// GUARDAR / EDITAR
async function guardarProducto() {
  console.log('BOTÓN GUARDAR PRESIONADO');

  const id = document.getElementById('productoId').value;

  const producto = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    categoria: document.getElementById('categoria').value,
    precio: document.getElementById('precio').value,
    stock: document.getElementById('stock').value
  };

  if (!producto.nombre) {
    alert('Nombre obligatorio');
    return;
  }

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
  }

  limpiar();
  cargarProductos();
}

function limpiar() {
  document.getElementById('productoId').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('categoria').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('stock').value = '';
}
