
/*
  Mask the value to a ##.## mask
*/
export let maskValueToDecimal = (a: string | number) : number => {
  if (a == '') a = 0
  let n: number = parseFloat(a as string)
  if (isNaN(n)) return NaN;
  if (n < 0) return 0
  if(typeof a == 'string' && a.length == 2 && n % 10 == 0) return n
  if (n > 10) return maskValueToDecimal(n / 10)
  return n
}

/*
  Output the reverse version of the array
*/
export function reverseArray<T>(array: T[]): T[] {
  const a = array
  return [...a].reverse()
}

export function getUserImageUrlPath(url: string | null | undefined): string {
  if (url != '' && url != null && url != undefined) {
    // Se a URL já contém o caminho completo, usar diretamente
    if (url.startsWith('/user_images/')) {
      url = url.replace('/user_images/', '/api/user-images/');
      url = url.replace(" ", "");
      return url;
    }
    // Se for apenas o nome do arquivo, construir o caminho
    return `/api/user-images/${url}`;
  }
  return "/api/user-images/default_user_profilepic.png";
}

export function normalizeUsername(username: string) {
  return username
      .normalize('NFD') // Normaliza a string para decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Remove os diacríticos
      .toLowerCase() // Converte para minúsculas
      .replace(/[^a-z0-9]/g, ''); // Remove caracteres não alfanuméricos
}

export function getUserImageUrlPathFromUsername(username: string): string {
  if (username != '' && username != null && username != undefined) {
    return `/api/user-images/user_images/${normalizeUsername(username)}.png`;
  }
  return "/api/user-images/user_images/default_user_profilepic.png";
}

export function generatePlaceholderSets(songSets: SongSet[], itemsPerPage: number) {
  if (songSets.length < itemsPerPage) {
    const diff = itemsPerPage - songSets.length;
    for (let i = 0; i < diff; i++) {
      songSets.push({
        id: Math.random() + i * 10,
        name: `-`,
        anilistLink: '',
        isPlaceholder: true,
        coverImage: '',
        songs: [],
        type: 'PRIVATE',
        status: 'PAUSED',
        scoreSystem: 'RANKING',
        user: undefined,
      });
    }
  }
}