#!/bin/bash

# Optimize Images
cd images
for img in *.jpg *.jpeg *.png; do
  if [ -f "$img" ]; then
    filename=$(basename -- "$img")
    extension="${filename##*.}"
    filename="${filename%.*}"
    # Convert to webp
    echo "Converting $img to $filename.webp..."
    ffmpeg -y -i "$img" -vcodec libwebp -lossless 0 -q:v 80 "$filename.webp"
    # Remove old file to save space
    rm "$img"
  fi
done
cd ..

# Optimize Videos
cd videos
for vid in *.mp4; do
  if [ -f "$vid" ]; then
    echo "Compressing $vid..."
    # Highly compressed H.264, scaling down to max 1080p height
    ffmpeg -y -i "$vid" -vcodec libx264 -crf 28 -preset faster -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,scale='min(1920,iw)':-2" -acodec copy "temp_$vid"
    mv "temp_$vid" "$vid"
  fi
done
cd ..

echo "Optimization complete!"
