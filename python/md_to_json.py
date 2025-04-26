import os
import re
import json
import yaml
from pathlib import Path


def parse_md_file(file_path):
    """Parse a markdown file and extract metadata and content."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Extract frontmatter
    frontmatter_match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
    if not frontmatter_match:
        return None

    frontmatter_text = frontmatter_match.group(1)

    try:
        # Parse frontmatter as YAML
        metadata = yaml.safe_load(frontmatter_text)

        # Extract content after frontmatter
        main_content = content[frontmatter_match.end():]

        return {
            "metadata": metadata,
            "content": main_content
        }
    except Exception as e:
        print(f"Error parsing file {file_path}: {e}")
        return None


def extract_images_and_captions(content):
    """Extract image references and captions from markdown content."""
    lines = content.strip().split('\n')
    images = []
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        img_match = re.match(r'!\[(.*?)\]\((.*?)\)', line)

        if img_match:
            alt_text = img_match.group(1)
            image_path = img_match.group(2).replace('\\', '/')

            # Look for caption in the next line if it's not blank and not another image
            caption = ""
            if i + 1 < len(lines) and lines[i + 1].strip() and not lines[i + 1].strip().startswith('!['):
                caption = lines[i + 1].strip()
                i += 1  # Skip the caption line in the next iteration

            images.append({
                "src": image_path,
                "alt": alt_text or caption or "Image",
                "caption": caption
            })

        i += 1

    return images


def process_md_files(folder_path):
    """Process all markdown files in the given folder."""
    results = []
    id_counter = 1

    # Get all markdown files and sort them by filename (which should sort by date)
    md_files = sorted(list(Path(folder_path).glob('*.md')))

    for file_path in md_files:
        # Extract date from filename (assuming format is YYYY-MM-DD.md)
        date_match = re.match(r'(\d{4}-\d{2}-\d{2})\.md', file_path.name)
        if not date_match:
            continue

        date = date_match.group(1)
        parsed_data = parse_md_file(file_path)

        if not parsed_data:
            continue

        metadata = parsed_data["metadata"]
        content = parsed_data["content"]

        images = extract_images_and_captions(content)

        entry = {
            "id": id_counter,
            "date": date,
            "title": metadata.get("title", ""),
            "tag": metadata.get("tag", ""),
            "/images": images
        }

        results.append(entry)
        id_counter += 1

    return results


def main():
    folder_path = "content/admin"
    output_file = "trips.json"

    # Create the directory if it doesn't exist
    os.makedirs(folder_path, exist_ok=True)

    # Process MD files
    data = process_md_files(folder_path)

    # Write JSON output
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Processed {len(data)} files. Output written to {output_file}")


if __name__ == "__main__":
    main()
