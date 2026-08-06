# Merchant logo provenance

A logo wall is a claim about someone else's brand, so every mark on the
homepage trust strip needs a recorded source and a permission position before
the page ships. This file is that record.

The files in this directory are the untouched downloads. The versions actually
served live in `public/logos/merchants/`, trimmed to the artwork's own bounding
box and capped at 200px tall — press-kit exports carry padding that would
otherwise render one brand a third the size of its neighbours.

| Brand | Source file | Served as | Downloaded from | Date | Permission |
| --- | --- | --- | --- | --- | --- |
| Casio | `Casio-Logo.png` | `casio.png` | _TODO_ | 2026-08-07 | _TODO_ |
| Himalaya Herbals | `himalaya-logo.png` (WebP despite the extension) | `himalaya.png` | _TODO_ | 2026-08-07 | _TODO_ |
| RedTape | `redtape.png` | `redtape.png` | _TODO_ | 2026-08-07 | _TODO_ |
| Slobberman | `SLOBBERMAN-LOGO-BLACK.png` | `slobberman.png` | _TODO_ | 2026-08-07 | _TODO_ |
| Qwerty Cases | `Qwerty_Cases-.png` | `qwerty-cases.png` | _TODO_ | 2026-08-07 | _TODO_ |

"Permission" should say one of: written approval from the merchant, reliance on
the brand's published press-kit terms, or not yet cleared. A row that is not
cleared should be removed from `trustedBrands` in `src/data/homepage.ts` rather
than shipped — the wall degrades to the remaining brands without any code
change.

## Regenerating a file

Trim and cap a new download with `sharp`:

```js
await sharp(input)
  .ensureAlpha()
  .trim({ threshold: 12 })
  .resize({ height: 200, fit: "inside", withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true })
  .toFile(output);
```

Then update the `logo` box on that brand's record in `src/data/homepage.ts`.
`width`/`height` there are the rendered box, not the file's intrinsic size, and
the ratio must match the trimmed file exactly or the row will shift as it loads.
