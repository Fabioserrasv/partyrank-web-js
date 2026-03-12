const listeners = new Map<number, Set<() => void>>();

export function onProfilePictureRefresh(userId: number, callback: () => void): () => void {
  if (!listeners.has(userId)) {
    listeners.set(userId, new Set());
  }
  listeners.get(userId)!.add(callback);
  return () => {
    listeners.get(userId)?.delete(callback);
  };
}

export function emitProfilePictureRefresh(userId: number): void {
  listeners.get(userId)?.forEach(cb => cb());
}
