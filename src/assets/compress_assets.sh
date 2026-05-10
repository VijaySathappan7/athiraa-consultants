#!/bin/bash

# Create posters folder
mkdir -p images/posters

echo "Starting asset compression and optimization..."

# 1. Compress & Convert Videos
cd videos
for vid in *.mp4; do
  if [ -f "$vid" ]; then
    name="${vid%.*}"
    echo "Processing video: $name"
    
    # Extract first frame as high-quality WebP poster
    echo " -> Extracting static poster frame..."
    ffmpeg -y -i "$vid" -ss 00:00:00 -vframes 1 -f image2 -vcodec libwebp -q:v 75 "../images/posters/${name}.webp"
    
    # Determine custom scaling logic to scale height to 720px while ensuring width is divisible by 2
    # For animationlogo.mp4 which is square (1920x1920), let's scale it to 720x720 instead of 720p height
    if [ "$name" == "animationlogo" ]; then
      scale_filter="scale=720:720"
    else
      scale_filter="scale='trunc(iw*720/ih/2)*2':720"
    fi

    # Compress MP4 (H.264, CRF 30, no audio)
    echo " -> Compressing MP4..."
    ffmpeg -y -i "$vid" -vcodec libx264 -crf 30 -preset medium -vf "$scale_filter" -an "temp_${name}.mp4"
    
    # Generate high-efficiency WebM VP9 (CRF 38, no audio)
    echo " -> Generating high-efficiency WebM fallback..."
    ffmpeg -y -i "$vid" -vcodec libvpx-vp9 -b:v 0 -crf 38 -vf "$scale_filter" -an "${name}.webm"
    
    # Replace original MP4
    mv "temp_${name}.mp4" "$vid"
    echo " -> Finished $name"
  fi
done
cd ..

# 2. Compress Heavy WebP Images (> 120 KB)
echo "Compressing heavy WebP images..."
cd images
for img in *.webp; do
  if [ -f "$img" ]; then
    size=$(wc -c <"$img")
    # If image is larger than 120,000 bytes (120 KB), compress it
    if [ $size -gt 120000 ]; then
      echo " -> Compressing heavy image: $img ($(expr $size / 1024) KB)..."
      ffmpeg -y -i "$img" -vcodec libwebp -q:v 72 "temp_$img"
      mv "temp_$img" "$img"
    fi
  fi
done
cd ..

echo "All media assets successfully compressed and globally optimized!"
