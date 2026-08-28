import clickUrl from '../assets/sound/click.mp3';
import deployUrl from '../assets/sound/deploy.mp3';
import successUrl from '../assets/sound/success.mp3';

const VOLUME = 0.45;

const URLS = {
  tap: clickUrl,
  confirm: deployUrl,
  success: successUrl,
};

/** @type {Partial<Record<'tap' | 'confirm' | 'success', HTMLAudioElement>>} */
const players = {};

function getPlayer(kind) {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') return null;

  const url = URLS[kind];
  if (!url) return null;

  let audio = players[kind];
  if (!audio) {
    audio = new Audio(url);
    audio.preload = 'auto';
    audio.volume = VOLUME;
    players[kind] = audio;
  }
  return audio;
}

/**
 * @param {'tap' | 'confirm' | 'success'} kind
 */
export function playUiSound(kind) {
  const audio = getPlayer(kind);
  if (!audio) return;

  audio.currentTime = 0;
  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(() => {
      /* autoplay blocked or interrupted */
    });
  }
}
