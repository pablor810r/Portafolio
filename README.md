# PABLOR/BLOR - Proyecto integrador de IA

Portafolio web funcional para demostrar una solución digital apoyada en IA: arte urbano, arte digital, educación, chatbot, automatización y un modelo de clasificación.

## Entrega rápida

```bash
python3 -m http.server 8000
```

- Sitio principal: `http://localhost:8000/index.html`
- Demo del modelo ML: `http://localhost:8000/ml_model.html`
- Notebook ejecutable: `modelo_ml.ipynb`
- Panel administrativo: `http://localhost:8000/admin.html`

## Matriz de requisitos

| Requisito | Evidencia en el proyecto |
| --- | --- |
| Identidad | PABLOR/BLOR, slogan, misión y visión en la sección `Proyecto IA` de `index.html` |
| Portafolio | Galería dinámica desde `data.json`, con obras, imágenes, descripción y categorías |
| Mínimo 5 elementos | Más de 5 obras en urbano, digital, académico y proceso, además de secciones de servicios, propuesta IA y contacto |
| Multimedia con IA | Video timelapse `images/arte_urbano/video_proceso_mural_2024.mp4` integrado en la página |
| Chatbot | Agente local `IA Agent`, con respuestas sobre obras, servicios, empresa y contacto |
| Automatización | Formulario de contacto: registra el lead en `localStorage`, asigna estado de seguimiento y abre WhatsApp |
| IA generativa | Textos de marca, arte visual, video de proceso y código asistidos con herramientas generativas |
| Machine Learning | `modelo_ml.ipynb` y `ml_model.html`: dataset, k-NN, predicción, exactitud y gráfica |

## Cómo demostrarlo en 3 minutos

1. Presentar la sección `Proyecto IA` y explicar el problema: orientar solicitudes artísticas y facilitar el contacto.
3. Mostrar la galería, la narrativa del proyecto y reproducir el video del proceso creativo.
4. Abrir `IA Agent` y preguntar por un mural, un servicio o el contacto.
4. Completar el formulario; mostrar el mensaje de automatización y revisar `localStorage` con la clave `pablor_leads`.
5. Abrir `ml_model.html`, cambiar la solicitud y enseñar la predicción, el dataset y la gráfica.
6. Ejecutar `modelo_ml.ipynb` para mostrar la alternativa académica con `scikit-learn`.

## 1. IA Generativa
* **Diseño y Maquetación:** Uso de modelos generativos para la estructuración de la interfaz (`admin.html` e `index.html`) y la definición del sistema de diseño basado en variables CSS (`--neon-orange`, `--neon-blue`).
* **Textos:** generación y edición de descripciones, slogan, misión, visión y respuestas del asistente.
* **Imágenes y video:** los assets visuales y el timelapse forman parte de la presentación multimedia del proyecto.

## 2. Automatización
Procesos de backend y optimización ejecutados mediante scripts de Python:
* `optimize_images.py`: Reducción y optimización automática de assets multimedia.
* `process_video.py`: Procesamiento y gestión de archivos de video para la plataforma.
* `update_html.py`: Sincronización dinámica de la estructura HTML con la base de datos local.

## 3. Agentes y Asistentes de Desarrollo
* Utilización de asistentes basados en LLMs (Copilot / VS Code Agents) para refactorización de código JavaScript (`app.js`), auditoría de seguridad y detección de errores sintácticos.

## 4. Machine Learning y Procesamiento Inteligente
* `modelo_ml.ipynb` contiene un dataset de 12 solicitudes, vectorización TF-IDF, un clasificador k-NN con `k=3`, exactitud y matriz de confusión.
* `ml_model.html` ofrece la misma idea sin instalar dependencias: permite escribir una solicitud, calcular similitud coseno, clasificarla y visualizar el resultado.
* El modelo es demostrativo; para producción se ampliaría el dataset con solicitudes anonimizadas y validación cruzada.

## 5. Automatización demostrable

El flujo implementado en el formulario es: `usuario envía formulario` → `se valida y registra el lead` → `se guarda en localStorage como pendiente_de_contacto` → `se abre un mensaje prellenado de WhatsApp` → `se muestra confirmación en pantalla`. En una publicación con backend, este mismo evento puede conectarse a n8n, Google Sheets o EmailJS sin cambiar la interfaz.

## 6. Aplicación Real y Despliegue
* **Entregables:** Sistema web administrativo funcional.
* **Documentación Estratégica:** `MONETIZATION.md`, `REPORTE_LANZAMIENTO.md` y `QUICKSTART.md`.
