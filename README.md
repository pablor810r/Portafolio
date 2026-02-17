# 🎨 PABLOR/BLOR - Portafolio Vendible & Escalable

> Portafolio profesional híbrido: **Muralismo Urbano + Arte Digital + Educación**
> 
> Sistema completo de monetización, admin privado y galerías dinámicas

---

## 📋 Contenido

- [Características](#características)
- [Panel Admin](#panel-admin)
- [Sistema de Tienda](#sistema-de-tienda)
- [Integración de Pagos](#integración-de-pagos)
- [Gestión de Obras](#gestión-de-obras)
- [Despliegue](#despliegue)
- [Monetización](#monetización)

---

## ✨ Características

### 🎭 Portafolio Híbrido
- **Galería dinámicamente cargable** desde `data.json`
- **15+ obras** de arte urbano, digital y académico
- **Filtros interactivos**: Urbano, Digital, Académico, Proceso
- **Lightbox mejorado** con información contextual
- **Optimización de imágenes**: WebP + JPG optimizado (~60% menor peso)

### 🛍️ E-Commerce Integrado
- **Carrito de compras** con localStorage
- **Productos fisicos y digitales**:
  - Prints limitados (COP)
  - NFTs en Ethereum
  - Merchandise (stickers, etc.)
- **Checkout con Stripe** (integratable)
- **Seguimiento de visitantes**

### 🔐 Panel Admin Privado
- **Acceso protegido** con contraseña (cambiar en `admin.html`)
- **Agregar obras** sin editar HTML
- **Editar metadatos**: título, fecha, técnica, precio
- **Cargar imágenes** automáticamente en `images/arte_urbano/`
- **Estadísticas en tiempo real**: obras,visitantes, valor portafolio

### 🎨 Diseño Profesional
- **Colores personalizados**: Neon Blue + Neon Orange
- **Animaciones tipo aerosol** (efecto spray)
- **Cursor personalizado**
- **Modo responsivo** (mobile-first)
- **SEO optimizado**

---

## 🔐 Panel Admin

### Acceder
1. Ir a `/admin.html`
2. Contraseña actual: `pablor2024`
3. ⚠️ **CAMBIAR CONTRASEÑA EN PRODUCCIÓN**

### Funciones

#### 1. Ver Mis Obras
- Lista de todas las obras con preview
- Editar metadatos
- Marcar como destacada
- Cambiar estado (exposición / disponible)
- Ver estadísticas

#### 2. Agregar Nueva Obra
**Campos obligatorios:**
- Título
- Categoría (urbano, digital, académico, proceso)
- Fecha
- Imagen

**Campos opcionales:**
- Ubicación
- Técnica
- Tamaño
- Precio (en COP, 0 = no disponible)
- Descripción
- Marcar como destacada

**La imagen se guardará en:** `images/arte_urbano/`

#### 3. Gestionar Productos
- Prints limitados
- NFTs
- Merchandise
- Precios en COP o ETH

#### 4. Estadísticas
- Número de obras
- Visitantes registrados
- Productos activos
- Valor total del portafolio

---

## 🛍️ Sistema de Tienda

### Productos Disponibles

```json
{
  "id": "print_guardian",
  "title": "Print Limitado - Guardián de Semilla",
  "price": 85000,
  "currency": "COP",
  "limited": 50,
  "sold": 0
}
```

### Carrito
- Se guarda en `localStorage` automáticamente
- Sincronización en tiempo real
- Soporte para múltiples monedas (COP, ETH)

### Checkout
```javascript
// Agregar producto
addToCart('print_guardian');

// Proceder a pago
checkout();
```

---

## 💳 Integración de Pagos

### Opción 1: Stripe (Recomendado)

**Estado:** Listo para integrar (incluye Stripe.js)

**Pasos:**
1. Crear cuenta en [Stripe.com](https://stripe.com)
2. Obtener `STRIPE_PUBLIC_KEY`
3. Actualizar en `app.js`:

```javascript
// En app.js, función checkout()
const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
const response = await stripe.redirectToCheckout({...});
```

4. Backend (Node.js/Firebase):
```javascript
const stripe = require('stripe')('sk_live_...');

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [...],
    mode: 'payment',
    success_url: 'https://tudominio.com/gracias',
    cancel_url: 'https://tudominio.com/tienda',
  });
  res.json({ id: session.id });
});
```

### Opción 2: PayPal

Similar a Stripe, incluir SDK:
```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
```

### Opción 3: MercadoPago (Latinoamérica)

```html
<script src="https://sdk.mercadopago.com/js/v2"></script>
```

---

## 📸 Gestión de Obras

### Estructura de Carpetas

```
images/
├── arte_urbano/          # Murales y arte urbano
│   ├── obra.jpg          # Original
│   ├── obra.webp         # Formato moderno
│   ├── obra_opt.jpg      # Optimizado para web
│   └── ...
├── digital/              # Obras digitales & productos
│   ├── illustration.jpg
│   ├── producto_*.jpg
│   └── ...
├── plastica/             # Obras académicas
│   └── ...
└── tech/                 # Reservado para expansión
```

### Archivo `data.json`

Contiene:
- **artist**: Información del artista
- **works**: Array de obras (15+ incluidas)
- **products**: Productos en tienda
- **services**: Servicios ofrecidos

**Agregar obra manualmente:**

```json
{
  "id": "new_work",
  "title": "Mi Nueva Obra",
  "category": "urbano",
  "image": "images/arte_urbano/nueva.jpg",
  "imageWebp": "images/arte_urbano/nueva.webp",
  "date": "2024",
  "location": "Medellín, Colombia",
  "technique": "Aerosol",
  "size": "Mural 10x8m",
  "description": "Descripción...",
  "price": 0,
  "status": "exposicion",
  "featured": true,
  "order": 16
}
```

---

## 🚀 Despliegue

### Local
```bash
python3 -m http.server 8000
# O con Node.js:
npx http-server
```

### GitHub Pages
```bash
git add .
git commit -m "Update portfolio"
git push origin main
# Ir a Settings > Pages > Branch: main
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

---

## 💰 Monetización

### Estrategias Activadas

#### 1. **Venta de Prints & Merchandise**
- Prints limitados: $85,000 - $150,000 COP
- Stickers: $25,000 - $50,000 COP
- Margen: 30-50%

#### 2. **NFTs & Blockchain**
- Listar en OpenSea (Ethereum)
- Precios: 0.5 - 2 ETH
- Margen: 100% (sin costos)

#### 3. **Comisiones de Obras**
- Murales corporativos: $5M - $20M COP
- Arte digital personalizado: $2M - $10M COP
- Formulario de contacto integrado

#### 4. **Workshops & Educación**
- Talleres urbano: $300,000 - $500,000 COP
- Clases online: $100,000 - $200,000 COP
- Reservar via WhatsApp

#### 5. **Patrocinio & Sponsorship**
- Badge en portafolio: $1M - $3M COP/año
- Social media takeover
- ARP integradas (publicidad)

### Cálculo de Ingresos Mensuales Proyectados

```
Escenario conservador (primeros 3 meses):
- 200 visitantes/mes
- 1 venta print: $85,000
- 1 venta merchandise: $30,000
- 1 comisión pequeña: $3,000,000
= ~$3,115,000 COP/mes

Escenario agresivo (6+ meses):
- 2,000 visitantes/mes
- 3 ventas print: $255,000
- 2 ventas merchandise: $60,000
- 2 comisiones: $6,000,000
- 1 workshop: $400,000
= ~$6,715,000 COP/mes
```

---

## 🔧 Configuración Importante

### Cambiar Contraseña Admin
En `admin.html`, línea ~25:
```javascript
const ADMIN_PASSWORD = 'pablor2024';  // CAMBIAR
```

### Actualizar Meta Social
En `index.html`, líneas 13-25:
```html
<meta property="og:url" content="https://tudominio.com">
<meta property="og:image" content="https://tudominio.com/og-image.jpg">
```

### Datos del Artista
En `data.json`, actualizar:
```json
"artist": {
  "name": "PABLOR/BLOR",
  "email": "tu@email.com",
  "phone": "+573167083370",
  "instagram": "https://instagram.com/tu_usuario",
  ...
}
```

---

## 📊 Analytics & Tracking

El portafolio registra:
- **Visitantes**: localStorage (`pablor_visits`)
- **Carrito**: localStorage (`pablor_cart`)
- **Última visita**: localStorage (`pablor_last_visit`)

Para Google Analytics (opcional):
```html
<!-- En <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 📝 Logs & Debugging

Abre la consola del navegador (F12) para ver:
- Cargas de data.json
- Errores de imágenes
- Estado del carrito
- Información de diseño

---

## 🎯 Próximos Pasos

### Fase 1 (Ya hecho)
- [x] Galería dinámicas
- [x] Admin panel privado
- [x] Sistema de carrito
- [x] Optimización de imágenes
- [x] Diseño profesional

### Fase 2 (Integrar)
- [ ] Stripe/PayPal
- [ ] Email de confirmación
- [ ] Base de datos (Firebase/Supabase)
- [ ] Sistema de facturación
- [ ] Blog/contenido

### Fase 3 (Expansión)
- [ ] App móvil (React Native)
- [ ] Marketplace integrado
- [ ] CRM para clientes
- [ ] Analytics avanzado
- [ ] SEO agresivo

---

## 📞 Contacto & Soporte

**Email**: prbc1199@gmail.com  
**WhatsApp**: +573167083370  
**Instagram**: @pablor810r  

---

## 📄 Licencia

© 2024 PABLOR Studio. Todos los derechos reservados.

El código está disponible bajo MIT License para uso personal.

---

**¡Listo para monetizar!** 🚀
