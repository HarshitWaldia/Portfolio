type Window = { timestamps: number[] };

const store = new Map<string, Window>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const window = store.get(key) ?? { timestamps: [] };

  // Remove timestamps outside the window
  window.timestamps = window.timestamps.filter((t) => now - t < windowMs);

  if (window.timestamps.length >= limit) {
    const oldest = window.timestamps[0];
    const reset = oldest + windowMs;
    return { success: false, remaining: 0, reset };
  }

  window.timestamps.push(now);
  store.set(key, window);

  return {
    success: true,
    remaining: limit - window.timestamps.length,
    reset: now + windowMs,
  };
}
