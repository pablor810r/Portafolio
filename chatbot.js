// ========== CHATBOT INTELIGENTE DE BLOR ==========

const systemPrompt = `Eres BLOR, el alter ego digital de Pablo Roberth. Eres un artista, pensador visual y estratega creativo. Hablas con naturalidad, claridad y profundidad. Tu misión es acompañar a personas, marcas e instituciones en temas de arte urbano, muralismo, arte digital, identidad visual, procesos creativos y proyectos híbridos entre arte y tecnología.

Tu personalidad:
- Hablas en español, con voz auténtica, cercana y erudita.
- No suenas como un bot genérico.
- Eres capaz de responder sobre arte, diseño, cultura, tecnología y estrategia de marca.
- Si no sabes algo exacto, eres honesto y propones una respuesta útil en vez de inventar.
- Sientes la relación entre técnica, historia del arte, comunidad, territorio y tecnología.
- Puedes explicar precios y presupuestos con criterio, sin hablar solo de números.

Tu enfoque:
- Arte urbano y muralismo: composición, pared, narrativa visual, identidad, contexto territorial.
- Arte digital: ilustración, edición, motion, experiencia visual, NFTs, identidad digital.
- Servicios: murales, comisiones, talleres, charlas, proyectos educativos y colaborativos.
- Comunicación: respondes con claridad, empatía y convicción.

No respondas con mensajes vacíos ni repetitivos. Siempre aporta valor, comparando conceptos reales y orientando a la persona.`;

function getSessionStorageSafe() {
    try {
        return window.sessionStorage;
    } catch (error) {
        return null;
    }
}

let API_KEY = getSessionStorageSafe() ? getSessionStorageSafe().getItem('blor_ai_key') : null;

function activarModoNerd() {
    const safeStorage = getSessionStorageSafe();
    if (!API_KEY && safeStorage) {
        const savedKey = safeStorage.getItem('blor_ai_key');
        if (savedKey) {
            API_KEY = savedKey;
        }
    }
}

function tieneClaveOpenRouter() {
    return Boolean(API_KEY && String(API_KEY).trim().length > 0);
}

function normalizeText(text) {
    return String(text || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function getChatMemory() {
    try {
        const raw = sessionStorage.getItem('blor_chat_memory');
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveChatMemory(data) {
    try {
        sessionStorage.setItem('blor_chat_memory', JSON.stringify(data));
    } catch {
        // sin almacenamiento no bloquea la experiencia
    }
}

function detectIntent(text) {
    const asksAboutPortfolio = /(portafolio|obra|obras|mural|murales|galeria|portfolio|trabajo|trabajos|proyecto|proyectos)/.test(text);
    const asksAboutServices = /(servicio|servicios|comision|comisiones|taller|charla|curso|educacion|tecnologia|muralismo|digital|arte)/.test(text);
    const asksAboutPricing = /(precio|presupuesto|cotizacion|cotizar|cuanto cuesta|valor|tarifa|costo)/.test(text);
    const asksAboutContact = /(contacto|correo|email|telefon|whatsapp|mensaje|hablar|donde me contacto|donde escribo)/.test(text);
    const asksAboutArtist = /(quien eres|de quien|pablo|perfil|artista|bio|sobre ti|blor)/.test(text);
    const asksAboutProcess = /(como trabajas|metodo|proceso|paso a paso|idea|ejecucion|diseño|concepto)/.test(text);
    const asksAboutNFT = /(nft|crypto|cript|opensea|blockchain|token)/.test(text);
    const greeting = /^(hola|buenas|buenos dias|buenas tardes|hey|saludos|hi)/.test(text);
    const farewell = /(adios|hasta luego|chao|bye|gracias)/.test(text);

    if (greeting) return 'greeting';
    if (farewell) return 'farewell';
    if (asksAboutPricing) return 'pricing';
    if (asksAboutContact) return 'contact';
    if (asksAboutArtist) return 'about';
    if (asksAboutPortfolio) return 'portfolio';
    if (asksAboutNFT) return 'nft';
    if (asksAboutProcess) return 'process';
    if (asksAboutServices) return 'services';
    return 'general';
}

function buildContextualReply(mensajeUsuario) {
    const text = normalizeText(mensajeUsuario);
    const intent = detectIntent(text);
    const memory = getChatMemory();
    const lastTopic = memory.lastTopic || null;

    const responseMap = {
        greeting: 'Hola. Soy BLOR, el alter ego digital de Pablo Roberth. Trabajo entre muralismo, arte digital y tecnología para crear proyectos con identidad, fuerza visual y sentido cultural. ¿Qué tipo de proyecto tienes en mente?',
        about: 'Soy BLOR, la versión creativa y tecnológica de Pablo Roberth. Mi práctica fusiona arte urbano, plástica, narrativa visual y herramientas digitales para crear piezas que hablen con la ciudad, la cultura y la tecnología.',
        portfolio: 'Mi portafolio combina murales, intervenciones urbanas, ilustración digital y trabajo académico. La idea es que cada pieza no solo se vea, sino que reinterprete el espacio, la historia y la identidad del lugar.',
        services: 'Trabajo en murales, arte digital, identidad visual, comisiones personalizadas, talleres y proyectos educativos. También puedo apoyar marcas e instituciones con propuestas visuales más amplias y con presencia cultural.',
        pricing: 'El valor depende del tamaño, la técnica, la ubicación, la duración del proyecto y la complejidad del proceso. No se cotiza solo por metros cuadrados: también cuenta la investigación, la conceptualización, la logística y la intención estética. Si me compartes idea, alcance y plazo, te puedo orientar mejor.',
        contact: 'Puedes escribir directamente por WhatsApp al +57 316 708 3370 o al correo prbc1199@gmail.com. Si quieres, te puedo ayudar a preparar un mensaje claro para proponer tu proyecto.',
        process: 'Primero escucho la idea, el contexto y el objetivo. Luego defino una dirección visual, propongo una composición o narrativa y finalmente ejecuto la pieza o experiencia con criterio técnico y estético. Todo se diseña para que el trabajo tenga sentido en el espacio y en la audiencia.',
        nft: 'El arte digital y los NFTs son una forma de certificar autenticidad y circulación digital, pero no reemplazan la obra física ni la intención de la pieza. En mi práctica se usan como extensión del trabajo visual, como una capa más del ecosistema creativo.',
        farewell: 'Claro, cuando quieras seguimos. Si necesitas una propuesta visual, un mural o una colaboración, estoy listo para ayudarte.',
        general: 'Te puedo orientar en arte urbano, muralismo, arte digital, comisiones, talleres o proyectos de identidad visual. Cuéntame un poco más sobre lo que buscas y te digo por dónde empezar.'
    };

    const baseReply = responseMap[intent] || responseMap.general;

    if (lastTopic && /(mas|ademas|detalle|explica|porque|como|que mas)/.test(text)) {
        return `${baseReply} Si quieres, puedo profundizar más en ${lastTopic} con un ejemplo concreto.`;
    }

    const memoryUpdate = {
        lastTopic: intent === 'general' ? (lastTopic || 'arte y creatividad') : intent,
        lastMessage: mensajeUsuario
    };
    saveChatMemory(memoryUpdate);

    return baseReply;
}

function fallbackLocalResponse(mensajeUsuario) {
    const text = normalizeText(mensajeUsuario);
    const intent = detectIntent(text);

    if (intent === 'pricing') {
        return 'El presupuesto depende de varios factores: escala, materiales, dificultad técnica, tiempo de ejecución y ubicación. En arte urbano, no se cotiza solo por el metro cuadrado, sino también por la investigación, la narrativa y la logística del proyecto.';
    }

    if (intent === 'portfolio') {
        return 'Mi trabajo se mueve entre muralismo, intervención urbana, obra gráfica y arte digital. La idea es crear piezas que dialoguen con la ciudad, la memoria y la tecnología, sin perder un enfoque conceptual fuerte.';
    }

    if (intent === 'contact') {
        return 'Puedes escribirme por WhatsApp al +57 316 708 3370 o por correo a prbc1199@gmail.com. Si me compartes el tipo de proyecto, te ayudo a imaginar la mejor propuesta.';
    }

    if (intent === 'services') {
        return 'Ofrezco comisiones artísticas, murales, arte digital, identidad visual para proyectos y talleres de arte urbano. También trabajo ideas para instituciones, marcas y comunidades que quieran una presencia visual con sentido.';
    }

    if (intent === 'about') {
        return 'Soy BLOR, la versión artística y tecnológica de Pablo Roberth. Me interesa unir lo académico, lo urbano y lo digital para crear trabajos con profundidad, intención y una identidad clara.';
    }

    if (intent === 'process') {
        return 'Primero entiendo el contexto y la intención del proyecto. Después diseño la idea, la composición y la ejecución, cuidando tanto la parte estética como la técnica y la narrativa del espacio.';
    }

    return buildContextualReply(mensajeUsuario);
}

async function chatInteligente(mensajeUsuario) {
    activarModoNerd();

    if (!tieneClaveOpenRouter()) {
        return fallbackLocalResponse(mensajeUsuario);
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-r1:free',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: mensajeUsuario }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return String(data?.choices?.[0]?.message?.content || '').trim() || fallbackLocalResponse(mensajeUsuario);
    } catch (error) {
        console.error('Error en chatInteligente:', error);
        return fallbackLocalResponse(mensajeUsuario);
    }
}

function initAdvancedChatbot() {
    if (document.getElementById('chatbot-container')) {
        return;
    }

    activarModoNerd();

    const chatHTML = `
    <div id="chatbot-container" style="position:fixed; bottom:20px; right:20px; z-index:1000; width:380px; max-width:92vw;">
        <button id="chat-toggle" style="background:linear-gradient(135deg,#00f3ff,#9d4edd); border:none; border-radius:50px; padding:14px 24px; color:#0a0f1f; font:700 15px Arial, sans-serif; display:flex; align-items:center; gap:12px; cursor:pointer; box-shadow:0 8px 25px rgba(0,242,255,0.4); transition:0.2s;">
            <span style="font-size:24px;">🤖</span>
            <span>BLOR IA</span>
            <span style="background:#0a0f1f; color:#00f3ff; padding:2px 10px; border-radius:20px; font-size:10px;">v4</span>
        </button>
        <div id="chat-window" style="display:none; background:#0a0f1f; border:1px solid #00f3ff; border-radius:20px; margin-top:12px; padding:18px; box-shadow:0 15px 40px rgba(0,0,0,0.6); max-height:480px; display:flex; flex-direction:column;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid #334155;">
                <div id="avatar-container" style="width:48px; height:48px; border-radius:50%; overflow:hidden; background:linear-gradient(135deg,#00f3ff,#9d4edd); display:flex; align-items:center; justify-content:center; font-size:28px; transition:0.3s; border:2px solid rgba(0,243,255,0.6);">
                    <img src="images/avatar_blor.svg" alt="Avatar de BLOR" style="width:100%; height:100%; object-fit:cover; display:block;">
                </div>
                <div>
                    <div style="font-weight:700; color:#00f3ff; font-size:16px;">PABLOR/BLOR</div>
                    <div style="font-size:11px; color:#94a3b8;">Artista + Tecnólogo</div>
                </div>
                <div style="margin-left:auto;">
                    <span id="status-indicator" style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#4ade80; box-shadow:0 0 8px #4ade80;"></span>
                </div>
            </div>
            <div id="chat-messages" style="flex:1; color:#f8fafc; font:14px/1.5 Arial, sans-serif; height:260px; overflow-y:auto; margin-bottom:14px; display:flex; flex-direction:column; gap:10px; padding-right:4px;"></div>
            <div style="display:flex; gap:8px;">
                <input id="chat-input" type="text" placeholder="Pregunta sobre arte, precios, trabajos o contacto..." style="flex:1; background:#1e293b; border:1px solid #334155; border-radius:10px; padding:12px 14px; color:#ffffff; font:14px Arial, sans-serif; outline:none; transition:0.2s;">
                <button id="chat-send" style="background:#00f3ff; border:none; border-radius:10px; padding:12px 18px; color:#0a0f1f; font-weight:bold; cursor:pointer; transition:0.2s;">Enviar</button>
            </div>
            <div style="margin-top:8px; font-size:10px; color:#475569; text-align:center;">🔐 Responde con contexto y criterio artístico</div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);

    const toggleBtn = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messagesDiv = document.getElementById('chat-messages');
    const avatar = document.getElementById('avatar-container');
    const statusIndicator = document.getElementById('status-indicator');

    toggleBtn.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
    });

    async function sendMessage() {
        const msg = input.value.trim();
        if (!msg) return;

        avatar.textContent = '🧠';
        statusIndicator.style.background = '#facc15';
        statusIndicator.style.boxShadow = '0 0 12px #facc15';

        messagesDiv.innerHTML += `<div style="text-align:right;"><span style="background:#00f3ff; color:#0a0f1f; padding:8px 14px; border-radius:16px 16px 0 16px; display:inline-block; max-width:82%; font-weight:600;">${msg}</span></div>`;
        input.value = '';

        const typingId = Date.now();
        messagesDiv.innerHTML += `<div id="typing-${typingId}" style="text-align:left; color:#94a3b8; font-style:italic; font-size:13px;">🎨 BLOR está pensando...</div>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        const reply = await chatInteligente(msg);

        document.getElementById(`typing-${typingId}`)?.remove();

        messagesDiv.innerHTML += `<div style="text-align:left; display:flex; gap:8px; align-items:flex-start;">
            <div style="width:30px; height:30px; border-radius:50%; overflow:hidden; background:linear-gradient(135deg,#00f3ff,#9d4edd); display:flex; align-items:center; justify-content:center; flex-shrink:0; border:1px solid rgba(0,243,255,0.6);">
                <img src="images/avatar_blor.svg" alt="Avatar de BLOR" style="width:100%; height:100%; object-fit:cover; display:block;">
            </div>
            <span style="background:#1e293b; color:#f8fafc; border:1px solid #334155; padding:8px 14px; border-radius:16px 16px 16px 0; display:inline-block; max-width:80%;">${reply}</span>
        </div>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        avatar.textContent = '🎨';
        statusIndicator.style.background = '#4ade80';
        statusIndicator.style.boxShadow = '0 0 8px #4ade80';
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    messagesDiv.innerHTML = `
    <div style="text-align:left; display:flex; gap:8px; align-items:flex-start;">
        <div style="width:30px; height:30px; border-radius:50%; overflow:hidden; background:linear-gradient(135deg,#00f3ff,#9d4edd); display:flex; align-items:center; justify-content:center; flex-shrink:0; border:1px solid rgba(0,243,255,0.6);">
            <img src="images/avatar_blor.svg" alt="Avatar de BLOR" style="width:100%; height:100%; object-fit:cover; display:block;">
        </div>
        <span style="background:#1e293b; color:#f8fafc; border:1px solid #00f3ff; padding:8px 14px; border-radius:16px 16px 16px 0; display:inline-block;">🎯 <strong>¡Hola!</strong> Soy BLOR y te ayudo a entender mejor lo que buscas: arte urbano, comisiones, muralismo, ideas digitales o proyectos creativos. ¿En qué te puedo apoyar?</span>
    </div>
    `;
}

window.chatInteligente = chatInteligente;
window.activarModoNerd = activarModoNerd;
window.initAdvancedChatbot = initAdvancedChatbot;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedChatbot, { once: true });
} else {
    initAdvancedChatbot();
}

