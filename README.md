<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La Libertad Avanza - Buenos Aires</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .bg-purple-gradient { background: linear-gradient(135deg, #8B5CF6, #A855F7); }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center; }
        .modal.active { display: flex; }
        .user-panel { background: white; border-radius: 0.5rem; padding: 1.5rem; box-shadow: 0 4px 6px rgba(139, 92, 246, 0.1); }
        .close-btn { position: absolute; top: 1rem; right: 1rem; font-size: 1.5rem; cursor: pointer; z-index: 10; }
        .chat-box { height: 300px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9; }
        .chat-message { margin-bottom: 8px; padding: 8px; border-radius: 8px; max-width: 75%; }
        .chat-message.user { background-color: #8B5CF6; color: white; align-self: flex-end; margin-left: auto; }
        .chat-message.admin { background-color: #e5e7eb; color: black; align-self: flex-start; margin-right: auto; }
    </style>
</head>
<body class="bg-purple-light-gradient min-h-screen">

<header class="bg-purple-gradient shadow-lg no-print">
    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/La_Libertad_Avanza_full_logo.svg/800px-La_Libertad_Avanza_full_logo.svg.png" alt="Logo" class="h-12">
            <div>
                <h1 class="text-xl font-bold text-white">Elecciones La Libertad Avanza</h1>
                <p class="text-sm text-purple-100">Provincia de Buenos Aires</p>
            </div>
        </div>
        <nav class="flex space-x-4">
            <button onclick="showRegistro()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">Registrarse</button>
            <button onclick="showAdmin()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">Admin</button>
            <button onclick="logout()" id="logout-btn" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md hidden">Cerrar Sesion</button>
        </nav>
    </div>
</header>

<div id="main-content" class="max-w-7xl mx-auto p-8">
    <!-- Panel de usuario -->
    <div id="user-panel" class="user-panel hidden">
        <h2 class="text-2xl font-bold text-purple-800 mb-4 text-center">Mi Perfil</h2>
        <div class="flex items-center space-x-4 mb-4">
            <img id="user-profile-img" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Foto" class="w-16 h-16 rounded-full border-2 border-purple-300">
            <div>
                <h3 id="user-name" class="font-bold text-lg">Nombre Usuario</h3>
                <p id="user-location" class="text-sm text-gray-600">Seccion - Municipio</p>
            </div>
        </div>
        <div class="flex space-x-2">
            <button onclick="abrirCamara()" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md">?? Capturar Foto</button>
            <button onclick="enviarMensaje()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">?? Mensaje al Admin</button>
        </div>
    </div>

    <!-- Login rapido -->
    <div id="quick-login" class="bg-white border border-purple-200 rounded-lg p-6 shadow-sm">
        <h3 class="text-xl font-bold text-purple-800 mb-4 text-center">Acceso Rapido</h3>
        <input type="text" id="login-dni" placeholder="DNI" class="w-full mb-2 px-3 py-2 border rounded-md">
        <input type="password" id="login-password" placeholder="Contrasena" class="w-full mb-2 px-3 py-2 border rounded-md">
        <button onclick="quickLogin()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md">Ingresar</button>
    </div>
</div>

<!-- Modal Registro -->
<div id="registro-modal" class="modal items-center justify-center">
    <div class="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <span class="close-btn" onclick="closeModal('registro-modal')">?</span>
        <h2 class="text-2xl font-bold text-purple-800 mb-4">Registro de Usuario</h2>
        <form id="registro-form" class="space-y-4">
            <input type="text" name="nombre" placeholder="Nombre" required class="w-full px-3 py-2 border rounded-md">
            <input type="text" name="apellido" placeholder="Apellido" required class="w-full px-3 py-2 border rounded-md">
            <input type="text" name="dni" placeholder="DNI" required class="w-full px-3 py-2 border rounded-md">
            <input type="tel" name="celular" placeholder="Celular" required class="w-full px-3 py-2 border rounded-md">
            <input type="email" name="email" placeholder="Email" required class="w-full px-3 py-2 border rounded-md">
            <select name="seccionElectoral" required class="w-full px-3 py-2 border rounded-md">
                <option value="">Selecciona seccion</option>
                <option value="1">1a Seccion</option>
                <option value="2">2a Seccion</option>
                <option value="3">3a Seccion</option>
                <option value="4">4a Seccion</option>
                <option value="5">5a Seccion</option>
                <option value="6">6a Seccion</option>
                <option value="7">7a Seccion</option>
                <option value="8">8a Seccion</option>
            </select>
            <select name="municipio" required class="w-full px-3 py-2 border rounded-md">
                <option value="">Selecciona municipio</option>
            </select>
            <input type="text" name="escuela" placeholder="Escuela" required class="w-full px-3 py-2 border rounded-md">
            <input type="text" name="direccion" placeholder="Direccion" required class="w-full px-3 py-2 border rounded-md">
            <input type="password" name="password" placeholder="Contrasena" required class="w-full px-3 py-2 border rounded-md">
            <input type="password" name="confirm-password" placeholder="Confirmar Contrasena" required class="w-full px-3 py-2 border rounded-md">
            <button type="submit" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md">Registrarse</button>
        </form>
    </div>
</div>

<!-- Modal Admin -->
<div id="admin-modal" class="modal items-center justify-center">
    <div class="bg-white rounded-lg max-w-6xl w-full p-6 relative">
        <span class="close-btn" onclick="closeModal('admin-modal')">?</span>
        <h2 class="text-2xl font-bold text-purple-800 mb-4">Panel Administrativo</h2>
        <input type="password" id="admin-password" placeholder="Contrasena admin" class="w-full mb-4 px-3 py-2 border rounded-md">
        <button onclick="loginAdmin()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md">Ingresar</button>
        <div id="admin-panel" class="hidden mt-6">
            <div class="grid grid-cols-4 gap-4 mb-4">
                <div class="bg-white p-4 border rounded-md"><h3>Total Registros</h3><p id="total-registros">0</p></div>
                <div class="bg-white p-4 border rounded-md"><h3>Con Foto</h3><p id="con-foto">0</p></div>
                <div class="bg-white p-4 border rounded-md"><h3>Hoy</h3><p id="registros-hoy">0</p></div>
                <div class="bg-white p-4 border rounded-md"><h3>Mensajes</h3><p id="mensajes-count">0</p></div>
            </div>
            <button onclick="exportarPDF()" class="bg-green-600 text-white px-4 py-2 rounded-md mb-4">Exportar PDF</button>
            <div id="registros-list" class="space-y-2"></div>
            <h3 class="text-lg font-bold text-purple-800 mt-6">Mensajes de Usuarios</h3>
            <button onclick="imprimirMensajes()" class="bg-blue-600 text-white px-4 py-2 rounded-md mb-2">??? Imprimir Mensajes</button>
            <div id="mensajes-list" class="space-y-2"></div>
        </div>
    </div>
</div>

<!-- Modal Mensaje -->
<div id="mensaje-modal" class="modal items-center justify-center">
    <div class="bg-white rounded-lg max-w-md w-full p-6 relative">
        <span class="close-btn" onclick="closeModal('mensaje-modal')">?</span>
        <h3 class="text-lg font-bold mb-4">Enviar Mensaje al Administrador</h3>
        <textarea id="mensaje-texto" rows="4" placeholder="Escribe tu mensaje..." class="w-full border rounded-md p-2"></textarea>
        <div class="flex space-x-2 mt-4">
            <button onclick="enviarMensajeAdmin()" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md">Enviar</button>
            <button onclick="closeModal('mensaje-modal')" class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md">Cancelar</button>
        </div>
    </div>
</div>

<!-- Modal Camara -->
<div id="camara-modal" class="modal items-center justify-center">
    <div class="bg-white rounded-lg max-w-md w-full p-6 relative">
        <span class="close-btn" onclick="cerrarCamara()">?</span>
        <h3 class="text-lg font-bold mb-4">Tomar Foto</h3>
        <video id="camera-video" autoplay class="w-full mb-4 rounded"></video>
        <div class="flex space-x-2">
            <button onclick="capturarFoto()" class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md">Capturar</button>
            <button onclick="cerrarCamara()" class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md">Cancelar</button>
        </div>
    </div>
</div>

<!-- Modal Detalle Registro -->
<div id="detalle-modal" class="modal items-center justify-center">
    <div class="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <span class="close-btn" onclick="closeModal('detalle-modal')">?</span>
        <h2 class="text-2xl font-bold text-purple-800 mb-4">Detalle del Registro</h2>
        <div id="detalle-content"></div>
    </div>
</div>

<!-- Modal Foto -->
<div id="foto-modal" class="modal items-center justify-center">
    <div class="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <span class="close-btn" onclick="closeModal('foto-modal')">?</span>
        <h2 class="text-xl font-bold text-purple-800 mb-4">Foto de Usuario</h2>
        <img id="foto-img" src="" alt="Foto" class="max-w-full max-h-96 mb-4">
        <p id="foto-nombre" class="text-lg font-semibold"></p>
        <button onclick="descargarFoto()" class="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">Descargar Foto</button>
    </div>
</div>

<!-- Modal Chat -->
<div id="chat-modal" class="modal items-center justify-center">
    <div class="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <span class="close-btn" onclick="closeModal('chat-modal')">?</span>
        <h2 class="text-xl font-bold text-purple-800 mb-4">Chat con <span id="chat-user-name"></span></h2>
        <div id="chat-content" class="chat-box mb-4 flex flex-col"></div>
        <input type="text" id="chat-input" placeholder="Escribe tu mensaje..." class="w-full border rounded-md p-2" onkeypress="if(event.key === 'Enter') enviarChat()">
        <button onclick="enviarChat()" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md">Enviar</button>
    </div>
</div>

<footer class="bg-gray-800 text-white text-center py-4 mt-12">
    <p>&copy; 2024 Derecho de autor hecho por Roberto Lencina</p>
</footer>

<script>
const ADMIN_PASSWORD = 'David2025';
let currentUser = null;
let selectedUserChat = null;

// Inicializacion
document.addEventListener('DOMContentLoaded', () => {
    cargarMunicipios();
    cargarRegistrosAdmin();
    cargarMensajesAdmin();
    document.getElementById('registro-form').addEventListener('submit', registrarUsuario);
});

// Municipios
function cargarMunicipios() {
    const select = document.querySelector('[name="municipio"]');
    const municipios = [
        "Campana", "Escobar", "General Las Heras", "General Rodriguez", "General San Martin", "Hurlingham", "Ituzaingo", "Jose C. Paz", "Lujan", "Malvinas Argentinas", "Marcos Paz", "Mercedes", "Merlo", "Moreno", "Moron", "Navarro", "Pilar", "San Fernando", "San Isidro", "San Miguel", "Suipacha", "Tigre", "Tres de Febrero", "Vicente Lopez",
        "Arrecifes", "Baradero", "Capitan Sarmiento", "Carmen de Areco", "Colon", "Exaltacion de la Cruz", "Pergamino", "Ramallo", "Rojas", "Salto", "San Andres de Giles", "San Antonio de Areco", "San Nicolas", "San Pedro", "Zarate",
        "Almirante Brown", "Avellaneda", "Berazategui", "Berisso", "Brandsen", "Canuelas", "Ensenada", "Esteban Echeverria", "Ezeiza", "Florencio Varela", "La Matanza", "Lanus", "Lobos", "Lomas de Zamora", "Magdalena", "Presidente Peron", "Punta Indio", "Quilmes", "San Vicente",
        "Alberti", "Bragado", "Carlos Casares", "Carlos Tejedor", "Chacabuco", "Chivilcoy", "Florentino Ameghino", "General Arenales", "General Pinto", "General Viamonte", "General Villegas", "Hipolito Yrigoyen", "Junin", "Leandro N. Alem", "Lincoln", "Nueve de Julio", "Pehuajo", "Rivadavia", "Trenque Lauquen",
        "Ayacucho", "Balcarce", "Castelli", "Chascomus", "Dolores", "General Alvarado", "General Belgrano", "General Guido", "General Lavalle", "General Madariaga", "General Paz", "General Pueyrredon", "La Costa", "Las Flores", "Lezama", "Loberia", "Maipu", "Mar Chiquita", "Monte", "Necochea", "Pila", "Pinamar", "Rauch", "San Cayetano", "Tandil", "Tordillo", "Villa Gesell",
        "Adolfo Alsina", "Adolfo Gonzales Chaves", "Bahia Blanca", "Benito Juarez", "Coronel Dorrego", "Coronel Pringles", "Coronel Rosales", "Coronel Suarez", "Daireaux", "Guamini", "General Lamadrid", "Laprida", "Monte Hermoso", "Patagones", "Pellegrini", "Puan", "Saavedra", "Salliquelo", "Tornquist", "Tres Arroyos", "Tres Lomas", "Villarino",
        "Azul", "Bolivar", "General Alvear", "Olavarria", "Roque Perez", "Saladillo", "Tapalque", "Veinticinco de Mayo",
        "La Plata", "Isla Martin Garcia"
    ];
    select.innerHTML = '<option value="">Selecciona municipio</option>';
    municipios.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        select.appendChild(opt);
    });
}

// Modales
function showRegistro() { document.getElementById('registro-modal').classList.add('active'); }
function showAdmin() { document.getElementById('admin-modal').classList.add('active'); }
function closeModal(id) { 
    document.getElementById(id).classList.remove('active'); 
    if (window.streamActual) window.streamActual.getTracks().forEach(t => t.stop());
}

function loginAdmin() {
    const pass = document.getElementById('admin-password').value;
    if (pass === ADMIN_PASSWORD) {
        document.getElementById('admin-panel').style.display = 'block';
        cargarRegistrosAdmin();
        cargarMensajesAdmin();
    } else {
        alert('? Contrasena incorrecta');
    }
}

function quickLogin() {
    const dni = document.getElementById('login-dni').value;
    const pass = document.getElementById('login-password').value;
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const user = registros.find(r => r.dni === dni && r.password === pass);
    if (user) {
        currentUser = user;
        document.getElementById('user-name').textContent = `${user.nombre} ${user.apellido}`;
        document.getElementById('user-location').textContent = `${user.seccionElectoral}a Seccion - ${user.municipio}`;
        document.getElementById('user-profile-img').src = user.fotoUrl || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        document.getElementById('user-panel').classList.remove('hidden');
        document.getElementById('quick-login').classList.add('hidden');
        document.getElementById('logout-btn').classList.remove('hidden');
    } else {
        alert('? Usuario o contrasena incorrectos');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('user-panel').classList.add('hidden');
    document.getElementById('quick-login').classList.remove('hidden');
    document.getElementById('logout-btn').classList.add('hidden');
    closeModal('admin-modal');
}

function registrarUsuario(e) {
    e.preventDefault();
    const datos = new FormData(e.target);
    if (datos.get('password') !== datos.get('confirm-password')) {
        alert('? Las contrasenas no coinciden');
        return;
    }
    const registro = {
        id: 'user_' + Date.now(),
        nombre: datos.get('nombre'),
        apellido: datos.get('apellido'),
        dni: datos.get('dni'),
        email: datos.get('email'),
        celular: datos.get('celular'),
        municipio: datos.get('municipio'),
        seccionElectoral: datos.get('seccionElectoral'),
        escuela: datos.get('escuela'),
        direccion: datos.get('direccion'),
        password: datos.get('password'),
        fechaRegistro: new Date().toISOString(),
        fotoUrl: localStorage.getItem('userFoto') || null
    };
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    registros.push(registro);
    localStorage.setItem('registros', JSON.stringify(registros));
    alert('? Registro exitoso');
    closeModal('registro-modal');
    e.target.reset();
}

function abrirCamara() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        document.getElementById('camara-modal').classList.add('active');
        document.getElementById('camera-video').srcObject = stream;
        window.streamActual = stream;
    });
}

function capturarFoto() {
    const video = document.getElementById('camera-video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(blob => {
        const reader = new FileReader();
        reader.onload = () => {
            localStorage.setItem('userFoto', reader.result);
            document.getElementById('user-profile-img').src = reader.result;
        };
        reader.readAsDataURL(blob);
    });
    cerrarCamara();
}

function cerrarCamara() {
    closeModal('camara-modal');
    if (window.streamActual) window.streamActual.getTracks().forEach(t => t.stop());
}

function enviarMensaje() {
    const texto = document.getElementById('mensaje-texto').value.trim();
    if (!texto || !currentUser) return;
    const mensajes = JSON.parse(localStorage.getItem('mensajes') || '[]');
    const chats = JSON.parse(localStorage.getItem('chats') || '{}');
    
    if (!chats[currentUser.dni]) {
        chats[currentUser.dni] = [];
    }
    chats[currentUser.dni].push({ sender: 'user', text: texto, timestamp: new Date().toISOString() });
    localStorage.setItem('chats', JSON.stringify(chats));

    mensajes.push({ id: Date.now(), usuario: currentUser.dni, nombre: currentUser.nombre, apellido: currentUser.apellido, texto, fecha: new Date().toISOString() });
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
    
    alert('? Mensaje enviado');
    document.getElementById('mensaje-texto').value = '';
    closeModal('mensaje-modal');
}

function cargarRegistrosAdmin() {
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    document.getElementById('total-registros').textContent = registros.length;
    document.getElementById('con-foto').textContent = registros.filter(r => r.fotoUrl).length;
    document.getElementById('registros-hoy').textContent = registros.filter(r => new Date(r.fechaRegistro).toDateString() === new Date().toDateString()).length;
    const container = document.getElementById('registros-list');
    container.innerHTML = registros.map(r => `
        <div class="border p-4 rounded-md mb-2 cursor-pointer hover:bg-purple-50">
            <img src="${r.fotoUrl || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}" class="w-12 h-12 rounded-full inline mr-4">
            <strong>${r.nombre} ${r.apellido}</strong> - DNI: ${r.dni}
            <button onclick="verDetalle('${r.id}')" class="ml-2 bg-blue-500 text-white px-2 py-1 rounded">Ver</button>
            <button onclick="verFoto('${r.id}')" class="ml-2 bg-purple-500 text-white px-2 py-1 rounded">Foto</button>
            <button onclick="eliminarUsuario('${r.id}')" class="bg-red-600 text-white px-2 py-1 ml-2 rounded">? Eliminar</button>
        </div>
    `).join('');
}

function cargarMensajesAdmin() {
    const mensajes = JSON.parse(localStorage.getItem('mensajes') || '[]');
    document.getElementById('mensajes-count').textContent = mensajes.length;
    const container = document.getElementById('mensajes-list');
    container.innerHTML = mensajes.map(m => `
        <div class="border p-4 rounded-md mb-2">
            <strong>${m.nombre} ${m.apellido}</strong>: ${m.texto}
            <br><small>${new Date(m.fecha).toLocaleString()}</small>
            <button onclick="eliminarMensaje('${m.id}')" class="ml-2 bg-red-500 text-white px-2 py-1 rounded">?</button>
            <button onclick="abrirChat('${m.usuario}', '${m.nombre}', '${m.apellido}')" class="ml-2 bg-green-500 text-white px-2 py-1 rounded">Responder</button>
        </div>
    `).join('');
}

function verDetalle(id) {
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const user = registros.find(r => r.id === id);
    if (user) {
        const content = document.getElementById('detalle-content');
        content.innerHTML = `
            <p><strong>Nombre:</strong> ${user.nombre} ${user.apellido}</p>
            <p><strong>DNI:</strong> ${user.dni}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Celular:</strong> ${user.celular}</p>
            <p><strong>Seccion:</strong> ${user.seccionElectoral}a</p>
            <p><strong>Municipio:</strong> ${user.municipio}</p>
            <p><strong>Escuela:</strong> ${user.escuela}</p>
            <p><strong>Direccion:</strong> ${user.direccion}</p>
            <p><strong>Contrasena:</strong> ${user.password}</p>
            <p><strong>Fecha de registro:</strong> ${new Date(user.fechaRegistro).toLocaleDateString()}</p>
            ${user.fotoUrl ? `<img src="${user.fotoUrl}" class="w-32 h-32 rounded mt-4">` : ''}
        `;
        document.getElementById('detalle-modal').classList.add('active');
    }
}

function verFoto(id) {
    const registros = JSON.parse(localStorage.getItem('registros') || '[]');
    const user = registros.find(r => r.id === id);
    if (user && user.fotoUrl) {
        document.getElementById('foto-img').src = user.fotoUrl;
        document.getElementById('foto-nombre').textContent = `${user.nombre} ${user.apellido}`;
        document.getElementById('foto-modal').classList.add('active');
    } else {
        alert('Este usuario no tiene foto');
    }
}

function descargarFoto() {
    const imgSrc = document.getElementById('foto-img').src;
    const nombre = document.getElementById('foto-nombre').textContent;
    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = `foto-${nombre.replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function eliminarUsuario(id) {
    if (confirm('?Estas seguro de que quieres eliminar este usuario?')) {
        const registros = JSON.parse(localStorage.getItem('registros') || '[]');
        const nuevos = registros.filter(r => r.id !== id);
        localStorage.setItem('registros', JSON.stringify(nuevos));
        cargarRegistrosAdmin();
        cargarMensajesAdmin();
    }
}

function eliminarMensaje(id) {
    if (confirm('?Estas seguro de que quieres eliminar este mensaje?')) {
        const mensajes = JSON.parse(localStorage.getItem('mensajes') || '[]');
        const nuevos = mensajes.filter(m => m.id !== id);
        localStorage.setItem('mensajes', JSON.stringify(nuevos));
        cargarMensajesAdmin();
    }
}

function imprimirMensajes() {
    const mensajes = JSON.parse(localStorage.getItem('mensajes') || '[]');
    let html = `<h1>Mensajes - La Libertad Avanza</h1><table border="1" cellpadding="5"><thead><tr><th>Nombre</th><th>Apellido</th><th>Mensaje</th><th>Fecha</th></tr></thead><tbody>`;
    mensajes.forEach(m => {
        html += `<tr><td>${m.nombre}</td><td>${m.apellido}</td><td>${m.texto}</td><td>${new Date(m.fecha).toLocaleString()}</td></tr>`;
    });
    html += '</tbody></table>';
    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
    ventana.print();
}

function abrirChat(dniUsuario, nombre, apellido) {
    selectedUserChat = dniUsuario;
    document.getElementById('chat-user-name').textContent = `${nombre} ${apellido}`;
    document.getElementById('chat-modal').classList.add('active');
    cargarChat();
}

function cargarChat() {
    const chats = JSON.parse(localStorage.getItem('chats') || '{}');
    const chatContainer = document.getElementById('chat-content');
    chatContainer.innerHTML = '';
    if (chats[selectedUserChat]) {
        chats[selectedUserChat].forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat-message', msg.sender);
            messageDiv.textContent = msg.text;
            chatContainer.appendChild(messageDiv);
        });
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function enviarChat() {
    const input = document.getElementById('chat-input');
    const texto = input.value.trim();
    if (!texto || !selectedUserChat) return;

    const chats = JSON.parse(localStorage.getItem('chats') || '{}');
    if (!chats[selectedUserChat]) {
        chats[selectedUserChat] = [];
    }
    chats[selectedUserChat].push({ sender: 'admin', text: texto, timestamp: new Date().toISOString() });
    localStorage.setItem('chats', JSON.stringify(chats));

    input.value = '';
    cargarChat();
}

</script>

</body>
</html>
