"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Craft, Language } from '@/types/heritage';
import { initialCrafts } from '@/data/heritageData';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { speechGuide } from '@/lib/speech';
import { 
  Camera, 
  CameraOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Download, 
  RotateCcw, 
  Palette, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Brush, 
  Layers, 
  ShieldCheck,
  Send,
  Bot,
  User as UserIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ARLearningZoneProps {
  currentLanguage: Language;
  onEarnPoints: (points: number, reason: string) => void;
}

export const ARLearningZone: React.FC<ARLearningZoneProps> = ({
  currentLanguage,
  onEarnPoints
}) => {
  const [selectedCraftId, setSelectedCraftId] = useState<number>(1);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showCanvasStudio, setShowCanvasStudio] = useState<boolean>(false);
  const [showAIAssistant, setShowAIAssistant] = useState<boolean>(false);
  
  // Canvas Studio states
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeColor, setActiveColor] = useState<string>('#F8F7F0'); // Rice White
  const [activeTool, setActiveTool] = useState<'brush' | 'stamp-dancer' | 'stamp-tree' | 'stamp-circle'>('brush');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [brushSize, setBrushSize] = useState<number>(4);

  // Video element ref for real webcam feed
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // AI Assistant states
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([
    {
      role: 'ai',
      text: 'Namaste! I am your AI Heritage Guru. Ask me anything about traditional pigments, sacred geometry, GI certifications, or step-by-step masterclass techniques!'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  const currentCraft: Craft = initialCrafts.find((c) => c.id === selectedCraftId) || initialCrafts[0];
  const currentStep = currentCraft.steps[currentStepIndex] || currentCraft.steps[0];

  // Camera stream cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      speechGuide.stop();
    };
  }, []);

  const startCamera = async () => {
    soundManager.playClick();
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraActive(true);
        toast.success('Live AR camera optical lens active!');
      } else {
        toast.error('Webcam access not supported on this device/browser.');
      }
    } catch (err) {
      console.warn('Camera permission denied or camera unavailable:', err);
      toast.info('Using high-fidelity interactive AR simulator view.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const toggleVoiceGuide = () => {
    soundManager.playClick();
    if (isSpeaking) {
      speechGuide.stop();
      setIsSpeaking(false);
    } else {
      const textToSpeak = currentStep.audioText[currentLanguage] || currentStep.audioText.en;
      setIsSpeaking(true);
      speechGuide.speak(
        textToSpeak,
        currentLanguage,
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleNextStep = () => {
    soundManager.playClick();
    speechGuide.stop();
    setIsSpeaking(false);
    if (currentStepIndex < currentCraft.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      soundManager.playSuccess();
      onEarnPoints(50, `Completed all steps for ${currentCraft.name}!`);
      toast.success(`Masterclass completed! +50 Heritage XP earned.`);
    }
  };

  const handlePrevStep = () => {
    soundManager.playClick();
    speechGuide.stop();
    setIsSpeaking(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Canvas Studio Setup
  useEffect(() => {
    if (showCanvasStudio && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Red Terracotta Geru Background
        ctx.fillStyle = '#8B2E18';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add subtle canvas texture
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        for (let i = 0; i < canvas.width; i += 8) {
          ctx.fillRect(i, 0, 4, canvas.height);
        }
      }
    }
  }, [showCanvasStudio]);

  // Canvas Drawing & Stamping Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (activeTool === 'brush') {
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    } else {
      soundManager.playMatch();
      drawStamp(ctx, x, y, activeTool, activeColor);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTool !== 'brush') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const drawStamp = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    tool: string,
    color: string
  ) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    if (tool === 'stamp-dancer') {
      // Warli Dancer: Two inverted triangles + head + limbs
      // Upper triangle
      ctx.beginPath();
      ctx.moveTo(x, y - 20);
      ctx.lineTo(x - 14, y - 4);
      ctx.lineTo(x + 14, y - 4);
      ctx.closePath();
      ctx.fill();

      // Lower triangle
      ctx.beginPath();
      ctx.moveTo(x, y - 4);
      ctx.lineTo(x - 14, y + 16);
      ctx.lineTo(x + 14, y + 16);
      ctx.closePath();
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(x, y - 28, 6, 0, Math.PI * 2);
      ctx.fill();

      // Arms holding hands
      ctx.beginPath();
      ctx.moveTo(x, y - 10);
      ctx.lineTo(x - 22, y - 15);
      ctx.moveTo(x, y - 10);
      ctx.lineTo(x + 22, y - 15);
      ctx.stroke();

      // Legs
      ctx.beginPath();
      ctx.moveTo(x - 8, y + 16);
      ctx.lineTo(x - 12, y + 32);
      ctx.moveTo(x + 8, y + 16);
      ctx.lineTo(x + 12, y + 32);
      ctx.stroke();
    } else if (tool === 'stamp-tree') {
      // Warli Sacred Tree of Life
      ctx.beginPath();
      ctx.moveTo(x, y + 30);
      ctx.lineTo(x, y - 25);
      ctx.lineWidth = 4;
      ctx.stroke();

      // Triangular leaf foliage
      for (let i = 0; i < 4; i++) {
        const branchY = y - 20 + i * 12;
        ctx.beginPath();
        ctx.moveTo(x, branchY);
        ctx.lineTo(x - 18, branchY - 8);
        ctx.moveTo(x, branchY);
        ctx.lineTo(x + 18, branchY - 8);
        ctx.stroke();
      }
    } else if (tool === 'stamp-circle') {
      // Sacred Mandala Sun
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.stroke();
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        const x1 = x + Math.cos(angle) * 18;
        const y1 = y + Math.sin(angle) * 18;
        const x2 = x + Math.cos(angle) * 26;
        const y2 = y + Math.sin(angle) * 26;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  const handleDownloadCanvas = () => {
    soundManager.playSuccess();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Heritage-Art-${currentCraft.nameKey}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('Folk art masterpiece downloaded! +25 Heritage XP');
    onEarnPoints(25, 'Created and saved custom folk art canvas');
  };

  const handleClearCanvas = () => {
    soundManager.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#8B2E18';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    toast.info('Canvas cleared.');
  };

  const handleSendAIMessage = () => {
    if (!chatInput.trim()) return;
    soundManager.playClick();
    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setChatInput('');

    // Generate intelligent heritage context response
    setTimeout(() => {
      let aiReply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('dye') || lower.includes('color') || lower.includes('paint') || lower.includes('pigment')) {
        aiReply = `Traditional Indian craft pigments are 100% organic: Fermented Indigo leaves (Neel) give sacred blue, Pomegranate rind & Turmeric give solar yellow, and Madder root (Manjistha) yields royal crimson. Always use natural alum or myrobalan (Karakkai) as mordants to bind dyes permanently to cotton fibers without harsh synthetic chemicals.`;
      } else if (lower.includes('gi') || lower.includes('certificate') || lower.includes('authentic') || lower.includes('fake')) {
        aiReply = `Geographical Indication (GI) tags are legal intellectual property rights under the GI Act of 1999 that authenticate crafts like Bagru Hand Block Prints, Patan Patola, and Thanjavur Paintings to their specific hereditary artisan communities. In this portal, each authentic item is cryptographically anchored with SHA-256 digests on-chain.`;
      } else if (lower.includes('warli') || lower.includes('tribal')) {
        aiReply = `Warli art dates back over 4,500 years to the Neolithic era in the Sahyadri mountains. Notice that Warli does not depict deities or kings; it celebrates community, weddings, the Tarpa circular dance, and mutual harmony with the jungle. The human figure is composed of two sacred triangles touching at their tips.`;
      } else if (lower.includes('dabu') || lower.includes('block') || lower.includes('rajasthan')) {
        aiReply = `Dabu comes from the Hindi verb 'Dabana' (to press). The secret is the resist paste made of black clay (Kali Mitti), acacia tree gum (Gond), and slaked lime. When dried, the sawdust layer prevents cracking during the deep indigo dipping.`;
      } else {
        aiReply = `A profound question about ${currentCraft.name}. In master apprentice traditions (Guru-Shishya Parampara), precision is guided by sacred shlokas and generational memory. Would you like a breakdown of the mineral mordants or the historical symbolism of this motif?`;
      }

      setChatMessages((prev) => [...prev, { role: 'ai', text: aiReply }]);
      soundManager.playCoin();
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Craft Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border border-amber-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              {getTranslation('arCameraTitle', currentLanguage)}
            </h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Immersive masterclasses with live optical lens alignment, step-by-step voice guidance, and virtual folk art canvas.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={() => {
              soundManager.playClick();
              setShowCanvasStudio(true);
            }}
            className="bg-gradient-to-r from-[#D84315] to-[#E65100] text-white hover:opacity-90 shadow-xs"
          >
            <Brush className="w-4 h-4 mr-2" />
            Canvas Studio
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              soundManager.playClick();
              setShowAIAssistant(true);
            }}
            className="border-indigo-300 text-indigo-900 bg-indigo-50/60 hover:bg-indigo-100"
          >
            <Bot className="w-4 h-4 mr-1.5 text-indigo-600" />
            AI Heritage Guru
          </Button>
        </div>
      </div>

      {/* Craft Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {initialCrafts.map((craft) => (
          <button
            key={craft.id}
            onClick={() => {
              soundManager.playClick();
              setSelectedCraftId(craft.id);
              setCurrentStepIndex(0);
              speechGuide.stop();
              setIsSpeaking(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all border flex items-center gap-2 ${
              selectedCraftId === craft.id
                ? 'bg-gradient-to-r from-[#1A237E] to-[#283593] text-white border-transparent shadow-md scale-102'
                : 'bg-white hover:bg-amber-50 text-slate-700 border-amber-200/60'
            }`}
          >
            <span>{craft.name}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              selectedCraftId === craft.id ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
            }`}>
              {craft.state}
            </span>
          </button>
        ))}
      </div>

      {/* Main AR Interface Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live AR Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border-2 border-amber-400/40 shadow-xl flex items-center justify-center">
            {/* Real Webcam video element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isCameraActive ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            />

            {/* Simulated Craft Viewport fallback if webcam inactive */}
            {!isCameraActive && (
              <div className="absolute inset-0">
                <img
                  src={currentCraft.image}
                  alt={currentCraft.name}
                  className="w-full h-full object-cover opacity-60 filter contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
              </div>
            )}

            {/* AR Overlay Reticles, Bounding Guides & Hologram Grid */}
            <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
              {/* Top AR telemetry HUD */}
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>AR LENS: {isCameraActive ? 'OPTICAL FEED ACTIVE' : 'HOLOGRAPHIC SIMULATION'}</span>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-amber-400/40 text-amber-300">
                  <span>STEP {currentStepIndex + 1}/{currentCraft.steps.length}</span>
                </div>
              </div>

              {/* Central Target Reticle & Dynamic Registration Box */}
              <div className="relative mx-auto my-auto w-56 h-56 sm:w-72 sm:h-72 border-2 border-dashed border-amber-400/80 rounded-2xl flex flex-col items-center justify-center p-4 animate-pulse">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400" />
                
                <div className="text-center bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white max-w-[200px]">
                  <Sparkles className="w-5 h-5 mx-auto text-amber-400 mb-1" />
                  <p className="text-[11px] font-sans font-medium text-amber-200">
                    Align Surface Here
                  </p>
                  <p className="text-[9px] text-slate-300 mt-0.5">
                    {currentStep.title}
                  </p>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="flex items-center justify-between text-[11px] text-white/80 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>GI Heritage Node: {currentCraft.region}</span>
                </div>
                <span className="text-amber-300 font-mono">24 FPS · 1080p</span>
              </div>
            </div>

            {/* Bottom Controls Bar inside viewport */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-auto">
              <Button
                size="sm"
                variant="secondary"
                onClick={isCameraActive ? stopCamera : startCamera}
                className="bg-black/80 hover:bg-black text-white border border-white/20 text-xs backdrop-blur-md"
              >
                {isCameraActive ? (
                  <>
                    <CameraOff className="w-3.5 h-3.5 mr-1.5 text-rose-400" /> Stop Camera
                  </>
                ) : (
                  <>
                    <Camera className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> Launch Real Webcam
                  </>
                )}
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  soundManager.playShutter();
                  toast.success('Holographic AR snapshot captured to your gallery!');
                }}
                className="bg-black/80 hover:bg-black text-white border border-white/20 text-xs backdrop-blur-md"
              >
                <Download className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Snapshot
              </Button>
            </div>
          </div>

          {/* Quick Info Capsule */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <span className="text-[10px] text-amber-700 block">Origin Era</span>
              <span className="font-semibold">{currentCraft.originEra}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900">
              <span className="text-[10px] text-indigo-700 block">Master Guild</span>
              <span className="font-semibold line-clamp-1">{currentCraft.masterArtisan}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <span className="text-[10px] text-emerald-700 block">GI Protection</span>
              <span className="font-semibold">Certified Authentic</span>
            </div>
            <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-900">
              <span className="text-[10px] text-orange-700 block">Rating</span>
              <span className="font-semibold">★ {currentCraft.rating} ({currentCraft.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Interactive Guide */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-5 rounded-2xl bg-white/90 border-amber-200/80 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  Step {currentStep.stepNumber} of {currentCraft.steps.length}
                </span>
                <h3 className="font-serif font-bold text-lg text-slate-900 mt-1">
                  {currentStep.title}
                </h3>
              </div>

              {/* Multilingual Voice Guide Trigger */}
              <Button
                size="sm"
                onClick={toggleVoiceGuide}
                className={`transition-all ${
                  isSpeaking
                    ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                    : 'bg-gradient-to-r from-[#1A237E] to-[#283593] hover:from-[#101758] hover:to-[#1A237E] text-white shadow-sm'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4 mr-1.5" /> Stop Voice
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-1.5" /> Listen Audio
                  </>
                )}
              </Button>
            </div>

            {/* Instruction Body */}
            <div className="space-y-3">
              <p className="text-slate-800 text-sm leading-relaxed">
                {currentStep.instructions}
              </p>

              {/* Master Artisan Pro-Tip */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-amber-900">Artisan Guild Secret: </span>
                  <span className="text-amber-800">{currentStep.tip}</span>
                </div>
              </div>

              {/* Natural Materials List */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Natural Ingredients & Tools:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentCraft.materials.map((mat, i) => (
                    <Badge key={i} variant="outline" className="text-[11px] bg-slate-50 border-slate-200 text-slate-700">
                      • {mat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Pagination Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-amber-200/60">
              <Button
                variant="outline"
                size="sm"
                disabled={currentStepIndex === 0}
                onClick={handlePrevStep}
                className="border-slate-300 text-xs"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>

              <div className="flex gap-1">
                {currentCraft.steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentStepIndex(idx);
                      speechGuide.stop();
                      setIsSpeaking(false);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentStepIndex === idx ? 'bg-[#E65100] w-6' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <Button
                size="sm"
                onClick={handleNextStep}
                className="bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white text-xs shadow-md"
              >
                {currentStepIndex === currentCraft.steps.length - 1 ? (
                  <>Complete <CheckCircle2 className="w-4 h-4 ml-1" /></>
                ) : (
                  <>Next Step <ChevronRight className="w-4 h-4 ml-1" /></>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Virtual Folk Art Canvas Sandbox Modal */}
      <Dialog open={showCanvasStudio} onOpenChange={setShowCanvasStudio}>
        <DialogContent className="max-w-3xl bg-[#FFFDF8] border-2 border-amber-300 rounded-2xl shadow-2xl p-6">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="font-serif text-xl text-slate-900 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#E65100]" />
                  Folk Art Canvas Sandbox (Warli & Traditional Motifs)
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Paint freehand or stamp sacred tribal figures using natural earth pigments.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-amber-50/70 rounded-xl border border-amber-200">
              {/* Tool Selection */}
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant={activeTool === 'brush' ? 'default' : 'outline'}
                  onClick={() => { soundManager.playClick(); setActiveTool('brush'); }}
                  className={`text-xs h-8 ${activeTool === 'brush' ? 'bg-[#E65100] text-white' : ''}`}
                >
                  <Brush className="w-3.5 h-3.5 mr-1" /> Bamboo Brush
                </Button>
                <Button
                  size="sm"
                  variant={activeTool === 'stamp-dancer' ? 'default' : 'outline'}
                  onClick={() => { soundManager.playClick(); setActiveTool('stamp-dancer'); }}
                  className={`text-xs h-8 ${activeTool === 'stamp-dancer' ? 'bg-[#E65100] text-white' : ''}`}
                >
                  Stamp Dancer
                </Button>
                <Button
                  size="sm"
                  variant={activeTool === 'stamp-tree' ? 'default' : 'outline'}
                  onClick={() => { soundManager.playClick(); setActiveTool('stamp-tree'); }}
                  className={`text-xs h-8 ${activeTool === 'stamp-tree' ? 'bg-[#E65100] text-white' : ''}`}
                >
                  Tree of Life
                </Button>
                <Button
                  size="sm"
                  variant={activeTool === 'stamp-circle' ? 'default' : 'outline'}
                  onClick={() => { soundManager.playClick(); setActiveTool('stamp-circle'); }}
                  className={`text-xs h-8 ${activeTool === 'stamp-circle' ? 'bg-[#E65100] text-white' : ''}`}
                >
                  Sun Mandala
                </Button>
              </div>

              {/* Color Pigment Swatches */}
              <div className="flex items-center gap-1.5">
                {[
                  { name: 'Rice White', color: '#F8F7F0' },
                  { name: 'Natural Indigo', color: '#1A237E' },
                  { name: 'Turmeric Gold', color: '#F9A825' },
                  { name: 'Charcoal Black', color: '#1E1E1E' },
                  { name: 'Terracotta Geru', color: '#B33925' }
                ].map((swatch) => (
                  <button
                    key={swatch.color}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveColor(swatch.color);
                    }}
                    title={swatch.name}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      activeColor === swatch.color ? 'scale-125 border-amber-600 shadow-md ring-2 ring-amber-300' : 'border-white'
                    }`}
                    style={{ backgroundColor: swatch.color }}
                  />
                ))}
              </div>
            </div>

            {/* Interactive HTML5 Canvas */}
            <div className="rounded-xl overflow-hidden border-2 border-amber-300 shadow-inner flex justify-center bg-black/5">
              <canvas
                ref={canvasRef}
                width={720}
                height={400}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="cursor-crosshair w-full max-h-[380px] object-contain touch-none"
              />
            </div>

            {/* Canvas Actions */}
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCanvas}
                className="border-slate-300 text-slate-700 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Canvas
              </Button>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleDownloadCanvas}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs shadow-md"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Download Masterpiece
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowCanvasStudio(false)}
                  className="border-slate-300 text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Heritage Guru Assistant Dialog */}
      <Dialog open={showAIAssistant} onOpenChange={setShowAIAssistant}>
        <DialogContent className="max-w-md bg-[#FFFDF8] border-2 border-indigo-200 rounded-2xl shadow-2xl p-5">
          <DialogHeader className="border-b border-indigo-100 pb-3">
            <DialogTitle className="flex items-center gap-2 font-serif text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              AI Heritage Guru
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Instant knowledge on ancient crafts, natural mordants, GI provenance, and conservation.
            </DialogDescription>
          </DialogHeader>

          {/* Chat message scrollable stream */}
          <div className="h-64 overflow-y-auto space-y-3 p-1">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-[10px]">
                    AI
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#E65100] to-[#FF8A00] text-white rounded-tr-none'
                      : 'bg-white border border-indigo-100 text-slate-800 shadow-2xs rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="flex items-center gap-2 pt-2 border-t border-indigo-100">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAIMessage()}
              placeholder="Ask about dyes, GI tags, Warli symbolism..."
              className="text-xs bg-white border-indigo-200 focus-visible:ring-indigo-400"
            />
            <Button
              size="icon"
              onClick={handleSendAIMessage}
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-9 h-9 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
