# 📸 Guía: Cómo Agregar Imágenes al Portafolio

## 🎯 Proceso Rápido (3 pasos)

### **Paso 1: Copia la imagen a la carpeta correcta**
```
images/
├── arte_urbano/     → Murales y trabajos callejeros (BLOR)
├── digital/         → Ilustraciones digitales (PABLOR)
├── plastica/        → Óleos, carboncillo, académicos
└── tech/            → Proyectos técnicos
```

### **Paso 2: Optimiza la imagen (IMPORTANTE)**
Crea 3 versiones:
```bash
cd /workspaces/Portafolio
python3 optimize_images.py
```

Esto genera automáticamente:
- `nombre.jpg` (original)
- `nombre.webp` (optimizado - ligero)
- `nombre_opt.jpg` (thumbnail - muy ligero)

### **Paso 3: Agrega a `data.json`**
Abre `data.json` y agrega un objeto en el array `"works"`:

```json
{
  "id": "id_unico_sin_espacios",
  "title": "Nombre de la Obra",
  "category": "urbano|digital|plastica|academico|proceso",
  "image": "images/carpeta/archivo.jpg",
  "imageWebp": "images/carpeta/archivo.webp",
  "thumbnail": "images/carpeta/archivo_opt.jpg",
  "date": "YYYY",
  "location": "Ciudad, País",
  "technique": "Óleo, Aerosol, Digital, etc",
  "size": "Dimensiones",
  "description": "Descripción breve de la obra",
  "price": 0,
  "status": "exposicion|disponible|proceso",
  "featured": true|false,
  "order": 25
}
```

---

## 📋 Referencia Completa de Campos

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| **id** | string | Identificador único | `"mural_nuevo_2024"` |
| **title** | string | Nombre de la obra | `"Mural Identidad"` |
| **category** | string | Clasificación | `"urbano"`, `"digital"`, `"plastica"`, `"academico"`, `"proceso"` |
| **image** | string | Ruta JPG | `"images/arte_urbano/mural.jpg"` |
| **imageWebp** | string | Ruta WebP (optimizado) | `"images/arte_urbano/mural.webp"` |
| **thumbnail** | string | Ruta thumbnail | `"images/arte_urbano/mural_opt.jpg"` |
| **date** | string | Año | `"2024"` |
| **location** | string | Ubicación | `"Medellín, Colombia"` |
| **technique** | string | Técnica usada | `"Aerosol y Acrílico"` |
| **size** | string | Tamaño/Dimensiones | `"Mural 10x8m"` o `"80x60cm"` |
| **description** | string | Descripción breve | `"Obra sobre identidad cultural..."` |
| **price** | number | Precio en pesos COP | `750000` o `0` si no venta |
| **status** | string | Estado | `"exposicion"`, `"disponible"`, `"proceso"` |
| **featured** | boolean | ¿Destacada en galería? | `true` o `false` |
| **order** | number | Orden en galería | `1`, `2`, `3`... |

---

## 🎨 Categorías Explicadas

```javascript
"category": "urbano"      // BLOR - Murales y arte callejero
"category": "digital"     // PABLOR - Ilustraciones digitales
"category": "plastica"    // Óleos, carboncillos, académicos
"category": "academico"   // Trabajos académicos formales
"category": "proceso"     // Documentación de proceso creativo
```

---

## 💰 Estados y Precios

```javascript
"status": "exposicion"   // Obra en exposición (no venta) → price: 0
"status": "disponible"   // Obra disponible para compra → price: número
"status": "proceso"      // Obra en desarrollo/documentación → price: 0
```

---

## 📸 Ejemplo Completo

```json
{
  "id": "mural_flores_urbanas_2024",
  "title": "Mural Flores Urbanas",
  "category": "urbano",
  "image": "images/arte_urbano/mural_flores_2024.jpg",
  "imageWebp": "images/arte_urbano/mural_flores_2024.webp",
  "thumbnail": "images/arte_urbano/mural_flores_2024_opt.jpg",
  "date": "2024",
  "location": "Cali, Colombia - Barrio San Antonio",
  "technique": "Aerosol, acrílico y tinta",
  "size": "Mural 15x12m",
  "description": "Intervención urbana con motivos florales ancestrales. Colaboración comunitaria en barrio San Antonio, Cali.",
  "price": 0,
  "status": "exposicion",
  "featured": true,
  "order": 25
}
```

---

## ⚠️ Errores Comunes

| Error | Solución |
|-------|----------|
| Imagen muy pesada | Ejecuta `optimize_images.py` |
| Rutas con espacios | Usa guiones: `mural_flores` NO `mural flores` |
| JSON inválido | Verifica comas y comillas con validador JSON |
| Images no aparecen | Comprueba que las rutas en `data.json` existan en carpeta |

---

## 🚀 Validar Cambios

Después de agregar:

```bash
# Validar JSON
python3 -c "import json; json.load(open('data.json')); print('✅ JSON válido')"

# Ver galería actualizada
# Abre index.html en navegador → Ver Portafolio
```

---

## 📂 Estructura de Archivo Mínima

Para CADA imagen necesitas:
```
✅ archivo.jpg          (original)
✅ archivo.webp         (optimizado)
✅ archivo_opt.jpg      (thumbnail)
✅ Entrada en data.json
```

---

## 🎯 Checklist Rápido

- [ ] Imagen en carpeta correcta (`images/categoria/`)
- [ ] 3 versiones generadas (jpg, webp, _opt.jpg)
- [ ] ID único en data.json (sin espacios, sin acentos)
- [ ] Todos los campos completados
- [ ] JSON válido (sin errores de sintaxis)
- [ ] Orden incrementado (previous_order + 1)
- [ ] Featured: true/false según corresponda
- [ ] Price correcto (0 si no venta)

---

## 💡 Pro Tips

### Agregar múltiples imágenes rápido:
```bash
# 1. Arrastra archivos a images/carpeta/
# 2. optimize_images.py procesa todas
# 3. Copia el bloque JSON y modifica solo id, title, date, description
```

### Cambiar orden en galería:
Simplemente ajusta el valor `"order"` (1, 2, 3, 4...)

### Cambiar destacadas:
`"featured": true` aparece primero en galería

### Prices para diferentes locales:
```json
"price": 750000        // COP (Colombia)
"price": 185          // USD (aprox)
"price": 0.5          // ETH (para NFTs)
```
