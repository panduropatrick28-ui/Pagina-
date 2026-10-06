let carrito = [];

document.addEventListener('DOMContentLoaded', function() {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
        carrito = JSON.parse(guardado);
        dibujarCarrito();
    }

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            e.preventDefault();
            agregarProducto(e.target);
        }

        if (e.target.id === 'vaciar-carrito') {
            e.preventDefault();
            carrito = [];
            localStorage.removeItem('carrito');
            dibujarCarrito();
        }
    });
});

function agregarProducto(boton) {
    const tarjeta = boton.closest('.box');
    if (!tarjeta) return;

    const producto = {
        id: boton.getAttribute('data-id'),
        nombre: tarjeta.querySelector('h3').textContent,
        precio: tarjeta.querySelector('.precio').textContent,
        imagen: tarjeta.querySelector('img').src,
        cantidad: 1
    };

    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    dibujarCarrito();
}

function dibujarCarrito() {
    const cuerpo = document.querySelector('#lista-carrito tbody');
    if (!cuerpo) return;
    
    cuerpo.innerHTML = '';
    carrito.forEach(item => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${item.imagen}" width="50" height="50" style="object-fit:contain;"></td>
            <td>${item.nombre}</td>
            <td>${item.precio}</td>
            <td>${item.cantidad}</td>
        `;
        cuerpo.appendChild(fila);
    });
}