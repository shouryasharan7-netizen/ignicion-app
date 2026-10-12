"use client";

import React, { useState } from 'react';
import { Craft, BlockchainCertificate, Language } from '@/types/heritage';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { 
  Sparkles, 
  Upload, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  ShieldCheck, 
  Camera, 
  Tag, 
  FileText, 
  Layers,
  Flame
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ArtisanUploadStudioProps {
  currentLanguage: Language;
  onPublishCraft: (newCraft: Craft, cert: BlockchainCertificate) => void;
}

export const ArtisanUploadStudio: React.FC<ArtisanUploadStudioProps> = ({
  currentLanguage,
  onPublishCraft
}) => {
  const [craftName, setCraftName] = useState('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState<'textiles' | 'painting' | 'sculpture' | 'masks' | 'pottery'>('textiles');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('350');
  const [materials, setMaterials] = useState('Organic Indigo, River Mud, Hand-carved Teak Block');
  const [previewImage, setPreviewImage] = useState<string>('https://images.unsplash.com/photo-1606744888344-493238955de0?q=80&w=800&auto=format&fit=crop');
  
  // Microphone recording simulation
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);

  const toggleRecording = () => {
    soundManager.playClick();
    if (isRecordingAudio) {
      setIsRecordingAudio(false);
      setHasRecordedAudio(true);
      toast.success('Oral history story audio recorded and processed!');
    } else {
      setIsRecordingAudio(true);
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 15) {
            clearInterval(timer);
            setIsRecordingAudio(false);
            setHasRecordedAudio(true);
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!craftName.trim() || !region.trim()) {
      toast.error('Please enter Craft Title and Region.');
      return;
    }

    soundManager.playSuccess();

    const randomId = Date.now();
    const certId = `HHG-FORGE-${randomId.toString().slice(-4)}`;
    const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const cert: BlockchainCertificate = {
      certificateId: certId,
      artifactName: craftName,
      craftType: category,
      artisanName: 'Master Artisan (Self-Certified)',
      originRegion: region,
      timestamp: new Date().toUTCString(),
      blockNumber: 19845012,
      txHash: `0x${randomHex}`,
      ipfsHash: `QmForgeNode${randomId}`,
      sha256Digest: randomHex,
      materialsUsed: materials.split(',').map((s) => s.trim()),
      geographicalIndicationTag: 'GI-APPL-DECENTRALIZED-REGISTRY'
    };

    const newCraft: Craft = {
      id: randomId,
      name: craftName,
      nameKey: 'customCraft',
      region: region,
      regionKey: 'customRegion',
      state: region,
      category: category,
      image: previewImage,
      price: parseInt(price) || 300,
      description: description || 'Mastercrafted traditional item preserved via Hybrid Heritage Guardian.',
      descriptionKey: 'customDesc',
      originEra: 'Contemporary Master Lineage',
      materials: materials.split(',').map((s) => s.trim()),
      masterArtisan: 'Verified Master Guild Member',
      rating: 5.0,
      reviewsCount: 1,
      steps: [
        {
          stepNumber: 1,
          title: 'Preparation & Natural Medium Blending',
          instructions: 'Prepare traditional binding medium and raw material surfaces.',
          audioText: {
            en: 'Welcome to this masterclass. Step one prepares the ancient natural binders.',
            hi: 'इस मास्टरक्लास में आपका स्वागत है। पहला चरण प्राकृतिक माध्यम तैयार करना है।',
            mr: 'या मास्टरक्लासमध्ये आपले स्वागत आहे. पहिली पायरी नैसर्गिक रंग तयार करणे आहे.'
          },
          tip: 'Always work with natural sunlight to gauge authentic hue values.'
        }
      ]
    };

    onPublishCraft(newCraft, cert);
    toast.success(`🎉 Masterwork published! Blockchain Certificate #${certId} minted.`);
    
    // Reset form
    setCraftName('');
    setRegion('');
    setDescription('');
    setHasRecordedAudio(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Studio Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-950 text-white shadow-xl border border-amber-400/30">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <h2 className="font-serif text-2xl font-bold tracking-tight">
            {getTranslation('forgeTitle', currentLanguage)}
          </h2>
          <Badge className="bg-amber-400/20 text-amber-300 border-amber-300/40 text-[10px]">
            CREATOR PORTAL
          </Badge>
        </div>
        <p className="text-sm text-slate-300 mt-1">
          Preserve your lineage craft. Upload high-res visuals, record oral folklore history, and mint a verifiable GI provenance certificate.
        </p>
      </div>

      <Card className="p-6 rounded-2xl bg-white border-amber-200/80 shadow-md">
        <form onSubmit={handlePublish} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Craft Title / Masterwork Name *
              </label>
              <Input
                value={craftName}
                onChange={(e) => setCraftName(e.target.value)}
                placeholder="e.g. Natural Indigo Block Print Dupatta"
                required
                className="bg-amber-50/30 border-amber-200 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Authentic Heritage Region / Village *
              </label>
              <Input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. Akola, Rajasthan or Charida, Purulia"
                required
                className="bg-amber-50/30 border-amber-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="w-full h-9 rounded-md border border-amber-200 bg-amber-50/30 px-3 py-1 text-sm text-slate-800"
              >
                <option value="textiles">Textiles & Weaving</option>
                <option value="painting">Scroll & Folk Painting</option>
                <option value="sculpture">Metal & Lost-Wax Casting</option>
                <option value="masks">Papier-Mâché & Dance Masks</option>
                <option value="pottery">Terracotta & Blue Pottery</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Direct Patronage Price (₹)
              </label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="350"
                className="bg-amber-50/30 border-amber-200 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Natural Materials & Organic Dyes Used
            </label>
            <Input
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              placeholder="e.g. Indigo, Rice paste, Acacia gum, River clay"
              className="bg-amber-50/30 border-amber-200 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Oral History / Cultural Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell the folklore, songs, and generational lineage behind this creation..."
              rows={3}
              className="bg-amber-50/30 border-amber-200 text-sm"
            />
          </div>

          {/* Oral Lore Microphone Recording Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-[#E65100]" /> Oral History Audio Story
                </span>
                <p className="text-[11px] text-amber-800">
                  Record traditional songs or oral explanations for the digital archives.
                </p>
              </div>

              <Button
                type="button"
                size="sm"
                onClick={toggleRecording}
                className={`text-xs ${
                  isRecordingAudio
                    ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                    : hasRecordedAudio
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-[#1A237E] hover:bg-[#101758] text-white'
                }`}
              >
                {isRecordingAudio ? (
                  <>Stop ({recordingSeconds}s)</>
                ) : hasRecordedAudio ? (
                  <>Re-record Audio</>
                ) : (
                  <>Record Voice</>
                )}
              </Button>
            </div>

            {isRecordingAudio && (
              <div className="flex items-center gap-1.5 justify-center py-2">
                {[4, 12, 24, 18, 30, 16, 28, 10, 20].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#E65100] rounded-full animate-bounce"
                    style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            )}

            {hasRecordedAudio && !isRecordingAudio && (
              <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Audio oral story stored for IPFS archival.
              </div>
            )}
          </div>

          {/* Visual Showcase Preview URL Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Visual Showcase Image URL
            </label>
            <div className="flex gap-2">
              <Input
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                placeholder="https://..."
                className="bg-amber-50/30 border-amber-200 text-sm"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  soundManager.playClick();
                  toast.info('Sample masterwork photograph loaded.');
                }}
                className="text-xs"
              >
                Sample Image
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#E65100] via-[#FF8A00] to-[#D4AF37] hover:opacity-90 text-white shadow-lg py-5 text-sm font-semibold"
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            Publish Masterpiece & Mint Cryptographic Provenance Seal
          </Button>
        </form>
      </Card>
    </div>
  );
};
