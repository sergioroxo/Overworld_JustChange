

// === Procedural Audio Engine ===

export interface AudioEngine {
  init(): Promise<void>;
  update(time: number, dayFactor: number): void;
  playSFX(type: SFXType): void;
  playAmbient(type: 'day' | 'night' | 'building' | 'note'): void;
  setMasterVolume(v: number): void;
}

export type SFXType = 
  | 'step' | 'select' | 'pop' | 'close' | 'complete' | 'note' 
  | 'menu' | 'locked' | 'transition';

interface Voice {
  osc: OscillatorNode;
  gain: GainNode;
  startTime: number;
}

class AudioEngineImpl implements AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private masterVolume = 0.6;
  private voices: Voice[] = [];
  private isInitialized = false;
  private initFailed = false;
  
  // Ambient oscillators
  private ambientNodes: { 
    day1?: OscillatorNode, day2?: OscillatorNode, 
    night1?: OscillatorNode, night2?: OscillatorNode,
    dayGain?: GainNode, nightGain?: GainNode
  } = {};
  
  async init(): Promise<void> {
    if (this.isInitialized || this.initFailed) return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn('Web Audio API not supported');
        this.initFailed = true;
        return;
      }

      this.ctx = new AudioContextClass();
      this.isInitialized = true;
      
      if (this.ctx.state === 'suspended') {
        try {
          await this.ctx.resume();
        } catch (resumeError) {
          console.warn('Could not resume audio context:', resumeError);
          // Don't fail completely - audio might work later
        }
      }
      
      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.masterVolume;
      this.masterGain.connect(this.ctx.destination);
      
      // Ambient gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0.15;
      this.ambientGain.connect(this.masterGain);
      
      // Setup ambient oscillators
      this.setupAmbient();
      
    } catch (error) {
      console.warn('Audio initialization failed, continuing without audio:', error);
      this.initFailed = true;
      // Don't throw - allow game to continue without audio
    }
  }
  
  private setupAmbient(): void {
    if (!this.ctx || !this.ambientGain) return;
    
    try {
      // Day ambient - gentle, open feeling
      const dayGain = this.ctx.createGain();
      dayGain.gain.value = 0.4;
      dayGain.connect(this.ambientGain);
      
      const day1 = this.ctx.createOscillator();
      day1.type = 'sine';
      day1.frequency.value = 220;
      const day2 = this.ctx.createOscillator();
      day2.type = 'sine';
      day2.frequency.value = 330;
      
      day1.connect(dayGain);
      day2.connect(dayGain);
      
      this.ambientNodes.day1 = day1;
      this.ambientNodes.day2 = day2;
      this.ambientNodes.dayGain = dayGain;
      
      // Night ambient - deeper, more mysterious
      const nightGain = this.ctx.createGain();
      nightGain.gain.value = 0.3;
      nightGain.connect(this.ambientGain);
      
      const night1 = this.ctx.createOscillator();
      night1.type = 'sine';
      night1.frequency.value = 110;
      const night2 = this.ctx.createOscillator();
      night2.type = 'sine';
      night2.frequency.value = 165;
      
      night1.connect(nightGain);
      night2.connect(nightGain);
      
      this.ambientNodes.night1 = night1;
      this.ambientNodes.night2 = night2;
      this.ambientNodes.nightGain = nightGain;
      
      // Start all
      day1.start();
      day2.start();
      night1.start();
      night2.start();
      
    } catch (error) {
      console.warn('Failed to setup ambient audio:', error);
    }
  }
  
  update(time: number, dayFactor: number): void {
    if (!this.ctx || this.initFailed) return;
    
    try {
      // Crossfade day/night ambient
      const dayG = this.ambientNodes.dayGain;
      const nightG = this.ambientNodes.nightGain;
      
      if (dayG && nightG) {
        dayG.gain.setTargetAtTime(0.3 * dayFactor, this.ctx.currentTime, 0.5);
        nightG.gain.setTargetAtTime(0.3 * (1 - dayFactor), this.ctx.currentTime, 0.5);
      }
      
      // Modulate ambient frequencies slightly
      if (this.ambientNodes.day1) {
        this.ambientNodes.day1.frequency.setTargetAtTime(
          220 + Math.sin(time * 0.1) * 5, this.ctx.currentTime, 0.1
        );
      }
      if (this.ambientNodes.day2) {
        this.ambientNodes.day2.frequency.setTargetAtTime(
          330 + Math.sin(time * 0.13) * 8, this.ctx.currentTime, 0.1
        );
      }
    } catch (error) {
      // Silently fail on audio updates
    }
  }
  
  playSFX(type: SFXType): void {
    if (!this.ctx || !this.masterGain || this.initFailed) return;
    
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      gain.connect(this.masterGain);
      
      switch (type) {
        case 'step':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(120 + Math.random() * 30, now);
          osc.frequency.exponentialRampToValueAtTime(60, now + 0.05);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          osc.start(now);
          osc.stop(now + 0.06);
          break;
          
        case 'select':
          osc.type = 'square';
          osc.frequency.setValueAtTime(880, now);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
          break;
          
        case 'pop':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc.start(now);
          osc.stop(now + 0.12);
          
          // Second tone
          const osc2 = this.ctx.createOscillator();
          const gain2 = this.ctx.createGain();
          gain2.connect(this.masterGain);
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(660, now + 0.05);
          gain2.gain.setValueAtTime(0.08, now + 0.05);
          gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc2.start(now + 0.05);
          osc2.stop(now + 0.15);
          break;
          
        case 'close':
          osc.type = 'square';
          osc.frequency.setValueAtTime(330, now);
          osc.frequency.exponentialRampToValueAtTime(160, now + 0.1);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
          
        case 'complete':
          // Ascending arpeggio
          [440, 554, 659, 880].forEach((freq, i) => {
            const o = this.ctx!.createOscillator();
            const g = this.ctx!.createGain();
            g.connect(this.masterGain!);
            o.type = 'sine';
            o.frequency.value = freq;
            g.gain.setValueAtTime(0.08, now + i * 0.08);
            g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.15);
            o.start(now + i * 0.08);
            o.stop(now + i * 0.08 + 0.15);
          });
          return;
          
        case 'note':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.start(now);
          osc.stop(now + 0.15);
          
          const osc3 = this.ctx.createOscillator();
          const gain3 = this.ctx.createGain();
          gain3.connect(this.masterGain);
          osc3.type = 'sine';
          osc3.frequency.setValueAtTime(1400, now + 0.06);
          gain3.gain.setValueAtTime(0.06, now + 0.06);
          gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc3.start(now + 0.06);
          osc3.stop(now + 0.2);
          return;
          
        case 'menu':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(220, now);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
          break;
          
        case 'locked':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
          break;
          
        case 'transition':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(200, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.3);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.start(now);
          osc.stop(now + 0.4);
          break;
      }
      
      osc.connect(gain);
      
    } catch (error) {
      // Silently fail on SFX playback
    }
  }
  
  playAmbient(type: 'day' | 'night' | 'building' | 'note'): void {
    // Handled by update() crossfading
  }
  
  setMasterVolume(v: number): void {
    this.masterVolume = Math.max(0, Math.min(1, v));
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setTargetAtTime(this.masterVolume, this.ctx.currentTime, 0.1);
      } catch (e) {}
    }
  }
}

export const audio = new AudioEngineImpl();
export default audio;

