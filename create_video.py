#!/usr/bin/env python3
"""
Script para crear un video compilado del portafolio PABLOR/BLOR
Genera un video de 2-3 minutos con 3 fotos + transiciones
"""

import os
import subprocess
import tempfile
from pathlib import Path

# Directorio del proyecto
PROJECT_DIR = Path(__file__).parent
IMAGES_DIR = PROJECT_DIR / "images"
OUTPUT_VIDEO = PROJECT_DIR / "PABLOR_BLOR_Portafolio.mp4"

# Las 3 fotos principales
IMAGES = [
    IMAGES_DIR / "arte_urbano" / "mural_simbolo_ancestral_2024.jpg",
    IMAGES_DIR / "digital" / "predigital_guardian_semilla.jpg",
    IMAGES_DIR / "plastica" / "detalle_estudio_pintura_oleo_napoleon_cruzando_los_alpes.jpg"
]

# Textos para cada foto (descripción breve)
TEXTS = [
    "PABLOR / BLOR\nArte Urbano • Muralismo",
    "Arte Digital\nTécnica & Tecnología",
    "Plástica\nPintura • Dibujo • Escultura"
]

# Configuración del video
DURATION_PER_IMAGE = 40  # segundos por imagen
FPS = 30
RESOLUTION = "1920x1080"

def create_video():
    """Crear video usando ffmpeg"""
    
    print("🎬 Creando video del portafolio...")
    print(f"📁 Directorio de proyecto: {PROJECT_DIR}")
    
    # Verificar que las imágenes existan
    for img in IMAGES:
        if not img.exists():
            print(f"⚠️  Advertencia: {img} no encontrada")
            return False
    
    # Crear archivo de concat para ffmpeg
    concat_file = tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False)
    
    for img in IMAGES:
        # Escapar ruta para ffmpeg
        safe_path = str(img).replace("'", "'\\''")
        concat_file.write(f"file '{safe_path}'\n")
        concat_file.write(f"duration {DURATION_PER_IMAGE}\n")
    
    concat_file.close()
    
    try:
        # Intentar crear el video con ffmpeg
        cmd = [
            'ffmpeg', '-f', 'concat', '-safe', '0', '-i', concat_file.name,
            '-pix_fmt', 'yuv420p',
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-crf', '23',
            '-vf', f'scale={RESOLUTION}',
            '-y',
            str(OUTPUT_VIDEO)
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"✅ Video creado: {OUTPUT_VIDEO}")
            print(f"📊 Duración: ~{DURATION_PER_IMAGE * len(IMAGES)} segundos")
            return True
        else:
            print(f"❌ Error al crear video con ffmpeg")
            print(result.stderr)
            return False
            
    except FileNotFoundError:
        print("❌ ffmpeg no está instalado")
        print("📝 Alternativamente: Abre presentacion.html en tu navegador y graba con OBS (Open Broadcaster Software)")
        return False
    finally:
        os.unlink(concat_file.name)

def create_alternative_html():
    """Crear HTML alternativo que se pueda grabar con OBS"""
    
    html_content = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PABLOR/BLOR - Video Portafolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #0a0e27;
            color: white;
            font-family: 'Arial', sans-serif;
            overflow: hidden;
        }
        .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
        }
        .slide {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.5s ease;
            background-size: cover;
            background-position: center;
        }
        .slide.active {
            opacity: 1;
        }
        .overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .content {
            text-align: center;
            z-index: 10;
        }
        .content h1 {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }
        .content p {
            font-size: 2rem;
            color: #00f2ff;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }
        .counter {
            position: fixed;
            top: 40px;
            right: 40px;
            font-size: 1.5rem;
            color: #00f2ff;
            z-index: 20;
        }
        .progress {
            position: fixed;
            bottom: 0;
            left: 0;
            height: 4px;
            background: #00f2ff;
            width: 0%;
            transition: width 0.1s linear;
            z-index: 20;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="slide active" id="slide-0" style="background-image: url('images/arte_urbano/mural_simbolo_ancestral_2024.jpg');">
            <div class="overlay">
                <div class="content">
                    <h1>PABLOR / BLOR</h1>
                    <p>Arte Urbano • Muralismo</p>
                </div>
            </div>
        </div>
        
        <div class="slide" id="slide-1" style="background-image: url('images/digital/predigital_guardian_semilla.jpg');">
            <div class="overlay">
                <div class="content">
                    <h1>Arte Digital</h1>
                    <p>Técnica & Tecnología</p>
                </div>
            </div>
        </div>
        
        <div class="slide" id="slide-2" style="background-image: url('images/plastica/estudio_pintura_oleo_napoleon_cruzando_los_alpes.jpg');">
            <div class="overlay">
                <div class="content">
                    <h1>Plástica</h1>
                    <p>Pintura • Dibujo • Escultura</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="counter"><span id="current">1</span> / 3</div>
    <div class="progress" id="progress"></div>
    
    <script>
        const slides = document.querySelectorAll('.slide');
        const SLIDE_DURATION = 40000; // 40 segundos por slide
        let currentSlide = 0;
        let startTime = Date.now();
        
        function updateSlides() {
            const elapsed = Date.now() - startTime;
            const progress = (elapsed % (SLIDE_DURATION * slides.length)) / (SLIDE_DURATION * slides.length) * 100;
            
            document.getElementById('progress').style.width = progress + '%';
            
            const newSlide = Math.floor((elapsed / SLIDE_DURATION) % slides.length);
            
            if (newSlide !== currentSlide) {
                slides[currentSlide].classList.remove('active');
                slides[newSlide].classList.add('active');
                document.getElementById('current').textContent = newSlide + 1;
                currentSlide = newSlide;
            }
            
            requestAnimationFrame(updateSlides);
        }
        
        updateSlides();
    </script>
</body>
</html>
'''
    
    output_file = PROJECT_DIR / "portafolio_video.html"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"\n✅ HTML de video creado: {output_file}")
    print("\n📝 INSTRUCCIONES PARA GRABAR:")
    print("1. Abre el archivo en tu navegador")
    print("2. Descarga OBS Studio (gratis): https://obsproject.com")
    print("3. En OBS, crea una nueva escena")
    print("4. Agrega una fuente de navegador y copia la URL del HTML")
    print("5. Configura resolución 1920x1080 @ 30fps")
    print("6. Presiona Grabar durante 2-3 minutos")
    print("7. ¡Listo para subir!")
    
    return output_file

if __name__ == "__main__":
    # Intentar crear video con ffmpeg
    if create_video():
        pass
    else:
        print("\n" + "="*60)
        print("ALTERNATIVA: HTML para grabar con OBS")
        print("="*60)
        create_alternative_html()
