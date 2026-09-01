# 📦 INSTRUCCIONES DE ENTREGA - CAMPUS VIRTUAL STUDIA IA

## ¿Qué debes subir?

Tu proyecto está completo y listo. Necesitas subir **3 elementos**:

### 1️⃣ **El Portafolio Web Interactivo**
- **Archivo:** Todo el contenido de esta carpeta (`/workspaces/Portafolio/`)
- **Cómo subir:** 
  - Opción A: Sube la carpeta completa comprimida como `.zip`
  - Opción B: Comparte el enlace de GitHub (ver abajo)
  - Opción C: Despliega en Netlify/Vercel gratis

### 2️⃣ **Las 3 Fotos del Proyecto** (para la presentación del campus)

Usa estas 3 fotos que mejor representan tu trabajo:

1. **Arte Urbano** 
   - `images/arte_urbano/mural_simbolo_ancestral_2024.jpg`
   - Descripción: Muralismo contemporáneo con referencias ancestrales

2. **Arte Digital**
   - `images/digital/predigital_guardian_semilla.jpg`
   - Descripción: Técnica digital + inteligencia artificial

3. **Plástica Tradicional**
   - `images/plastica/detalle_estudio_pintura_oleo_napoleon_cruzando_los_alpes.jpg`
   - Descripción: Pintura al óleo y técnicas clásicas

### 3️⃣ **El Video del Portafolio** (2-3 minutos)

Tienes dos opciones:

#### **OPCIÓN A: Rápida (5 minutos)** 🚀
1. Abre `portafolio_video.html` en tu navegador
2. Descarga **OBS Studio** (gratis): https://obsproject.com
3. Crea una nueva escena en OBS
4. Agrega una fuente de navegador y selecciona la ventana del HTML
5. Configura:
   - Resolución: 1920x1080
   - FPS: 30
6. Presiona "Grabar" durante 2 minutos
7. Guarda el video como `PABLOR_BLOR_Portafolio.mp4`

#### **OPCIÓN B: Usando la Presentación** ✨
1. Abre `presentacion.html` en tu navegador
2. Graba con OBS igual que arriba
3. El video durará ~2.5 minutos automáticamente

---

## 🚀 Publicación en GitHub (Opcional pero recomendado)

### Paso 1: Inicializar repositorio git

```bash
cd /workspaces/Portafolio
git init
git add .
git commit -m "Proyecto integrador IA: Portafolio + Chatbot + Presentación"
```

### Paso 2: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre: `Portafolio` (o el que prefieras)
3. Descripción: "Proyecto Integrador de IA - Muralismo & Tecnología"
4. Haz público
5. Presiona "Create repository"

### Paso 3: Conectar y subir

```bash
git remote add origin https://github.com/pablor810r/Portafolio.git
git branch -M main
git push -u origin main
```

### Paso 4: Desplegar en Netlify (Gratis)

1. Ve a https://app.netlify.com
2. "Add new site" → "Deploy manually"
3. Arrastra la carpeta completa del proyecto
4. ¡Listo! Tu sitio está en vivo

---

## 📋 Checklist Final

Antes de entregar, verifica:

- [x] Portafolio web funciona (con todas las fotos)
- [x] Chatbot IA responde correctamente
- [x] Presentación PechaKucha (presentacion.html) abre sin errores
- [x] Modelo ML (ml_model.html) funciona
- [x] Las 3 fotos están en buena calidad
- [x] Video grabado y exportado como MP4
- [x] README.md actualizado
- [x] Repositorio publicado en GitHub

---

## 📝 Contenido del Proyecto

| Archivo | Propósito |
|---------|-----------|
| `index.html` | Página principal del portafolio |
| `presentacion.html` | Presentación PechaKucha (20 diapositivas) |
| `ml_model.html` | Demo interactiva del modelo IA |
| `chatbot.js` | Motor de chatbot mejorado |
| `app.js` | Lógica de galería y navegación |
| `data.json` | Base de datos de obras y portfolio |
| `modelo_ml.ipynb` | Notebook del modelo TF-IDF + k-NN |
| `portafolio_video.html` | Presentación para grabar como video |
| `images/` | Carpeta con todas las fotos |

---

## 🎯 Tecnología Utilizada

- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Responsivo:** Tailwind CSS + media queries
- **ML:** TF-IDF + k-NN (KNeighborsClassifier, k=3)
- **IA:** Chatbot con intención detection y fallback local
- **Datos:** JSON + localStorage
- **Hosting:** Netlify / Vercel (gratis)

---

## 📞 Contacto

Si tienes dudas, contacta a:
- Email: tu@email.com
- WhatsApp: +57 (tu número)
- Portfolio web: https://tudominio.netlify.app

---

**¡Listo para entregar! 🎉**

Creado: 1 de septiembre de 2026
Proyecto: PABLOR/BLOR - Integrador de IA
