export function pathCombine(...pathItems: string[]): string {
  const joined = pathItems.join("/");
  return joined;
}
