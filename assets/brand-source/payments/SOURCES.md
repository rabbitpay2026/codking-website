# Payment gateway logo provenance

The homepage shows four payment-gateway marks as **examples** of gateways a
merchant might connect — not as a supported-provider list, and not as a claim
of partnership, endorsement or certification by any of them. COD King does not
restrict which gateway a merchant connects; see `PaymentGateways` in
`src/components/sections/integrations/PaymentGateways.tsx` for the wording that
holds that distinction on the page itself.

Showing someone else's mark is still a use of their trademark, so every file
here needs a recorded source and a permission position, exactly as the merchant
wall does in `assets/brand-source/merchants/SOURCES.md`.

The files in this directory are the untouched downloads. The versions actually
served live in `public/logos/payments/`, trimmed to the artwork's own bounding
box and capped at 200px tall.

| Provider          | Source file                                          | Served as      | Downloaded from                                                                                                                | Date       | Licence stated at source                                                 | Permission                             |
| ----------------- | ---------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------------------------------------ | -------------------------------------- |
| Razorpay          | `razorpay.svg`                                       | `razorpay.png` | [Wikimedia Commons — File:Razorpay logo.svg](https://commons.wikimedia.org/wiki/File:Razorpay_logo.svg)                        | 2026-08-25 | Public domain (below threshold of originality); author given as Razorpay | _TODO — trademark use not yet cleared_ |
| PayU              | `payu.svg`                                           | `payu.png`     | [Wikimedia Commons — File:PayU India Logo.svg](https://commons.wikimedia.org/wiki/File:PayU_India_Logo.svg)                    | 2026-08-25 | Public domain (below threshold of originality)                           | _TODO — trademark use not yet cleared_ |
| Cashfree Payments | `cashfree-official.png` (JPEG despite the extension) | `cashfree.png` | Cashfree's own CDN, linked from their homepage: `https://cashfreelogo.cashfree.com/website/landings/homepage/cashfreeLogo.png` | 2026-08-25 | None stated — it is the mark Cashfree serves on cashfree.com             | _TODO — trademark use not yet cleared_ |
| PhonePe           | `phonepe.svg`                                        | `phonepe.png`  | [Wikimedia Commons — File:PhonePe Logo.svg](https://commons.wikimedia.org/wiki/File:PhonePe_Logo.svg)                          | 2026-08-25 | Public domain (below threshold of originality); author given as PhonePe  | _TODO — trademark use not yet cleared_ |

`cashfree.svg` is absent because Cashfree publishes no SVG on their site. A
second Cashfree file, `cashfree.png` from
[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cashfree_logo.png),
was downloaded first and then discarded: it is the previous "cashfree" wordmark
at 202×46, superseded by the "Cashfree Payments" lockup the company serves
today. It is kept here only so the choice is auditable.

"Permission" should say one of: written approval from the provider, reliance on
the provider's published brand-guideline terms, or not yet cleared. **All four
rows are currently "not yet cleared."** A row that stays uncleared should be
removed from the `payment-gateway` records in `src/data/integrations.ts` rather
than shipped — the row degrades to the remaining providers, and then to nothing
but the "& others" card, without any code change.

Note that "public domain" on Commons is a statement about _copyright_ only. A
mark can be free of copyright and still a live trademark, which every one of
these is. Copyright status is not permission to display a brand.

## Regenerating a file

Trim and cap a new download with `sharp`, as the merchant wall does:

```js
await sharp(input, { density: 900 }) // density only matters for SVG input
  .ensureAlpha()
  .trim({ threshold: 12 })
  .resize({ height: 200, fit: "inside", withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(output);
```

The Cashfree source is a JPEG on white with no alpha, so it takes one extra
step: after trimming, white is unmultiplied back into the alpha channel
(`a = 255 - min(r,g,b)`, then each channel divided by that alpha) so the mark
carries transparency like the other three instead of a white plate that would
show as a rectangle on any tinted surface.

Then update the `logo` box on that provider's record in
`src/data/integrations.ts`. `width`/`height` there are the rendered box, not the
file's intrinsic size; the ratio should track the trimmed file's to within a
fraction of a percent so the row reserves its space correctly before the image
loads. The rendered box is stated at a common 28px height, and the card caps
both axes (`max-h-7 max-w-[7.5rem]`) so a wide wordmark and a compact one end
up optically similar rather than mathematically identical.
