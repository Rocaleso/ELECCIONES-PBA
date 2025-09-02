// ============================================
// CONFIGURACIÓN BACKEND - API CLIENT
// ============================================

// Configuración de la API
const API_CONFIG = {
    baseURL: 'http://localhost:3000/api',
    wsURL: 'ws://localhost:3000',
    timeout: 10000
};

// Cliente API Principal
class LLA_API {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
        this.wsURL = API_CONFIG.wsURL;
        this.token = localStorage.getItem('token') || null;
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    // 🔐 AUTENTICACIÓN
    async login(email, password) {
        try {
            const response = await this.fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            this.token = response.token;
            localStorage.setItem('token', this.token);
            return response;
        } catch (error) {
            throw new Error(`Error de login: ${error.message}`);
        }
    }

    async register(userData) {
        return this.fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    // 👥 USUARIOS
    async getUsers(filters = {}) {
        const query = new URLSearchParams(filters).toString();
        return this.fetch(`/users?${query}`);
    }

    async createUser(userData) {
        return this.fetch('/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async updateUser(id, data) {
        return this.fetch(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteUser(id) {
        return this.fetch(`/users/${id}`, {
            method: 'DELETE'
        });
    }

    // 🚨 REPORTES
    async getReports(filters = {}) {
        const query = new URLSearchParams(filters).toString();
        return this.fetch(`/reports?${query}`);
    }

    async createReport(reportData) {
        const formData = new FormData();
        Object.keys(reportData).forEach(key => {
            formData.append(key, reportData[key]);
        });
        
        return this.fetch('/reports', {
            method: 'POST',
            body: formData,
            headers: {}
        });
    }

    async updateReport(id, data) {
        return this.fetch(`/reports/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // 💬 MENSAJES
    async getMessages() {
        return this.fetch('/messages');
    }

    async sendMessage(messageData) {
        return this.fetch('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData)
        });
    }

    // 🔌 WEBSOCKET
    connectWebSocket() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) return;

        this.ws = new WebSocket(`${this.wsURL}/ws`);
        
        this.ws.onopen = () => {
            console.log('✅ WebSocket conectado');
            document.getElementById('connection-status').textContent = 'Conectado';
            document.getElementById('connection-status').className = 'bg-green-500 text-white px-3 py-1 rounded-full text-sm';
        };

        this.ws.onclose = () => {
            console.log('❌ WebSocket desconectado');
            document.getElementById('connection-status').textContent = 'Desconectado';
            document.getElementById('connection-status').className = 'bg-red-500 text-white px-3 py-1 rounded-full text-sm';
            this.reconnect();
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleWebSocketMessage(data);
        };
    }

    // 🔧 UTILIDADES
    async fetch(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en la petición');
            }

            return data;
        } catch (error) {
            console.error('❌ Error API:', error);
            throw error;
        }
    }

    logout() {
        this.token = null;
        localStorage.removeItem('token');
        if (this.ws) this.ws.close();
    }
}

// ============================================
// DATOS Y VARIABLES GLOBALES
// ============================================

// Secciones electorales
const SECCIONES_ELECTORALES = {
    1: { name: "1ª Sección Electoral", municipalities: ["Campana", "Escobar", "General Las Heras", "General Rodríguez", "General San Martín", "Hurlingham", "Ituzaingó", "José C. Paz", "Luján", "Malvinas Argentinas", "Marcos Paz", "Mercedes", "Merlo", "Moreno", "Morón", "Navarro", "Pilar", "San Fernando", "San Isidro", "San Miguel", "Suipacha", "Tigre", "Tres de Febrero", "Vicente López"] },
    2: { name: "2ª Sección Electoral", municipalities: ["Arrecifes", "Baradero", "Capitán Sarmiento", "Carmen de Areco", "Colón", "Exaltación de la Cruz", "Pergamino", "Ramallo", "Rojas", "Salto", "San Andrés de Giles", "San Antonio de Areco", "San Nicolás", "San Pedro", "Zárate"] },
    3: { name: "3ª Sección Electoral", municipalities: ["Almirante Brown", "Avellaneda", "Berazategui", "Berisso", "Brandsen", "Cañuelas", "Ensenada", "Esteban Echeverría", "Ezeiza", "Florencio Varela", "La Matanza", "Lanús", "Lobos", "Lomas de Zamora", "Magdalena", "Presidente Perón", "Punta Indio", "Quilmes", "San Vicente"] },
    4: { name: "4ª Sección Electoral", municipalities: ["Alberti", "Bragado", "Carlos Casares", "Carlos Tejedor", "Chacabuco", "Chivilcoy", "Florentino Ameghino", "General Arenales", "General Pinto", "General Viamonte", "General Villegas", "Hipólito Yrigoyen", "Junín", "Leandro N. Alem", "Lincoln", "Nueve de Julio", "Pehuajó", "Rivadavia", "Trenque Lauquen"] },
    5: { name: "5ª Sección Electoral", municipalities: ["Ayacucho", "Balcarce", "Castelli", "Chascomús", "Dolores", "General Alvarado", "General Belgrano", "General Guido", "General Lavalle", "General Madariaga", "General Paz", "General Pueyrredón", "La Costa", "Las Flores", "Lezama", "Lobería", "Maipú", "Mar Chiquita", "Monte", "Necochea", "Pila", "Pinamar", "Rauch", "San Cayetano", "Tandil", "Tordillo", "Villa Gesell"] },
    6: { name: "6ª Sección Electoral", municipalities: ["Adolfo Alsina", "Adolfo Gonzales Chaves", "Bahía Blanca", "Benito Juárez", "Coronel Dorrego", "Coronel Pringles", "Coronel Rosales", "Coronel Suárez", "Daireaux", "Guaminí", "General Lamadrid", "Laprida", "Monte Hermoso", "Patagones", "Pellegrini", "Puan", "Saavedra", "Salliqueló", "Tornquist", "Tres Arroyos", "Tres Lomas", "Villarino"] },
    7: { name: "7ª Sección Electoral", municipalities: ["Azul", "Bolívar", "General Alvear", "Olavarría", "Roque Pérez", "Saladillo", "Tapalqué", "Veinticinco de Mayo"] },
    8: { name: "8ª Sección Electoral", municipalities: ["La Plata", "Isla Martín García"] }
};

// Escuelas de ejemplo
const ESCUELAS_BD = [
    { id: 1, nombre: "Escuela Primaria N° 1 República Argentina", direccion: "Calle 13 y 60", municipio: "La Plata" },
    { id: 2, nombre: "Escuela Secundaria N° 5", direccion: "Calle 7 entre 57 y 58", municipio: "La Plata" },
    { id: 3, nombre: "Escuela N° 23 Nicolás Avellaneda", direccion: "Av. Mitre 750", municipio: "Avellaneda" },
    { id: 4, nombre: "Escuela Técnica N° 1", direccion: "Colón 167", municipio: "Avellaneda" },
    { id: 5, nombre: "Colegio San Patricio", direccion: "Av. Libertador 1234", municipio: "San Isidro" }
];

// ============================================
// CLIENTE API GLOBAL
// ============================================
const api = new LLA_API();

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
    api.connectWebSocket();
});

function inicializarApp() {
    if (!localStorage.getItem('registros')) {
        localStorage.setItem('registros', JSON.stringify([]));
    }
    if (!localStorage.getItem('chatMensajes')) {
        localStorage.setItem('chatMensajes', JSON.stringify([]));
    }
    if (!localStorage.getItem('emergencias')) {
        localStorage.setItem('emergencias', JSON.stringify([]));
    }
    
    cargarMunicipios();
    renderSections();
    
    // Auto-actualizar cada 5 segundos
    setInterval(() => {
        if (api.token) {
            cargarEstadisticas();
        }
    }, 5000);
}

// Funciones de UI
function showRegistro() {
    document.getElementById('registro-modal').classList.add('active');
}

function showAdmin() {
    document.getElementById('admin-modal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Secciones Electorales
function renderSections() {
    const grid = document.getElementById('sections-grid');
    grid.innerHTML = '';
    
    Object.entries(SECCIONES_ELECTORALES).forEach(([num, section]) => {
        const button = document.createElement('button');
        button.className = `section-button p-4 rounded-lg border-2 transition-all`;
        button.onclick = () => selectSection(parseInt(num));
        button.innerHTML = `
            <div class="font-bold text-lg">${num}ª</div>
            <div class="text-sm text-gray-600">Sección</div>
            <div class="text-xs text-purple-600 mt-1">${section.municipalities.length} municipios</div>
        `;
        grid.appendChild(button);
    });
}

function selectSection(sectionNum) {
    selectedSection = selectedSection === parseInt(sectionNum) ? null : parseInt(sectionNum);
    showSectionDetails();
}

// Registro de usuario
document.getElementById('registro-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const registro = {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        dni: formData.get('dni'),
        email: formData.get('email'),
        celular: formData.get('celular'),
        municipio: formData.get('municipio'),
        seccionElectoral: formData.get('seccionElectoral'),
        escuela: formData.get('escuela'),
        direccion: formData.get('direccion')
    };

    try {
        showLoading(true);
        const result = await api.createUser(registro);
        
        // Manejar foto
        const fotoFile = formData.get('foto');
        if (fotoFile && fotoFile.size > 0) {
            const reader = new FileReader();
            reader.onload = async function(e) {
                await api.updateUser(result.id, { fotoUrl: e.target.result });
            };
            reader.readAsDataURL(fotoFile);
        }
        
        mostrarNotificacion('✅ Registro exitoso', 'success');
        closeModal('registro-modal');
        e.target.reset();
    } catch (error) {
        mostrarNotificacion('❌ Error: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
});

// Admin
async function loginAdmin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'David2025') {
        document.getElementById('admin-login').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        cargarPanelAdmin();
        mostrarNotificacion('✅ Acceso concedido', 'success');
    } else {
        mostrarNotificacion('❌ Contraseña incorrecta', 'error');
        document.getElementById('admin-password').classList.add('shake');
        setTimeout(() => {
            document.getElementById('admin-password').classList.remove('shake');
        }, 500);
    }
}

async function cargarPanelAdmin() {
    try {
        const registros = await api.getUsers();
        document.getElementById('total-registros').textContent = registros.length || 0;
        document.getElementById('con-foto').textContent = registros.filter(r => r.fotoUrl).length || 0;
        
        const hoy = new Date().toDateString();
        document.getElementById('registros-hoy').textContent = registros.filter(r => 
            new Date(r.createdAt).toDateString() === hoy
        ).length || 0;
        
        mostrarRegistros(registros);
    } catch (error) {
        console.error('Error cargando panel admin:', error);
    }
}

// Utilidades
function mostrarNotificacion(mensaje, tipo = 'info') {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500', 
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed top-16 left-1/2 transform -translate-x-1/2 ${colors[tipo]} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
    notification.textContent = mensaje;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (show) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
}

function cargarMunicipios() {
    const select = document.getElementById('municipio-select');
    const allMunicipalities = Object.values(SECCIONES_ELECTORALES)
        .flatMap(section => section.municipalities)
        .sort();
    
    select.innerHTML = '<option value="">Selecciona municipio</option>';
    allMunicipalities.forEach(municipality => {
        const option = document.createElement('option');
        option.value = municipality;
        option.textContent = municipality;
        select.appendChild(option);
    });
}

// Funciones del chat
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('hidden');
}

async function enviarMensajeChat() {
    const input = document.getElementById('chat-input');
    const mensaje = input.value.trim();
    
    if (!mensaje) return;
    
    try {
        await api.sendMessage({
            text: mensaje,
            type: 'chat'
        });
        input.value = '';
        mostrarNotificacion('Mensaje enviado', 'success');
    } catch (error) {
        mostrarNotificacion('Error enviando mensaje', 'error');
    }
}

// Emergencias
async function enviarEmergencia() {
    const mensaje = document.getElementById('emergency-message').value.trim();
    if (!mensaje) {
        mostrarNotificacion('Por favor escribe un mensaje', 'warning');
        return;
    }
    
    try {
        await api.createReport({
            type: 'emergency',
            description: mensaje,
            severity: 'high'
        });
        
        mostrarNotificacion('🚨 Emergencia enviada', 'success');
        closeModal('emergency-modal');
        document.getElementById('emergency-message').value = '';
    } catch (error) {
        mostrarNotificacion('Error enviando emergencia', 'error');
    }
}

// Exportar para backend
window.LLA_API = LLA_API;
window.api = api;