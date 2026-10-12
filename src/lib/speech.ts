import { Language } from '@/types/heritage';

class SpeechGuideManager {
  private isSpeakingState: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public speak(
    text: string,
    lang: Language = 'en',
    onEnd?: () => void,
    onError?: () => void
  ) {
    if (!this.isSupported()) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      // Map language to BCP 47 code
      let langCode = 'en-IN';
      if (lang === 'hi') langCode = 'hi-IN';
      if (lang === 'mr') langCode = 'mr-IN';

      utterance.lang = langCode;
      utterance.rate = 0.95; // Slightly slower for clear instruction
      utterance.pitch = 1.0;

      // Attempt to find a native Indian voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.startsWith(langCode) || (lang === 'en' && v.lang === 'en-IN')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        this.isSpeakingState = true;
      };

      utterance.onend = () => {
        this.isSpeakingState = false;
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis notification:', e);
        this.isSpeakingState = false;
        this.currentUtterance = null;
        if (onError) onError();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
      this.isSpeakingState = false;
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (!this.isSupported()) return;
    try {
      window.speechSynthesis.cancel();
      this.isSpeakingState = false;
      this.currentUtterance = null;
    } catch (err) {
      console.error(err);
    }
  }

  public isSpeaking(): boolean {
    if (!this.isSupported()) return false;
    return window.speechSynthesis.speaking || this.isSpeakingState;
  }
}

export const speechGuide = new SpeechGuideManager();
