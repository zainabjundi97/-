import { useCallback } from 'react';
import { playUiSound } from '../lib/uiSound';

/**
 * UI sound playback (always on).
 */
export function useUiSound() {
  const play = useCallback((kind) => {
    playUiSound(kind);
  }, []);

  return { play };
}
