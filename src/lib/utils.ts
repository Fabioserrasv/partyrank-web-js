
/*
  Mask the value to a ##.## mask
*/
export let maskValueToDecimal = (a: string | number) => {
  if (a == '') a = 0
  let n = parseFloat(a as string)
  if (isNaN(n)) return NaN;
  if (n < 0) return 0
  if (n > 10) return maskValueToDecimal(n / 10)
  return n
}

/*
  Output the reverse version of the array
*/
export function reverseArray<T>(array: T[]): T[] {
  return [...array].reverse()
}

export function getUserImageUrlPath(url: string | null | undefined): string {
  return (url != '' && url != null && url != undefined) ? url : "/user_images/default_user_profilepic.png"
}