"use client";

import React, { useState } from 'react';
import { StoreItem, BlockchainCertificate, Language } from '@/types/heritage';
import { initialStoreItems } from '@/data/heritageData';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  CheckCircle2, 
  Award, 
  FileCheck,
  Tag,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface ArtisanMarketplaceProps {
  currentLanguage: Language;
  userPoints: number;
  onDeductPoints: (points: number) => boolean;
  onMintCertificate: (cert: BlockchainCertificate) => void;
  onOpenVerifyModalWithCert: (cert: BlockchainCertificate) => void;
}

export const ArtisanMarketplace: React.FC<ArtisanMarketplaceProps> = ({
  currentLanguage,
  userPoints,
  onDeductPoints,
  onMintCertificate,
  onOpenVerifyModalWithCert
}) => {
  const [items, setItems] = useState<StoreItem[]>(initialStoreItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [checkoutItem, setCheckoutItem] = useState<StoreItem | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccessCert, setPaymentSuccessCert] = useState<BlockchainCertificate | null>(null);

  const categories = ['All', 'Textiles', 'Tribal Art', 'Masks', 'Museum Pass'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const handleStartCheckout = (item: StoreItem) => {
    soundManager.playClick();
    setCheckoutItem(item);
    setPaymentSuccessCert(null);
  };

  const handleConfirmUPIPayment = () => {
    if (!checkoutItem) return;
    soundManager.playAlert();
    setIsProcessingPayment(true);

    setTimeout(() => {
      soundManager.playSuccess();
      setIsProcessingPayment(false);

      // Generate verifiable certificate
      const randomBlock = 19840000 + Math.floor(Math.random() * 9000);
      const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const cert: BlockchainCertificate = {
        certificateId: `HHG-GI-${checkoutItem.id}-${Date.now().toString().slice(-4)}`,
        artifactName: checkoutItem.name,
        craftType: checkoutItem.category,
        artisanName: checkoutItem.artisanName,
        originRegion: 'Authenticated Artisan Guild, India',
        timestamp: new Date().toUTCString(),
        blockNumber: randomBlock,
        txHash: `0x${randomHex}`,
        ipfsHash: `Qm${randomHex.slice(0, 44)}`,
        sha256Digest: randomHex,
        materialsUsed: ['Natural Sourced Raw Materials', 'Hereditary Guild Certified'],
        geographicalIndicationTag: 'GI-APPL-VALIDATED'
      };

      onMintCertificate(cert);
      setPaymentSuccessCert(cert);
      toast.success(`🎉 Acquisition confirmed! Cryptographic GI certificate #${cert.certificateId} minted on Polygon!`);
    }, 2000);
  };

  const handleRedeemWithPoints = (item: StoreItem) => {
    if (userPoints < item.costPoints) {
      soundManager.playError();
      toast.error(`Insufficient points. You have ${userPoints} pts, but need ${item.costPoints} pts.`);
      return;
    }

    const success = onDeductPoints(item.costPoints);
    if (success) {
      soundManager.playSuccess();
      const randomBlock = 19842000 + Math.floor(Math.random() * 5000);
      const cert: BlockchainCertificate = {
        certificateId: `HHG-PTS-${item.id}-${Date.now().toString().slice(-4)}`,
        artifactName: item.name,
        craftType: item.category,
        artisanName: item.artisanName,
        originRegion: 'Redeemed via Heritage Scholar Guild',
        timestamp: new Date().toUTCString(),
        blockNumber: randomBlock,
        txHash: `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
        ipfsHash: `QmPointsVault${Date.now()}`,
        sha256Digest: `sha256-${Date.now()}`,
        materialsUsed: ['Curator Guild Certified'],
        geographicalIndicationTag: 'GI-PATRON-TOKEN'
      };

      onMintCertificate(cert);
      toast.success(`Redeemed ${item.name} for ${item.costPoints} pts! Certificate added to your passport.`);
      onOpenVerifyModalWithCert(cert);
    }
  };

  return (
    <div className="space-y-6">
      {/* Marketplace Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-xl border border-amber-300/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-amber-200" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">
              {getTranslation('marketplaceTitle', currentLanguage)}
            </h2>
            <Badge className="bg-white/20 text-white border-white/30 text-[10px]">
              100% DIRECT ARTISAN PATRONAGE
            </Badge>
          </div>
          <p className="text-sm text-amber-100 mt-1 max-w-2xl">
            Acquire masterwork craft heirlooms directly from registered GI guilds. Every purchase mints an immutable cryptographic provenance certificate.
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-right">
          <span className="text-[10px] text-amber-200 uppercase font-semibold block">Your Heritage Vault</span>
          <span className="font-mono text-xl font-bold text-white">{userPoints} Points Available</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundManager.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-[#E65100] text-white shadow-sm'
                : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <Card key={item.id} className="rounded-2xl overflow-hidden bg-white border-amber-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
            <div>
              <div className="aspect-4/3 overflow-hidden relative bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5">
                  <Badge className="bg-black/70 text-amber-300 backdrop-blur-md border border-white/20 text-[10px]">
                    GI Protected
                  </Badge>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-amber-800">{item.category}</span>
                  <span>{item.stock} in stock</span>
                </div>

                <h3 className="font-serif font-bold text-slate-900 text-base line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {item.description}
                </p>

                <div className="text-[11px] text-slate-500 pt-1">
                  Artisan: <span className="font-semibold text-slate-800">{item.artisanName}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 space-y-2 border-t border-slate-100 mt-2">
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="text-[10px] text-slate-400 block">Price</span>
                  <span className="font-serif text-lg font-bold text-slate-900">₹{item.cashEquivalent}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-600 block">Points Option</span>
                  <span className="font-mono text-sm font-bold text-amber-700">{item.costPoints} pts</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  onClick={() => handleStartCheckout(item)}
                  className="bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white text-xs shadow-xs"
                >
                  Buy (UPI)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRedeemWithPoints(item)}
                  className="border-amber-300 text-amber-900 hover:bg-amber-50 text-xs"
                >
                  Redeem Pts
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Simulated UPI & Cryptographic Minting Checkout Modal */}
      <Dialog open={!!checkoutItem} onOpenChange={() => setCheckoutItem(null)}>
        <DialogContent className="max-w-md bg-[#FFFDF8] border-2 border-amber-300 rounded-2xl shadow-2xl p-6">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-slate-900">
              {paymentSuccessCert ? 'Soulbound Authenticity Minted' : 'Instant UPI & GI Minting'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              {paymentSuccessCert
                ? 'Your transaction is confirmed on the Polygon Heritage Ledger.'
                : 'Scan with any UPI App (Google Pay, PhonePe, Paytm, BHIM) to support the artisan.'}
            </DialogDescription>
          </DialogHeader>

          {checkoutItem && !paymentSuccessCert && (
            <div className="space-y-4">
              {/* Item Summary */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center gap-3">
                <img src={checkoutItem.image} alt={checkoutItem.name} className="w-14 h-14 rounded-lg object-cover" />
                <div className="text-xs space-y-0.5">
                  <h4 className="font-semibold text-slate-900">{checkoutItem.name}</h4>
                  <p className="text-slate-500">{checkoutItem.artisanName}</p>
                  <p className="font-mono font-bold text-[#E65100]">₹{checkoutItem.cashEquivalent}</p>
                </div>
              </div>

              {/* Dynamic Simulated UPI QR Code */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center space-y-2">
                <div className="w-44 h-44 bg-slate-900 p-2 rounded-xl flex items-center justify-center shadow-inner relative">
                  <QrCode className="w-36 h-36 text-amber-400" />
                  <div className="absolute bg-white px-2 py-0.5 rounded text-[9px] font-bold text-slate-900 shadow">
                    UPI: heritage@artisan
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span>GPay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>BHIM</span>
                </div>
              </div>

              {/* Pay Now Button */}
              <Button
                disabled={isProcessingPayment}
                onClick={handleConfirmUPIPayment}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md text-xs py-5"
              >
                {isProcessingPayment ? (
                  <>Minting Cryptographic Proof on Blockchain...</>
                ) : (
                  <>Simulate Successful UPI Payment (₹{checkoutItem.cashEquivalent})</>
                )}
              </Button>
            </div>
          )}

          {/* Success State */}
          {paymentSuccessCert && (
            <div className="space-y-4 text-center py-2 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-slate-900">Certificate Minted!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Provenance ID: <span className="font-mono font-bold text-[#E65100]">{paymentSuccessCert.certificateId}</span>
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs font-mono space-y-1">
                <div className="text-slate-500 text-[10px]">TRANSACTION HASH:</div>
                <div className="break-all text-[10px] text-slate-800">{paymentSuccessCert.txHash}</div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setCheckoutItem(null);
                    onOpenVerifyModalWithCert(paymentSuccessCert);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#1A237E] to-[#283593] text-white text-xs"
                >
                  <FileCheck className="w-4 h-4 mr-1.5" /> Inspect Proof
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCheckoutItem(null)}
                  className="border-slate-300 text-xs"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
