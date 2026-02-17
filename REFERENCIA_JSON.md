# 🎯 Referencia Rápida - Estructura JSON

## **Aquí están TODAS tus imágenes cargadas:**

### 📊 Resumen Actual
- ✅ **14 obras** de arte urbano (BLOR)
- ✅ **4 obras** digitales (PABLOR) 
- ✅ **5 obras** de plástica (óleos, carboncillos)
- ✅ **1 obra** académica
- **Total: 24 obras** en el portafolio

---

## 📋 Estructura JSON Minimal

```json
{
  "id": "id_unico_sin_espacios",           // ← Identificador único
  "title": "Nombre de la Obra",             // ← Cómo aparece en galería
  "category": "urbano",                     // ← urbano|digital|plastica|academico|proceso
  "image": "images/arte_urbano/archivo.jpg", // ← Ruta JPG original
  "imageWebp": "images/arte_urbano/archivo.webp", // ← Ruta WebP optimizado
  "thumbnail": "images/arte_urbano/archivo_opt.jpg", // ← Thumbnail mini
  "date": "2024",                           // ← Año
  "location": "Medellín, Colombia",         // ← Ubicación
  "technique": "Aerosol y acrílico",        // ← Técnica usada
  "size": "Mural 10x8m",                    // ← Tamaño
  "description": "Descripción corta...",    // ← Texto que ve cliente
  "price": 0,                               // ← 0 = no venta, número = precio COP
  "status": "exposicion",                   // ← exposicion|disponible|proceso
  "featured": true,                         // ← true = destacada|false = normal
  "order": 1                                // ← Posición en galería
}
```

---

## 🎨 Ejemplo Real de tu Portafolio

### Obra Urbana
```json
{
  "id": "argelia",
  "title": "Mural Argelia",
  "category": "urbano",  ← tipo BLOR
  "image": "images/arte_urbano/argelia.jpg",
  "imageWebp": "images/arte_urbano/argelia.webp",
  "thumbnail": "images/arte_urbano/argelia_opt.jpg",
  "date": "2023",
  "location": "Medellín, Colombia - Barrio Argelia",
  "technique": "Técnica mixta sobre muro",
  "size": "Mural 8x12m",
  "description": "Intervención urbana en el barrio Argelia, Medellín...",
  "price": 0,            ← No a la venta
  "status": "exposicion",
  "featured": true,
  "order": 1
}
```

### Obra Digital
```json
{
  "id": "predigital_guardian_semilla",
  "title": "Guardián de Semilla - Digital",
  "category": "digital",  ← tipo PABLOR
  "image": "images/digital/predigital_guardian_semilla.jpg",
  "imageWebp": "images/digital/predigital_guardian_semilla.webp",
  "thumbnail": "images/digital/predigital_guardian_semilla_opt.jpg",
  "date": "2024",
  "location": "Digital",
  "technique": "Ilustración digital - Procreate",
  "size": "4000x3000px",
  "description": "Ilustración digital explorando...",
  "price": 750000,       ← A la venta en COP
  "status": "disponible",
  "featured": true,
  "order": 21
}
```

### Obra de Plástica
```json
{
  "id": "estudio_pintura_napoleon",
  "title": "Estudio Pintura - Napoleón Cruzando los Alpes",
  "category": "plastica",    ← Óleos, carboncillos, etc
  "image": "images/plastica/estudio_pintura_oleo_napoleon_cruzando_los_alpes_2020.jpg",
  "imageWebp": "images/plastica/estudio_pintura_oleo_napoleon_cruzando_los_alpes_2020.webp",
  "thumbnail": "images/plastica/estudio_pintura_oleo_napoleon_cruzando_los_alpes_2020_opt.jpg",
  "date": "2020",
  "location": "Estudio - Medellín",
  "technique": "Óleo sobre lienzo",
  "size": "100x80cm",
  "description": "Estudio académico de composición histórica...",
  "price": 1200000,      ← Precio en COP
  "status": "disponible",
  "featured": true,
  "order": 16
}
```

---

## 🚀 Guía de Campos por Tipo

### **category** (Categoría)
```javascript
"urbano"     → BLOR - Murales, graffiti, arte callejero
"digital"    → PABLOR - Ilustraciones digitales, NFTs
"plastica"   → Óleos, carboncillos, académicos
"academico"  → Trabajos académicos formales
"proceso"    → Documentación de proceso creativo
```

### **status** (Estado)
```javascript
"exposicion"  → Obra en exposición (NO se vende) → price: 0
"disponible"  → Obra disponible para compra → price: número
"proceso"     → En desarrollo → price: 0
```

### **featured** (¿Destacada?)
```javascript
true   → Aparece primero en galería (máximo recomendado: 5-6)
false  → Aparece después en orden normal
```

### **price** (Precio)
```javascript
0              → No a la venta
750000         → COP (pesos colombianos)
1200000        → Precio más alto
0.5            → Para NFTs (en ETH o crypto)
```

---

## 📝 Paso a Paso para Agregar una Imagen Nueva

### 1️⃣ Copia el archivo
```
Archivo.jpg → images/categoria/archivo.jpg
```

### 2️⃣ Optimiza (genera 3 versiones)
```bash
python3 optimize_images.py
```
Resulta en:
```
✅ images/categoria/archivo.jpg       (original)
✅ images/categoria/archivo.webp      (ligero)
✅ images/categoria/archivo_opt.jpg   (thumbnail)
```

### 3️⃣ Abre `data.json` y busca `"works": [`

### 4️⃣ Al final del array (antes del `]`), agrega:
```json
,
{
  "id": "mi_obra_nueva_2024",
  "title": "Nombre Obra Nueva",
  "category": "digital",
  "image": "images/digital/archivo.jpg",
  "imageWebp": "images/digital/archivo.webp",
  "thumbnail": "images/digital/archivo_opt.jpg",
  "date": "2024",
  "location": "Mi ubicación",
  "technique": "Mi técnica",
  "size": "Mis dimensiones",
  "description": "Describe qué representa la obra...",
  "price": 600000,
  "status": "disponible",
  "featured": true,
  "order": 25
}
```

### 5️⃣ Guarda y valida
```bash
python3 -c "import json; json.load(open('data.json')); print('✅ JSON válido')"
```

---

## ⚡ Plantilla para Copiar/Pegar

```json
{
  "id": "",
  "title": "",
  "category": "urbano|digital|plastica|academico|proceso",
  "image": "images/categoria/archivo.jpg",
  "imageWebp": "images/categoria/archivo.webp",
  "thumbnail": "images/categoria/archivo_opt.jpg",
  "date": "2024",
  "location": "",
  "technique": "",
  "size": "",
  "description": "",
  "price": 0,
  "status": "exposicion|disponible|proceso",
  "featured": true,
  "order": 99
}
```

---

## ✅ Checklist Antes de Guardar

- [ ] **id**: Único, sin espacios, sin acentos (`mural_flores_2024`)
- [ ] **title**: Nombre bonito para galería (`Mural Flores Urbanas`)
- [ ] **category**: Una de las 5 categorías
- [ ] **image/imageWebp/thumbnail**: Rutas exactas que existen
- [ ] **date**: Año correcto (`2024`)
- [ ] **location**: Ubicación real
- [ ] **technique**: Técnica usada
- [ ] **size**: Dimensiones o "Mural 10x8m"
- [ ] **description**: Texto descriptivo (1-2 frases)
- [ ] **price**: 0 (no venta) o número (COP)
- [ ] **status**: Una de las 3 opciones
- [ ] **featured**: true o false
- [ ] **order**: Número incremental (último+1)
- [ ] **Coma después**: Si no es el último objeto, necesita coma `,`
- [ ] **JSON válido**: Ejecuta validador

---

## 🎯 Errores Más Comunes

| Problema | Solución |
|----------|----------|
| 💥 "JSON inválido" | Verifica comas al final de cada objeto (excepto el último) |
| 🖼️ Imagen no carga | Comprueba que la ruta en `image` existe en la carpeta |
| 🐌 Galería lenta | Usa `optimize_images.py` para crear WebPs |
| 📑 Duplicados en galería | Verifica que no hay dos IDs iguales |
| 🎨 Orden confuso | Incrementa `order` de forma secuencial: 1,2,3... |

---

## 🔧 Comandos Útiles

```bash
# Validar JSON completo
python3 -c "import json; json.load(open('data.json')); print('✅ JSON válido')"

# Contar obras por categoría
python3 -c "import json; d = json.load(open('data.json')); print(f'Urbano: {len([w for w in d[\"works\"] if w[\"category\"]==\"urbano\"])}'); print(f'Digital: {len([w for w in d[\"works\"] if w[\"category\"]==\"digital\"])}')"

# Optimizar nuevas imágenes
python3 optimize_images.py

# Ver estructura de una obra
python3 -c "import json; d = json.load(open('data.json')); print(json.dumps(d['works'][0], indent=2))"
```

---

## 🎓 Estructura Completa del `data.json`

```json
{
  "artist": { ... },      ← Información del artista
  "works": [ ... ],       ← Array de TODAS las obras
  "products": [ ... ],    ← Productos a vender (prints, NFTs, etc)
  "services": [ ... ]     ← Servicios profesionales
}
```

Tu portafolio está **100% funcional** y listo para monetizar. 🚀
