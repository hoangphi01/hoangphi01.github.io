#!/bin/bash
# assign-post-code.sh
# Scans _posts/ for .md files without a 6-char code suffix.
# Generates a code, renames both lang versions with the same code,
# and creates assets/posts/{CODE}/ folder.
#
# Usage: ./assign-post-code.sh

set -e

POSTS_DIR="_posts"
ASSETS_DIR="assets/posts"

# Pattern: date-lang-slug-CODE.md  (CODE = 6 uppercase alphanumeric)
CODE_PATTERN='-[A-Z0-9]{6}\.md$'

generate_code() {
    cat /dev/urandom | tr -dc 'A-Z0-9' | head -c 6
}

# Collect files that don't have a code yet
declare -A groups  # key = "date-slug" -> value = list of files

for file in "$POSTS_DIR"/*.md; do
    [ -f "$file" ] || continue
    basename=$(basename "$file")

    # Skip if already has a code
    if [[ "$basename" =~ $CODE_PATTERN ]]; then
        echo "[skip] $basename (already has code)"
        continue
    fi

    # Parse: YYYY-MM-DD-{lang}-{slug}.md
    if [[ "$basename" =~ ^([0-9]{4}-[0-9]{2}-[0-9]{2})-(en|vn)-(.+)\.md$ ]]; then
        date="${BASH_REMATCH[1]}"
        lang="${BASH_REMATCH[2]}"
        slug="${BASH_REMATCH[3]}"
        key="${date}-${slug}"

        # Append to group
        if [ -z "${groups[$key]}" ]; then
            groups[$key]="$file"
        else
            groups[$key]="${groups[$key]}|$file"
        fi
    else
        echo "[warn] $basename doesn't match expected pattern, skipping"
    fi
done

if [ ${#groups[@]} -eq 0 ]; then
    echo "No posts need codes. All done!"
    exit 0
fi

# Process each group
for key in "${!groups[@]}"; do
    code=$(generate_code)
    echo ""
    echo "=== Group: $key -> Code: $code ==="

    # Create assets folder
    mkdir -p "$ASSETS_DIR/$code"
    echo "[created] $ASSETS_DIR/$code/"

    # Rename each file in the group
    IFS='|' read -ra files <<< "${groups[$key]}"
    for file in "${files[@]}"; do
        basename=$(basename "$file")
        # Insert code before .md: slug.md -> slug-CODE.md
        newname="${basename%.md}-${code}.md"
        mv "$file" "$POSTS_DIR/$newname"
        echo "[renamed] $basename -> $newname"
    done
done

echo ""
echo "Done! Remember to update any internal links if needed."
