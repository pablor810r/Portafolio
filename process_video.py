#!/usr/bin/env python3
"""
Script para quitar audio del video usando ffmpeg
"""
import os
import subprocess
import sys
from pathlib import Path

def remove_audio_from_video(input_path, output_path):
    """
    Quita el audio del video usando ffmpeg
    """
    if not Path(input_path).exists():
        print(f"✗ Archivo no encontrado: {input_path}")
        return False
    
    # Intenta ejecutar ffmpeg
    try:
        # Comando: quitar audio pero conservar video con máxima calidad
        cmd = [
            'ffmpeg',
            '-i', input_path,
            '-c:v', 'libx264',          # Codec video H.264
            '-crf', '18',               # Calidad alta (0-51, menor = mejor)
            '-preset', 'faster',        # Velocidad encoding
            '-an',                      # Sin audio (-an)
            '-y',                       # Overwrite sin preguntar
            output_path
        ]
        
        print(f"Procesando video: {Path(input_path).name}")
        print(f"Comando: {' '.join(cmd)}\n")
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            print(f"✗ Error ffmpeg:\n{result.stderr}")
            return False
        
        # Obtener tamaños
        orig_size = os.path.getsize(input_path) / (1024 * 1024)
        new_size = os.path.getsize(output_path) / (1024 * 1024)
        reduction = ((orig_size - new_size) / orig_size) * 100
        
        print(f"✓ Video procesado exitosamente")
        print(f"  Original: {orig_size:.1f} MB")
        print(f"  Optimizado: {new_size:.1f} MB")
        print(f"  Reducción: {reduction:.1f}%")
        
        return True
        
    except FileNotFoundError:
        print("✗ ffmpeg no está instalado.")
        print("\nPara quitar audio del video, ejecuta localmente:")
        print(f"  ffmpeg -i {input_path} -c:v libx264 -crf 18 -preset faster -an {output_path}")
        return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def main():
    video_path = 'images/arte_urbano/video_proceso_mural_2024.mp4'
    output_path = 'images/arte_urbano/video_proceso_mural_2024_no_audio.mp4'
    
    print("=" * 100)
    print("OPTIMIZANDO VIDEO - QUITAR AUDIO")
    print("=" * 100 + "\n")
    
    if remove_audio_from_video(video_path, output_path):
        print("\n✓ Puedes reemplazar el original o usar la versión sin audio.")
        print(f"  Original: {video_path}")
        print(f"  Sin audio: {output_path}")
    else:
        print("\nℹ Nota: procesa el video localmente con ffmpeg si es crítico.")
        print("El video original será usado en el portafolio por ahora.")

if __name__ == '__main__':
    main()
