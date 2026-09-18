/**
 * Web Speech API Text-To-Speech (TTS) utility
 * Provides clear English pronunciation for language learners.
 */

class TTSController {
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.isSupported = true;
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.isSupported) return;
    this.voices = window.speechSynthesis.getVoices();

    // Prefer high quality English voices
    const enVoices = this.voices.filter((v) => v.lang.startsWith('en'));
    const preferred = enVoices.find(
      (v) =>
        v.name.includes('Google') ||
        v.name.includes('Natural') ||
        v.name.includes('Samantha') ||
        v.name.includes('Karen') ||
        v.name.includes('Victoria')
    );

    this.selectedVoice = preferred || enVoices[0] || null;
  }

  public speak(
    text: string,
    options?: {
      rate?: number;
      pitch?: number;
      onStart?: () => void;
      onEnd?: () => void;
    }
  ) {
    if (!this.isSupported) {
      options?.onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      // 0.88x rate: perfectly paced for 7th-8th grade (13-14yo) Korean students learning English
      utterance.rate = options?.rate ?? 0.88;
      utterance.pitch = options?.pitch ?? 1.0;

      if (!this.selectedVoice) {
        this.initVoices();
      }
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      if (options?.onStart) {
        utterance.onstart = options.onStart;
      }

      const finishHandler = () => {
        options?.onEnd?.();
      };

      utterance.onend = finishHandler;
      utterance.onerror = (e) => {
        // Ignored or handled gracefully
        finishHandler();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      options?.onEnd?.();
    }
  }

  public stop() {
    if (this.isSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }
}

export const tts = new TTSController();
