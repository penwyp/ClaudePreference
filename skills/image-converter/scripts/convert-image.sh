#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  convert-image.sh INPUT OUTPUT [--size N] [--background COLOR]

Examples:
  convert-image.sh icon.svg icon.png --size 800
  convert-image.sh icon.svg icon.ico
  convert-image.sh icon.png icon.icns

Notes:
  --size controls square raster output for SVG->PNG and general resize.
  --background defaults to none. Use white for JPEG or flattened output.
EOF
}

if [[ $# -lt 2 ]]; then
  usage
  exit 2
fi

input="$1"
output="$2"
shift 2

size=""
background="none"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --size)
      size="${2:-}"
      shift 2
      ;;
    --background)
      background="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ ! -f "$input" ]]; then
  echo "Input file not found: $input" >&2
  exit 1
fi

need_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Required command not found: $1" >&2
    exit 1
  fi
}

lower_ext() {
  local path="$1"
  local name="${path##*/}"
  local ext="${name##*.}"
  printf '%s' "$ext" | tr '[:upper:]' '[:lower:]'
}

input_ext="$(lower_ext "$input")"
output_ext="$(lower_ext "$output")"

make_png_from_input() {
  local src="$1"
  local dst="$2"
  if [[ "$input_ext" == "svg" ]] && command -v rsvg-convert >/dev/null 2>&1; then
    if [[ -n "$size" ]]; then
      rsvg-convert -w "$size" -h "$size" "$src" -o "$dst"
    else
      rsvg-convert "$src" -o "$dst"
    fi
    return
  fi

  need_cmd magick
  if [[ -n "$size" ]]; then
    magick "$src" -background "$background" -resize "${size}x${size}" "$dst"
  else
    magick "$src" -background "$background" "$dst"
  fi
}

case "$output_ext" in
  png)
    make_png_from_input "$input" "$output"
    ;;
  ico)
    need_cmd magick
    magick "$input" -background "$background" -define icon:auto-resize=256,128,64,48,32,16 "$output"
    ;;
  icns)
    need_cmd sips
    need_cmd iconutil
    tmpdir="$(mktemp -d)"
    trap 'rm -rf "$tmpdir"' EXIT
    png="$tmpdir/source.png"
    make_png_from_input "$input" "$png"
    iconset="$tmpdir/icon.iconset"
    mkdir -p "$iconset"
    sips -z 16 16 "$png" --out "$iconset/icon_16x16.png" >/dev/null
    sips -z 32 32 "$png" --out "$iconset/icon_16x16@2x.png" >/dev/null
    sips -z 32 32 "$png" --out "$iconset/icon_32x32.png" >/dev/null
    sips -z 64 64 "$png" --out "$iconset/icon_32x32@2x.png" >/dev/null
    sips -z 128 128 "$png" --out "$iconset/icon_128x128.png" >/dev/null
    sips -z 256 256 "$png" --out "$iconset/icon_128x128@2x.png" >/dev/null
    sips -z 256 256 "$png" --out "$iconset/icon_256x256.png" >/dev/null
    sips -z 512 512 "$png" --out "$iconset/icon_256x256@2x.png" >/dev/null
    sips -z 512 512 "$png" --out "$iconset/icon_512x512.png" >/dev/null
    sips -z 1024 1024 "$png" --out "$iconset/icon_512x512@2x.png" >/dev/null
    iconutil -c icns "$iconset" -o "$output"
    ;;
  jpg|jpeg)
    need_cmd magick
    if [[ -n "$size" ]]; then
      magick "$input" -background "${background/none/white}" -alpha remove -alpha off -resize "${size}x${size}" "$output"
    else
      magick "$input" -background "${background/none/white}" -alpha remove -alpha off "$output"
    fi
    ;;
  *)
    need_cmd magick
    if [[ -n "$size" ]]; then
      magick "$input" -background "$background" -resize "${size}x${size}" "$output"
    else
      magick "$input" -background "$background" "$output"
    fi
    ;;
esac

file "$output"
if command -v magick >/dev/null 2>&1; then
  magick identify "$output" || true
fi
