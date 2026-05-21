---
name: image-converter
description: Convert images between common formats on macOS, especially SVG/PNG/ICO/ICNS/JPEG/WebP/PDF, using installed local tools such as ImageMagick, rsvg-convert, sips, qlmanage, and iconutil. Use when the user asks to convert image files, generate favicon/icon assets, rasterize SVGs, create Windows .ico files, create macOS .icns files, resize during conversion, or inspect available image conversion commands.
---

# Image Converter

Use this skill for local image format conversion on macOS.

## Tool preference

Prefer tools in this order:

1. `rsvg-convert` for SVG to PNG when available. It gives predictable SVG rasterization.
2. `magick` for most conversions and for multi-size `.ico`.
3. `sips` for simple macOS-native PNG/JPEG/TIFF conversions and resizing.
4. `iconutil` for `.iconset` to `.icns`.
5. `qlmanage -t` only as a fallback preview renderer when SVG/PDF conversion tools fail.

Common macOS tool locations include:

- `/opt/homebrew/bin/rsvg-convert`
- `/opt/homebrew/bin/magick`
- `/usr/bin/sips`
- `/usr/bin/iconutil`
- `/usr/bin/qlmanage`

Use `command -v` at runtime instead of hardcoding paths unless a command lookup fails.

## Quick workflow

1. Inspect the input:
   ```bash
   file input.svg
   magick identify input.svg
   ```
   If `magick identify` cannot read the file, use `file` only and continue with format-specific tools.

2. Convert with the bundled script when possible:
   ```bash
   skills/image-converter/scripts/convert-image.sh input.svg output.png --size 800
   skills/image-converter/scripts/convert-image.sh input.svg output.ico
   skills/image-converter/scripts/convert-image.sh input.png output.icns
   ```

3. Verify output:
   ```bash
   file output.png output.ico
   magick identify output.png output.ico
   ```

## Format notes

- SVG to PNG: preserve transparency with `rsvg-convert` or `magick -background none`.
- SVG/PNG to ICO: create a multi-resolution icon containing `256,128,64,48,32,16`.
- PNG to ICNS: create an `.iconset` with 16, 32, 64, 128, 256, 512, and 1024 pixel variants, then run `iconutil -c icns`.
- JPEG output has no alpha channel. If converting transparent input to JPEG, flatten onto white unless the user specifies a background.
- Do not overwrite source files unless the user explicitly asks. Same-stem outputs such as `icon.svg -> icon.png` are fine.

## Guardrails

- Never overwrite source files unless the user explicitly asks.
- Never assume a tool is installed — check with `command -v` at runtime before using it.
- When all conversion tools are missing, report which tools are needed and stop; do not silently fall back to a different output format.
- For ICO/ICNS generation, always verify the output contains the expected sizes before reporting success.

## Common commands

SVG to PNG:
```bash
rsvg-convert -w 800 -h 800 icon.svg -o icon.png
```

SVG/PNG to multi-size ICO:
```bash
magick icon.svg -background none -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

PNG/JPEG resize:
```bash
sips -Z 1024 input.png --out output.png
```

PNG to ICNS:
```bash
mkdir -p AppIcon.iconset
sips -z 16 16 input.png --out AppIcon.iconset/icon_16x16.png
sips -z 32 32 input.png --out AppIcon.iconset/icon_16x16@2x.png
sips -z 32 32 input.png --out AppIcon.iconset/icon_32x32.png
sips -z 64 64 input.png --out AppIcon.iconset/icon_32x32@2x.png
sips -z 128 128 input.png --out AppIcon.iconset/icon_128x128.png
sips -z 256 256 input.png --out AppIcon.iconset/icon_128x128@2x.png
sips -z 256 256 input.png --out AppIcon.iconset/icon_256x256.png
sips -z 512 512 input.png --out AppIcon.iconset/icon_256x256@2x.png
sips -z 512 512 input.png --out AppIcon.iconset/icon_512x512.png
sips -z 1024 1024 input.png --out AppIcon.iconset/icon_512x512@2x.png
iconutil -c icns AppIcon.iconset -o AppIcon.icns
```
