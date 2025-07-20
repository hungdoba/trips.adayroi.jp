import os
import sys
from pathlib import Path
from PIL import Image
import concurrent.futures


def convert_to_webp(image_path, quality=80):
    """Convert an image to WebP format with proper orientation."""
    try:
        img = Image.open(image_path)

        # Apply EXIF orientation
        if hasattr(img, '_getexif') and img._getexif() is not None:
            from PIL import ImageOps
            img = ImageOps.exif_transpose(img)

        # Create output filename (same path but with .webp extension)
        output_path = image_path.with_suffix('.webp')

        # Convert and save as WebP
        img.save(output_path, 'WEBP', quality=quality)

        print(f"Converted: {image_path} → {output_path}")
        return True
    except Exception as e:
        print(f"Error converting {image_path}: {e}")
        return False


def process_directory(directory_path, quality=80):
    """Process all images in a directory and its subdirectories."""
    # Get all image files with jpg, jpeg, png extensions
    image_extensions = ['.jpg', '.jpeg', '.png']
    image_paths = []

    for ext in image_extensions:
        image_paths.extend(list(Path(directory_path).rglob(f"*{ext}")))
        image_paths.extend(list(Path(directory_path).rglob(f"*{ext.upper()}")))

    # Filter out images with "logo" in the name
    image_paths = [
        path for path in image_paths if "logo" not in path.stem.lower()]

    if not image_paths:
        print(f"No images found in {directory_path}")
        return 0

    print(f"Found {len(image_paths)} images to convert")

    # Convert images using a thread pool for faster processing
    successful_conversions = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=os.cpu_count()) as executor:
        # Submit all conversion tasks
        future_to_path = {executor.submit(
            convert_to_webp, path, quality): path for path in image_paths}

        # Process results as they complete
        for future in concurrent.futures.as_completed(future_to_path):
            path = future_to_path[future]
            if future.result():
                # Delete the original image if conversion was successful
                try:
                    os.remove(path)
                    print(f"Deleted original: {path}")
                except Exception as e:
                    print(f"Error deleting {path}: {e}")
                successful_conversions += 1

    return successful_conversions


if __name__ == "__main__":
    # Try to get directory from command line arguments
    if len(sys.argv) > 1:
        directory = sys.argv[1]
    else:
        directory = "public\images"

    # Try to get quality from command line arguments
    quality = 80
    if len(sys.argv) > 2:
        try:
            quality = int(sys.argv[2])
            if quality < 0 or quality > 100:
                print("Quality must be between 0 and 100, defaulting to 80")
                quality = 80
        except ValueError:
            print("Invalid quality value, defaulting to 80")

    print(f"Starting conversion in {directory} with quality {quality}...")
    converted = process_directory(directory, quality)
    print(f"Conversion complete. Successfully converted {converted} images.")
