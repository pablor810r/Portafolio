#!/usr/bin/env python3
"""
Script para actualizar index.html con srcset, WebP y optimizaciones
"""
import re
from pathlib import Path

def update_index_html():
    """
    Actualiza todas las referencias de imágenes con srcset y WebP
    """
    html_path = Path('index.html')
    content = html_path.read_text(encoding='utf-8')
    
    # Mapa de actualizaciones: original → nuevas referencias con srcset
    # Formato: src original → (src optimizado, srcset, fallback)
    
    replacements = [
        # Muralismo urbano
        {
            'find': r'<img src="images/arte_urbano/argelia\.jpg"',
            'replace': '<img src="images/arte_urbano/argelia.webp" srcset="images/arte_urbano/argelia_opt.jpg 1x, images/arte_urbano/argelia.webp 1x"'
        },
        {
            'find': r'<img src="images/arte_urbano/babilla_altamira\.jpg"',
            'replace': '<img src="images/arte_urbano/babilla_altamira.webp" srcset="images/arte_urbano/babilla_altamira_opt.jpg 1x, images/arte_urbano/babilla_altamira.webp 1x"'
        },
        {
            'find': r'<img src="images/arte_urbano/soberania\.jpg"',
            'replace': '<img src="images/arte_urbano/soberania.webp" srcset="images/arte_urbano/soberania_opt.jpg 1x, images/arte_urbano/soberania.webp 1x"'
        },
        {
            'find': r'<img src="images/arte_urbano/mural_identidad_cultural_2024\.jpg"',
            'replace': '<img src="images/arte_urbano/mural_identidad_cultural_2024.webp" srcset="images/arte_urbano/mural_identidad_cultural_2024_opt.jpg 1x, images/arte_urbano/mural_identidad_cultural_2024.webp 1x"'
        },
        {
            'find': r'<img src="images/arte_urbano/cauca\.jpeg"',
            'replace': '<img src="images/arte_urbano/cauca.webp" srcset="images/arte_urbano/cauca_opt.jpg 1x, images/arte_urbano/cauca.webp 1x"'
        },
        
        # Digital
        {
            'find': r'<img src="images/digital/predigital_guardian_semilla\.jpg"',
            'replace': '<img src="images/digital/predigital_guardian_semilla.webp" srcset="images/digital/predigital_guardian_semilla_opt.jpg 1x, images/digital/predigital_guardian_semilla.webp 1x"'
        },
        
        # Thumbnails y videos
        {
            'find': r'poster="images/arte_urbano/video_thumbnail\.jpg"',
            'replace': 'poster="images/arte_urbano/video_thumbnail.jpg"'
        },
        {
            'find': r'<img src="images/arte_urbano/video_thumbnail\.jpg"',
            'replace': '<img src="images/arte_urbano/video_thumbnail.jpg" srcset="images/arte_urbano/video_thumbnail.jpg 1x"'
        },
        
        # Productos (placeholders)
        {
            'find': r'<img src="images/digital/producto_print_1\.jpg"',
            'replace': '<img src="images/digital/producto_print_1.jpg" loading="lazy"'
        },
        {
            'find': r'<img src="images/digital/producto_nft_1\.jpg"',
            'replace': '<img src="images/digital/producto_nft_1.jpg" loading="lazy"'
        },
        {
            'find': r'<img src="images/digital/producto_sticker\.jpg"',
            'replace': '<img src="images/digital/producto_sticker.jpg" loading="lazy"'
        },
    ]
    
    updated_content = content
    count = 0
    
    for replacement in replacements:
        pattern = replacement['find']
        replace_text = replacement['replace']
        
        # Usar sub con re.IGNORECASE para ser flexible
        updated_content, n = re.subn(
            pattern,
            replace_text,
            updated_content,
            flags=re.IGNORECASE
        )
        
        if n > 0:
            print(f"✓ Actualizado: {pattern.replace(r'\.', '.').split('/')[-1]} ({n} referencia(s))")
            count += n
    
    # Guardar cambios
    html_path.write_text(updated_content, encoding='utf-8')
    
    print(f"\n✓ {count} referencia(s) de imágenes actualizada(s) en index.html")
    return count > 0

if __name__ == '__main__':
    print("=" * 100)
    print("ACTUALIZANDO INDEX.HTML CON SRCSET Y WEBP")
    print("=" * 100 + "\n")
    
    update_index_html()
    print("\n✓ Proceso completado")
