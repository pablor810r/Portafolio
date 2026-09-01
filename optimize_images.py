#!/usr/bin/env python3
"""
Script para optimizar imágenes JPG/PNG y generar versiones WebP
"""
import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Instalando Pillow...")
    os.system("pip install -q Pillow")
    from PIL import Image

def optimize_image(input_path, output_path, quality=75, max_width=1920):
    """
    Optimiza una imagen: reduce tamaño, comprime, y preserva proporción
    """
    try:
        with Image.open(input_path) as img:
            # Convertir RGBA a RGB si es necesario (para JPG)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Si tiene transparencia, conservarla con WebP
                pass
            
            # Redimensionar si es muy grande
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Guardar optimizado
            if output_path.endswith('.webp'):
                # WebP con calidad moderada
                img.save(output_path, 'WEBP', quality=quality, method=6)
            elif output_path.endswith('.jpg') or output_path.endswith('.jpeg'):
                # JPG con fondo blanco si tiene transparencia
                if img.mode == 'RGBA':
                    bg = Image.new('RGB', img.size, (255, 255, 255))
                    bg.paste(img, mask=img.split()[3])
                    bg.save(output_path, 'JPEG', quality=quality, optimize=True)
                else:
                    img.save(output_path, 'JPEG', quality=quality, optimize=True)
            else:
                img.save(output_path, quality=quality, optimize=True)
            
            orig_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            ratio = (1 - new_size / orig_size) * 100
            print(f"✓ {Path(input_path).name:50} → {Path(output_path).name:30} (-{ratio:.1f}%)")
            return True
    except Exception as e:
        print(f"✗ Error en {input_path}: {e}")
        return False

def create_thumbnail(input_path, output_path, size=300):
    """
    Crea un thumbnail de una imagen
    """
    try:
        with Image.open(input_path) as img:
            img.thumbnail((size, size), Image.Resampling.LANCZOS)
            img.save(output_path, 'JPEG', quality=70, optimize=True)
            print(f"✓ Thumbnail creado: {Path(output_path).name}")
            return True
    except Exception as e:
        print(f"✗ Error creando thumbnail en {input_path}: {e}")
        return False

def create_placeholder(output_path, size=(800, 600), color=(20, 30, 50)):
    """
    Crea un placeholder simple en caso de imagen faltante
    """
    try:
        img = Image.new('RGB', size, color=color)
        img.save(output_path, 'JPEG', quality=50, optimize=True)
        print(f"✓ Placeholder creado: {Path(output_path).name}")
        return True
    except Exception as e:
        print(f"✗ Error creando placeholder: {e}")
        return False

def main():
    images_dir = Path('images')
    
    print("=" * 100)
    print("OPTIMIZANDO IMÁGENES Y GENERANDO WEBP")
    print("=" * 100)
    
    # Procesar todas las imágenes en subdirectorios
    for img_file in images_dir.rglob('*.jpg'):
        if img_file.name.endswith('.webp'):
            continue
        # Generar versión optimizada JPG
        output_jpg = img_file.parent / f"{img_file.stem}_opt.jpg"
        optimize_image(str(img_file), str(output_jpg), quality=78)
        
        # Generar versión WebP
        output_webp = img_file.parent / f"{img_file.stem}.webp"
        optimize_image(str(img_file), str(output_webp), quality=75)
    
    for img_file in images_dir.rglob('*.jpeg'):
        output_jpg = img_file.parent / f"{img_file.stem}_opt.jpg"
        optimize_image(str(img_file), str(output_jpg), quality=78)
        
        output_webp = img_file.parent / f"{img_file.stem}.webp"
        optimize_image(str(img_file), str(output_webp), quality=75)
    
    for img_file in images_dir.rglob('*.png'):
        output_webp = img_file.parent / f"{img_file.stem}.webp"
        optimize_image(str(img_file), str(output_webp), quality=75)
    
    print("\n" + "=" * 100)
    print("CREANDO THUMBNAILS Y PLACEHOLDERS")
    print("=" * 100)
    
    # Crear thumbnail para video
    video_src = images_dir / 'arte_urbano' / 'video_proceso_mural_2024.mp4'
    video_thumb = images_dir / 'arte_urbano' / 'video_thumbnail.jpg'
    if not video_thumb.exists():
        # Si no existe, copiar una imagen existente como base
        src_img = images_dir / 'arte_urbano' / 'proceso_mural_estudio_2024.jpg'
        if src_img.exists():
            create_thumbnail(str(src_img), str(video_thumb), size=400)
        else:
            create_placeholder(str(video_thumb), size=(800, 600))
    
    # Crear placeholders para productos faltantes
    missing_images = [
        'images/digital/producto_print_1.jpg',
        'images/digital/producto_nft_1.jpg',
        'images/digital/producto_sticker.jpg',
    ]
    
    for missing in missing_images:
        path = Path(missing)
        if not path.exists():
            path.parent.mkdir(parents=True, exist_ok=True)
            create_placeholder(str(path), size=(800, 600), color=(30, 40, 60))
    
    print("\n" + "=" * 100)
    print("PROCESO COMPLETADO")
    print("=" * 100)

if __name__ == '__main__':
    main()
