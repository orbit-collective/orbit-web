import rehypePrismGenerator from "rehype-prism-plus/generator"
import { refractor } from "refractor/core"
import bash from "refractor/bash"
import php from "refractor/php"
import tsx from "refractor/tsx"
import typescript from "refractor/typescript"

refractor.register(bash)
refractor.register(php)
refractor.register(typescript)
refractor.register(tsx)

export const rehypePrism = rehypePrismGenerator(refractor)
