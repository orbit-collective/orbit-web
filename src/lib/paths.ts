/** Whether `pathname` is `href` itself or somewhere below it ("/learn/en" is within "/learn"). */
export function isWithin(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`)
}
