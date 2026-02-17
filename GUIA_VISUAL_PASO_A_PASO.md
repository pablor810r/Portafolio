# 🎨 GUÍA VISUAL: Cómo Agregar Imágenes (Super Fácil)

## 🚀 3 PASOS - 5 MINUTOS

---

## **PASO 1️⃣: Copia la imagen a la carpeta correcta**

### 📂 Estructura de carpetas:
```
Portafolio/
├── images/
│   ├── arte_urbano/     ← BLOR (murales, graffiti)
│   ├── digital/         ← PABLOR (ilustraciones digitales)
│   ├── plastica/        ← Óleos, carboncillos, académicos
│   └── tech/            ← Proyectos técnicos
├── data.json            ← AQUÍ se agregan las obras
├── index.html
└── ...
```

### 🎯 Ejemplo:
Tu nueva imagen se llama: `mi_mural_flores.jpg`

**Debes copiarla a:** `images/arte_urbano/mi_mural_flores.jpg`

---

## **PASO 2️⃣: Optimiza la imagen (AUTOMÁTICO)**

### 🔧 Ejecuta un comando:
```bash
cd /workspaces/Portafolio
python3 optimize_images.py
```

### ✨ Esto genera automáticamente 3 archivos:
```
✅ images/arte_urbano/mi_mural_flores.jpg       (original - 2.5MB)
✅ images/arte_urbano/mi_mural_flores.webp      (ligero - 600KB) ⭐
✅ images/arte_urbano/mi_mural_flores_opt.jpg   (thumbnail - 150KB) ⭐
```

**Punto importante:** Siempre necesitas las 3 versiones.

---

## **PASO 3️⃣: Agrega a `data.json`**

### 📝 Abre el archivo `data.json` en VS Code

### Busca esta línea:
```json
"works": [
```

### Ve al FINAL y busca el último objeto (busca el `]`):

```json
    {
      "id": "detalle_composicion",           ← Este es el ÚLTIMO
      "title": "Detalle Composición - Digital",
      ...
      "order": 24
    }
  ]   ← AQUÍ va tu nueva obra
]
```

### Antes del `]` final, AGREGA ESTO (con coma delante):

```json
    {
      "id": "detalle_composicion",
      "title": "Detalle Composición - Digital",
      ...
      "order": 24
    },
    {
      "id": "mi_mural_flores_2024",
      "title": "Mural Flores Urbanas",
      "category": "urbano",
      "image": "images/arte_urbano/mi_mural_flores.jpg",
      "imageWebp": "images/arte_urbano/mi_mural_flores.webp",
      "thumbnail": "images/arte_urbano/mi_mural_flores_opt.jpg",
      "date": "2024",
      "location": "Cali, Colombia",
      "technique": "Aerosol y acrílico",
      "size": "Mural 12x10m",
      "description": "Intervención urbana con motivos florales naturales",
      "price": 0,
      "status": "exposicion",
      "featured": true,
      "order": 25
    }
  ]
]
```

---

## 🎨 CAMPOS EXPLICADOS (Personalizables)

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| **id** | ID único (sin espacios) | `mi_mural_flores_2024` |
| **title** | Nombre para galería | `Mural Flores Urbanas` |
| **category** | Tipo de obra | `urbano` \| `digital` \| `plastica` |
| **image** | Ruta JPG original | `images/arte_urbano/mi_mural_flores.jpg` |
| **imageWebp** | Ruta WebP (copia igual pero .webp) | `images/arte_urbano/mi_mural_flores.webp` |
| **thumbnail** | Ruta thumbnail (copia con _opt.jpg) | `images/arte_urbano/mi_mural_flores_opt.jpg` |
| **date** | Año | `2024` |
| **location** | Dónde está | `Cali, Colombia - Barrio San Antonio` |
| **technique** | Cómo la hiciste | `Aerosol y acrílico` \| `Óleo` \| `Digital` |
| **size** | Tamaño | `Mural 12x10m` \| `80x60cm` \| `4000x3000px` |
| **description** | Descripción corta | Un párrafo sobre la obra |
| **price** | ¿Cuánto cuesta? | `0` (no venta) \| `750000` (COP) |
| **status** | ¿Está disponible? | `exposicion` \| `disponible` \| `proceso` |
| **featured** | ¿Destacada? | `true` (primero) \| `false` (después) |
| **order** | Posición en galería | `25` (siguiente número) |

---

## 🎯 CATEGORÍAS DISPONIBLES

```javascript
"category": "urbano"      // BLOR - Arte callejero, murales
"category": "digital"     // PABLOR - Ilustraciones digitales, NFTs
"category": "plastica"    // Óleos, carboncillos, académicos
"category": "academico"   // Trabajos académicos formales
"category": "proceso"     // Timelapse, documentación, process
```

---

## 💰 PRECIOS Y ESTADOS

### Si la obra NO es para venta:
```json
"price": 0,
"status": "exposicion"
```

### Si la obra ES para venta:
```json
"price": 750000,          ← COP (pesos colombianos)
"status": "disponible"
```

### Si está en proceso/documentación:
```json
"price": 0,
"status": "proceso"
```

---

## 🌟 DESTACADAS vs NORMALES

```json
"featured": true    ← Aparece primero, tiene efecto especial en galería
"featured": false   ← Aparece después en orden normal
```

**Consejo:** Máximo 5-6 destacadas por categoría.

---

## 🔢 ORDEN EN GALERÍA

El campo `"order"` controla dónde aparece:

```
order: 1  → Primera posición
order: 2  → Segunda posición
order: 3  → Tercera posición
...
order: 25 → Tu nueva obra
```

Simplemente incrementa el número: 1, 2, 3, 4, 5... 25, 26

---

## ✅ CHECKLIST FINAL ANTES DE GUARDAR

```
☐ Imagen en carpeta correcta (images/categoria/archivo.jpg)
☐ Ejecuté optimize_images.py (genera 3 archivos)
☐ Abrí data.json
☐ Encontré el array "works"
☐ Copié estructura JSON
☐ Cambié los valores:
  ☐ id: ID único
  ☐ title: Nombre bonito
  ☐ category: Correcta
  ☐ image: Ruta JPG
  ☐ imageWebp: Ruta WebP (misma ruta pero .webp)
  ☐ thumbnail: Ruta _opt.jpg
  ☐ date: Año correcto
  ☐ location: Ubicación real
  ☐ technique: Técnica usada
  ☐ size: Dimensiones
  ☐ description: Texto descriptivo
  ☐ price: 0 o número
  ☐ status: exposicion|disponible|proceso
  ☐ featured: true o false
  ☐ order: Número incremental
☐ Guardé data.json (Ctrl+S)
☐ Validé que JSON sea correcto ✅
```

---

## 🔍 VALIDAR QUE TODO ESTÉ BIEN

### Opción 1: Online (recomendado)
Abre https://jsonlint.com, copia tu data.json y pega

### Opción 2: Terminal
```bash
python3 -c "import json; json.load(open('data.json')); print('✅ JSON válido')"
```

Si ves **✅ JSON válido**, ¡LISTO!  
Si hay error, revisa **comas y comillas**.

---

## 📸 EJEMPLO COMPLETO (Copia y personaliza)

```json
{
  "id": "mural_nuevo_2024",
  "title": "Mi Nuevo Mural 2024",
  "category": "urbano",
  "image": "images/arte_urbano/mural_nuevo_2024.jpg",
  "imageWebp": "images/arte_urbano/mural_nuevo_2024.webp",
  "thumbnail": "images/arte_urbano/mural_nuevo_2024_opt.jpg",
  "date": "2024",
  "location": "Medellín, Colombia - Mi barrio",
  "technique": "Aerosol y acrílico",
  "size": "Mural 15x12m",
  "description": "Nueva intervención urbana explorando identidad y comunidad. Trabajo colaborativo con habitantes locales.",
  "price": 0,
  "status": "exposicion",
  "featured": true,
  "order": 25
}
```

---

## 🎓 FAQ - Preguntas Frecuentes

### **P: ¿Qué pasa si mi imagen es muy grande?**
R: Ejecuta `optimize_images.py` - automáticamente comprime a WebP.

### **P: ¿Necesito cambiar el nombre de la imagen?**
R: No obligatorio, pero usa nombres descriptivos y sin espacios.

### **P: ¿Puedo cambiar el orden después?**
R: Sí, simplemente cambia el número `"order"` en data.json.

### **P: ¿Cómo agrego muchas imágenes de una vez?**
R: Copia el bloque JSON, cambia id/title/date/description en cada uno.

### **P: ¿De qué tamaño debo optimizar?**
R: El script lo hace automático. JPG debe ser 1500-4000px.

### **P: ¿El precio puede cambiar?**
R: Sí, edita el número en `"price"` cualquier momento.

### **P: ¿Cómo veo la galería actualizada?**
R: Abre `index.html` en navegador → Portafolio → Busca tu obra.

---

## 🚨 ERRORES COMUNES

| Error | Problema | Solución |
|-------|----------|----------|
| ❌ `JSON inválido` | Falta coma | Cada objeto necesita `,` excepto el último |
| 🖼️ Imagen desaparece | Ruta mal escrita | Verifica que la ruta en `image` existe |
| 📑 Aparece duplicada | Mismo ID | Cada `id` debe ser ÚNICO |
| 🐌 Galería lenta | Imágenes pesadas | Ejecuta `optimize_images.py` |
| ⚠️ JSON no se abre | Sintaxis | Valida en jsonlint.com |

---

## 💡 CONSEJOS PRO

### 1. Usar nombre descriptivo para ID:
```javascript
"id": "mural_flores_cali_2024"    ✅ Bueno
"id": "work_123"                   ❌ Malo
```

### 2. Agrupar por carpeta inteligentemente:
```
images/arte_urbano/   → Todos los murales
images/digital/       → Todas las ilustraciones digitales
images/plastica/      → Todos los trabajos de plástica
```

### 3. Mantener JSON limpio:
Cada 5 obras nuevas, valida el JSON para evitar errores acumulados.

### 4. Documentar cambios:
Si cambias detalles, anota fecha de actualización en `description`:
```
"description": "Obra actualizada Nov 2024. Incluye nuevos detalles..."
```

---

## 🎯 PRÓXIMO PASO

Ya tienes:
✅ 24 obras catalogadas  
✅ Estructura JSON lista  
✅ Sistema de optimización automático  

**Próximo:**
1. Agrega nuevas imágenes cuando las tengas
2. Ejecuta `optimize_images.py`
3. Copia el bloque JSON de ejemplo
4. Personaliza y guarda

¡Así de simple! 🚀
