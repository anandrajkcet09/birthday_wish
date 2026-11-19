// Web Audio API helper for pure offline romantic chimes, sound effects & background melody
class SoundController {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  // Background music state
  private musicPlaying: boolean = false;
  private musicTimer: number | null = null;
  private musicListeners: ((playing: boolean) => void)[] = [];
  private muteListeners: ((muted: boolean) => void)[] = [];
  private localAudio: HTMLAudioElement | null = null;
  private useLocalAudio: boolean = false;
  private musicMasterGain: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        // Attempt to initialize local audio placeholder
        const audio = new Audio('/audio/romantic-bgm.mp3');
        audio.loop = true;
        audio.preload = 'none';

        audio.addEventListener('canplaythrough', () => {
          this.useLocalAudio = true;
        });

        audio.addEventListener('error', () => {
          // Graceful fallback to pure synthesized Web Audio melody
          this.useLocalAudio = false;
        });

        this.localAudio = audio;
      } catch {
        this.useLocalAudio = false;
      }
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.ctx && !this.musicMasterGain) {
      this.musicMasterGain = this.ctx.createGain();
      this.musicMasterGain.gain.setValueAtTime(this.enabled ? 1 : 0, this.ctx.currentTime);
      this.musicMasterGain.connect(this.ctx.destination);
    }
  }

  // Play a gentle sparkling harp-like chord
  public playChime() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.08 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.85);
      });
    } catch {
      // Audio playback handled gracefully
    }
  }

  // Play soft celebratory flourish
  public playSurpriseFlourish() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const freqs = [392.0, 523.25, 659.25, 783.99, 1046.5, 1318.51]; // G4, C5, E5, G5, C6, E6
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + idx * 0.09 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.09 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 1.3);
      });
    } catch {
      // Silent fallback
    }
  }

  // Soft airy breath + magical wish chime when extinguishing candles
  public playCandleBlow() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const sweepOsc = this.ctx.createOscillator();
      const sweepGain = this.ctx.createGain();
      sweepOsc.type = 'sine';
      sweepOsc.frequency.setValueAtTime(260, this.ctx.currentTime);
      sweepOsc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);

      sweepGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      sweepGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.08);
      sweepGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.38);

      sweepOsc.connect(sweepGain);
      sweepGain.connect(this.ctx.destination);

      sweepOsc.start(this.ctx.currentTime);
      sweepOsc.stop(this.ctx.currentTime + 0.4);

      const wishNotes = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
      wishNotes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + 0.3 + idx * 0.1);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.3 + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.3 + idx * 0.1 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3 + idx * 0.1 + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + 0.3 + idx * 0.1);
        osc.stop(this.ctx.currentTime + 0.3 + idx * 0.1 + 0.95);
      });
    } catch {
      // Silent fallback
    }
  }

  // Soft envelope wax unseal + harp chime
  public playLetterOpen() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [440.0, 554.37, 659.25, 880.0]; // A4, C#5, E5, A5
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.11, this.ctx.currentTime + idx * 0.07 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.07 + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.75);
      });
    } catch {
      // Silent fallback
    }
  }

  // Heart burst magical sound
  public playHeartBurst() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const burstNotes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
      burstNotes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.14, this.ctx.currentTime + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.06 + 1.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 1.15);
      });
    } catch {
      // Silent fallback
    }
  }

  // Mute / Unmute
  public setMuted(muted: boolean) {
    this.enabled = !muted;
    if (this.musicMasterGain && this.ctx) {
      this.musicMasterGain.gain.setValueAtTime(this.enabled ? 1 : 0, this.ctx.currentTime);
    }
    if (this.localAudio) {
      this.localAudio.muted = muted;
    }
    this.notifyMuteListeners();
  }

  public isMuted(): boolean {
    return !this.enabled;
  }

  public toggleMute() {
    this.setMuted(!this.isMuted());
  }

  public subscribeMuteState(listener: (muted: boolean) => void): () => void {
    this.muteListeners.push(listener);
    listener(this.isMuted());
    return () => {
      this.muteListeners = this.muteListeners.filter((l) => l !== listener);
    };
  }

  private notifyMuteListeners() {
    this.muteListeners.forEach((l) => l(this.isMuted()));
  }

  // Background Music Controller
  public isMusicPlaying(): boolean {
    return this.musicPlaying;
  }

  public subscribeMusicState(listener: (playing: boolean) => void): () => void {
    this.musicListeners.push(listener);
    listener(this.musicPlaying);
    return () => {
      this.musicListeners = this.musicListeners.filter((l) => l !== listener);
    };
  }

  private notifyMusicListeners() {
    this.musicListeners.forEach((l) => l(this.musicPlaying));
  }

  public playMusic() {
    if (this.musicPlaying) return;

    // Check if local MP3 is available and loadable
    if (this.useLocalAudio && this.localAudio) {
      this.localAudio
        .play()
        .then(() => {
          this.musicPlaying = true;
          this.notifyMusicListeners();
        })
        .catch(() => {
          // Fallback to synthesized melody
          this.playSynthesizedMelody();
        });
    } else {
      this.playSynthesizedMelody();
    }
  }

  private playSynthesizedMelody() {
    this.initContext();
    if (!this.ctx) return;

    if (this.musicMasterGain) {
      this.musicMasterGain.gain.setValueAtTime(this.enabled ? 1 : 0, this.ctx.currentTime);
    }

    this.musicPlaying = true;
    this.notifyMusicListeners();

    // Sweet romantic lullaby / music box melody
    const melody = [
      { f: 523.25, d: 0.6 }, // C5
      { f: 659.25, d: 0.6 }, // E5
      { f: 783.99, d: 0.8 }, // G5
      { f: 659.25, d: 0.4 }, // E5
      { f: 880.0, d: 0.8 }, // A5
      { f: 783.99, d: 0.6 }, // G5
      { f: 523.25, d: 0.8 }, // C5
      { f: 587.33, d: 0.6 }, // D5
      { f: 659.25, d: 0.6 }, // E5
      { f: 523.25, d: 1.0 }, // C5
      { f: 440.0, d: 0.6 }, // A4
      { f: 493.88, d: 0.6 }, // B4
      { f: 523.25, d: 1.2 }, // C5
    ];

    let noteIndex = 0;
    const playNextNote = () => {
      if (!this.musicPlaying || !this.ctx) return;

      const current = melody[noteIndex % melody.length];
      noteIndex++;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(current.f, this.ctx.currentTime);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(current.f * 2, this.ctx.currentTime);

      const noteDuration = current.d;
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + noteDuration + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.musicMasterGain || this.ctx.destination);

      osc1.start(this.ctx.currentTime);
      osc2.start(this.ctx.currentTime);
      osc1.stop(this.ctx.currentTime + noteDuration + 0.6);
      osc2.stop(this.ctx.currentTime + noteDuration + 0.6);

      this.musicTimer = window.setTimeout(playNextNote, (noteDuration + 0.15) * 1000);
    };

    playNextNote();
  }

  public pauseMusic() {
    this.musicPlaying = false;
    if (this.musicMasterGain && this.ctx) {
      this.musicMasterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    if (this.localAudio) {
      try {
        this.localAudio.pause();
      } catch {
        // ignore
      }
    }
    if (this.musicTimer !== null) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    this.notifyMusicListeners();
  }

  public toggleMusic() {
    if (this.musicPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }
}

export const soundController = new SoundController();
