import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const logoPath = join(projectRoot, "public/logo.png")
const outPath = join(projectRoot, "public/og-image.png")
const fontPath = join(
  projectRoot,
  "node_modules/@fontsource/figtree/files/figtree-latin-700-normal.woff2",
)

const WIDTH = 1200
const HEIGHT = 630

const logoBuffer = await sharp(logoPath)
  .resize(220, 220)
  .negate({ alpha: false })
  .png()
  .toBuffer()
const logoBase64 = logoBuffer.toString("base64")

let fontFaceCss = ""
try {
  const fontBase64 = readFileSync(fontPath).toString("base64")
  fontFaceCss = `
    @font-face {
      font-family: "Figtree";
      src: url(data:font/woff2;base64,${fontBase64}) format("woff2");
      font-weight: 700;
    }
  `
} catch {
  // Fall back to a system sans-serif if the font file can't be embedded.
}

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <style>
    ${fontFaceCss}
    .wordmark { font-family: "Figtree", "Liberation Sans", sans-serif; font-weight: 700; }
    .tagline { font-family: "Figtree", "Liberation Sans", sans-serif; font-weight: 400; }
  </style>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#08090a" />
  <image
    x="${WIDTH / 2 - 90}"
    y="132"
    width="180"
    height="180"
    href="data:image/png;base64,${logoBase64}"
  />
  <text x="${WIDTH / 2}" y="392" text-anchor="middle" class="wordmark" font-size="64" fill="#f7f7f8">Orbit</text>
  <text x="${WIDTH / 2}" y="440" text-anchor="middle" class="tagline" font-size="24" fill="#8a8f98">
    Plan the work. Track the progress. Ship with clarity.
  </text>
</svg>
`

await sharp(Buffer.from(svg)).png().toFile(outPath)
console.log(`OG image written to ${outPath}`)
