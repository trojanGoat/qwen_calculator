const DTMF_FREQUENCIES: Record<string, [number, number]> = {
  '1': [697, 1209],
  '2': [697, 1336],
  '3': [697, 1477],
  '4': [770, 1209],
  '5': [770, 1336],
  '6': [770, 1477],
  '7': [852, 1209],
  '8': [852, 1336],
  '9': [852, 1477],
  '*': [941, 1209],
  '0': [941, 1336],
  '#': [941, 1477],
};

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

export function playDTMF(digit: string): void {
  const freqs = DTMF_FREQUENCIES[digit];
  if (!freqs) return;

  const ctx = getAudioContext();
  const duration = 0.12;
  const now = ctx.currentTime;
  const gainNode = ctx.createGain();

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.15, now + 0.005);
  gainNode.gain.setValueAtTime(0.15, now + duration - 0.02);
  gainNode.gain.linearRampToValueAtTime(0, now + duration);
  gainNode.connect(ctx.destination);

  freqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.connect(gainNode);
    osc.start(now);
    osc.stop(now + duration);
  });
}
