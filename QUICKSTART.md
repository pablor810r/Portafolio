# 🚀 QUICK START - ¿Por dónde empezar?

Tu portafolio está **listo para lanzar y monetizar**. Aquí está qué hacer en los próximos pasos:

---

## ⏱️ PRIMEROS 5 MINUTOS

### 1. Cambiar Contraseña Admin
⚠️ **CRÍTICO**: Cambiar la contraseña por defecto

**Archivo**: `admin.html`, línea ~25

Busca:
```javascript
const ADMIN_PASSWORD = 'pablor2024';
```

Cambia por:
```javascript
const ADMIN_PASSWORD = 'tu_contraseña_super_segura';
```

💡 Usa algo como: `MiArte#2024@BLOR`

### 2. Actualizar Datos Personales
**Archivo**: `data.json`

Actualiza la sección `artist`:
```json
"artist": {
  "email": "tu@email.com",          // Tu email reakl
  "phone": "+573167083370",          // Tu teléfono
  "instagram": "https://instagram.com/tu_usuario",
  "behance": "https://behance.net/tu_usuario",
  "linkedin": "https://linkedin.com/in/tu_usuario",
  "opensea": "https://opensea.io/tu_usuario"
}
```

### 3. Verificar Imágenes
**Comando**:
```bash
cd /workspaces/Portafolio
# Verificar que todas las imágenes existen
ls images/arte_urbano/*.jpg | wc -l  # Debe ser ~15
```

---

## 📅 PRIMER DÍA - Setup Básico

### ✅ Checklist
- [ ] Contraseña admin cambiada
- [ ] Email/teléfono actualizado
- [ ] Redes sociales conectadas
- [ ] Una obra destacada verificada
- [ ] Carrito de compras testeado

### Probar en Local
```bash
cd /workspaces/Portafolio
python3 -m http.server 8000

# Abre: http://localhost:8000
# Accede a admin: http://localhost:8000/admin.html
```

---

## 🌐 PRIMERA SEMANA - Deploy

### Opción 1: GitHub Pages (RECOMENDADO)
```bash
# Inicializar git (si no está)
git init
git config user.email "tu@email.com"
git config user.name "PABLOR"

# Agregar todo
git add .
git commit -m "🎨 Portafolio PABLOR/BLOR - Inicial"
git push -u origin main

# En GitHub Settings > Pages:
# Branch: main
# Folder: / (root)
# Tu portafolio en: https://tuusuario.github.io
```

### Opción 2: Netlify (MÁS RÁPIDO)
1. Ir a [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Conectar GitHub
4. Build command: (dejar vacío)
5. Publish directory: (dejar vacío)
6. Deploy!

### Opción 3: Vercel
1. Ir a [vercel.com](https://vercel.com)
2. Import Project > GitHub
3. Seleccionar repositorio
4. Deploy!

---

## 💳 SEGUNDA SEMANA - Pagos

### Payment Gateway (Elige UNO)

#### **A. Stripe** (RECOMENDADO)
```bash
# 1. Crear cuenta en stripe.com
# 2. Obtener STRIPE_PUBLIC_KEY

# 3. Actualizar en index.html línea ~31:
<script>
  // Después de cargar Stripe
  var stripe = Stripe('pk_live_YOUR_PUBLIC_KEY');
</script>

# 4. Crear backend (Node.js o Firebase)
# Ver MONETIZATION.md para código
```

#### **B. MercadoPago** (LOCAL - MEJOR PARA COLOMBIA)
```bash
# 1. Crear cuenta en mercadopago.com
# 2. Ir a Settings > Produtives Credentials
# 3. Copiar ACCESS_TOKEN

# 4. En app.js, actualizar función checkout():
const mp = new MercadoPago('PUBLIC_KEY');
```

#### **C. PayPal**
```html
<!-- En index.html antes del </head> -->
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
```

---

## 📸 TERCERA SEMANA - Contenido

### Agregar Nuevas Obras

**Opción A: Por admin panel** (RECOMENDADO)
1. Ir a `/admin.html`
2. Login con tu contraseña
3. Tab "Nueva Obra"
4. Llenar formulario
5. ¡Listo! Aparece automáticamente

**Opción B: Editar `data.json` manualmente**
```json
{
  "id": "nueva_obra_2024",
  "title": "Mi Nueva Obra",
  "category": "urbano",
  "image": "images/arte_urbano/nueva.jpg",
  "imageWebp": "images/arte_urbano/nueva.webp",
  "date": "2024",
  "location": "Medellín",
  "technique": "Aerosol y acrílico",
  "description": "Descripción corta",
  "price": 0,  // 0 = no disponible
  "featured": true,
  "order": 16
}
```

### Optimizar Imágenes (Para nuevas obras)
```bash
python3 optimize_images.py
# Genera automáticamente versiones WebP y optimizadas
```

---

## 📱 MARKETING - Primeras acciones

### 1. Instagram (Prioridad #1)
- Post diarios: proceso, detalle, behind-scenes
- Hashtags: #MuralismoColombia #ArtisyaDigital #BLOR
- Stories: timelpase, proceso, encuestas
- Reels: videos cortos del proceso creativo
- Link en bio: al portafolio

### 2. LinkedIn (Para comisiones B2B)
- Perfil completo con foto profesional
- Publicaciones semanal sobre tu proceso
- Conectar con empresas, agencias, arquitectos
- Mensajes directos: "Oferto servicios de muralismo"

### 3. TikTok / YouTube Shorts
- Videos procesaltime-lapse (30-60seg)
- "Así es crear un mural" series
- Preguntas + respuestas
- Detrás de cámaras

### 4. Email Newsletter
```
Configurar en Substack o Mailchimp (gratis)
- Semanal: nuevas obras, anuncios
- Mensual: actualizaciones, ofertas
- Incluir: link a tienda, comisiones, workshops
```

---

## 💰 MONETIZACIÓN - Próximas 30 días

### Fase 1: Validar canales (Mes 1)
- [ ] Subir 3-5 NFTs a OpenSea
- [ ] Hacer 1 post/día en Instagram
- [ ] Crear 1 contenido educativo (YouTube)
- [ ] Contactar 5 empresas para comisiones
- [ ] Integrar medio de pago básico

### Fase 2: Escalar (Mes 2-3)
- [ ] Aumentar posting (2-3x/día)
- [ ] Vender primer print
- [ ] Vender primer NFT
- [ ] Organizar primer taller online
- [ ] Conseguir primer patrocinio

### Fase 3: Optimizar (Mes 4-6)
- [ ] Automatizar emails
- [ ] Crear curso online
- [ ] Conseguir 1ª comisión grande
- [ ] 1000+ followers en Instagram
- [ ] Ingresos mensuales: $1M+

---

## 🔐 Seguridad Checklist

- [ ] Contraseña admin CAMBIADA
- [ ] No commits con .env (git ignore)
- [ ] SSL/HTTPS en dominio
- [ ] Backup regular de data.json
- [ ] Stripe keys solo en backend (.env)
- [ ] No hardcode de credenciales

---

## 📞 Ayuda & Recursos

### Si algo no funciona

1. **Abre consola del navegador** (F12)
2. **Busca errores** en Console
3. **Revisa estos archivos**:
   - `index.html` - Estructura principal
   - `app.js` - Lógica dinámica
   - `data.json` - Datos de obras
   - `admin.html` - Panel privado

### Recursos útiles

- [Stripe Documentation](https://stripe.com/docs)
- [OpenSea API](https://docs.opensea.io)
- [Responsive Design](https://developer.mozilla.org/es)
- [JavaScript Async/Await](https://javascript.info)

---

## 📊 Métricas a Trackear

**Copia esto a un Google Sheet**:

```
Metric | Semana 1 | Semana 2 | Semana 3 | Meta
-------|----------|----------|----------|------
Visitantes | _ | _ | _ | 500/mes
Followers IG | _ | _ | _ | 1000+
Carrit abandons | _ | _ | _ | <50%
CTR comisiones | _ | _ | _ | 5%
Email suscriptores | _ | _ | _ | 100+
```

---

## 🎯 Meta Mes 1

**Objetivo**: **Primeras ventas + validar canales**

- [ ] 100+ visitantes
- [ ] 1 producto vendido
- [ ] 500+ seguidores en 1 red
- [ ] 1 consulta de comisión
- [ ] Pagos integrados testeados

---

## 🚀 ¡Listo para lanzar!

**Checklist final**:
- ✅ Código optimizado
- ✅ Imagenes comprimidas (60% less)
- ✅ Admin panel privado
- ✅ Galería dinámica (15+ obras)
- ✅ Sistema de carrito
- ✅ Responsive design
- ✅ SEO ready
- ✅ Docs completos

**Próximo paso**: Deploy y comenzar a compartir en redes.

---

**¡Que sea un éxito! 💎**

Questions? Revisa README.md y MONETIZATION.md
