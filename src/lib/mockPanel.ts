import { cn } from "./cn"

export function mockPanelClass(isActive: boolean) {
  return cn(
    "absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out",
    isActive ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
  )
}
