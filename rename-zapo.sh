#!/usr/bin/env bash
set -euo pipefail

NEW="${1:-}"
if [[ ! "$NEW" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
    echo "Pakai: bash rename-zapo.sh nama-package-baru   (huruf kecil, angka, strip)"
    exit 1
fi
if [[ ! -f package.json || ! -d .git ]]; then
    echo "Jalankan skrip ini dari folder root repo (yang ada package.json dan .git)"
    exit 1
fi
if ! command -v perl >/dev/null; then
    echo "perl tidak ditemukan. Install: sudo apt install perl"
    exit 1
fi

changed=0
while IFS= read -r -d '' f; do
    case "$f" in
        LICENSE | */LICENSE | *CHANGELOG.md | Cargo.lock | */Cargo.lock) continue ;;
    esac
    grep -Iq . "$f" 2>/dev/null || continue
    if grep -qE 'zhuxee-asistance|vinikjkkj/zapo' "$f"; then
        NEW="$NEW" perl -pi -e '
            s/(?<![@\w-])zhuxee-asistance(?![\w-])/$ENV{NEW}/g;
            s{github\.com/vinikjkkj/zapo(?![-\w])}{github.com/abay62096-dotcom/zhuxee}g;
        ' "$f"
        changed=$((changed + 1))
    fi
done < <(git ls-files -z)

echo "Selesai: $changed file diperiksa. Nama package baru: $NEW"
echo "Langkah berikut:  git diff --stat | tail -3   lalu   npm install"
