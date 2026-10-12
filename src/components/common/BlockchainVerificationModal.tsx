"use client";

import React, { useState } from 'react';
import { BlockchainCertificate } from '@/types/heritage';
import { soundManager } from '@/lib/soundEffects';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  QrCode, 
  ExternalLink, 
  FileCheck, 
  Sparkles,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

interface BlockchainVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate?: BlockchainCertificate | null;
}

export const BlockchainVerificationModal: React.FC<BlockchainVerificationModalProps> = ({
  isOpen,
  onClose,
  certificate: propCertificate
}) => {
  const [searchHash, setSearchHash] = useState('');
  
  const defaultCert: BlockchainCertificate = propCertificate || {
    certificateId: 'HHG-GI-IN-2026-8941',
    artifactName: 'Authentic Dabu Resist Indigo Stole',
    craftType: 'Mud-Resist Hand-Block Printing',
    artisanName: 'Ustad Ramkishan Chippa (GI Certified Artisan #492)',
    originRegion: 'Bagru & Akola, Rajasthan, India',
    timestamp: '2026-08-14 11:28:42 UTC',
    blockNumber: 19842103,
    txHash: '0x7f9a2e6b8c1d4e0a9f5b2c7e1a3d8f4b0e6c2a8f9d1e5b7a3c0e2f4a6b8d9c1e',
    ipfsHash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
    sha256Digest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    materialsUsed: ['Bagru Clay', 'Natural Indigofera Tinctoria', 'Organic Cotton', 'Teakwood Hand-block'],
    geographicalIndicationTag: 'GI-APPL-NO-178 (Bagru Hand Block Prints)'
  };

  const cert = defaultCert;

  const handleCopy = (text: string, label: string) => {
    soundManager.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#FFFDF8] border-2 border-amber-300/80 rounded-2xl shadow-2xl p-6 overflow-hidden">
        <DialogHeader className="border-b border-amber-200/60 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="font-serif text-xl text-slate-900 flex items-center gap-2">
                  Cryptographic Provenance Certificate
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">
                    VERIFIED ON-CHAIN
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Government GI Tag & Soulbound Authenticity Registry (ERC-721 Heritage Protocol)
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 pt-2 max-h-[70vh] overflow-y-auto pr-1">
          {/* Certificate Header Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-300/60 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
                Certificate ID: {cert.certificateId}
              </span>
              <h3 className="font-serif font-bold text-slate-900 text-lg">
                {cert.artifactName}
              </h3>
              <p className="text-xs text-slate-600">
                Master Artisan: <span className="font-semibold text-slate-800">{cert.artisanName}</span>
              </p>
            </div>

            {/* Stylized QR Code generator */}
            <div className="w-20 h-20 bg-white p-1.5 rounded-lg border border-amber-200 shadow-xs flex flex-col items-center justify-center text-center">
              <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center p-1 text-white relative">
                <QrCode className="w-full h-full text-amber-400" />
                <span className="absolute text-[6px] bottom-0.5 font-mono text-emerald-300 bg-black/80 px-1 rounded">VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Geographical Indication Seal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
              <span className="text-slate-500 font-medium">Geographical Indication (GI):</span>
              <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{cert.geographicalIndicationTag}</span>
              </div>
              <p className="text-[11px] text-slate-500">{cert.originRegion}</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
              <span className="text-slate-500 font-medium">Ethereum / Polygon Block:</span>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">#{cert.blockNumber}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">
                  Finalized (1,492 confirmations)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{cert.timestamp}</p>
            </div>
          </div>

          {/* Cryptographic Hashes */}
          <div className="space-y-2.5 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-500 font-medium">Transaction Hash (TxHash):</span>
                <button 
                  onClick={() => handleCopy(cert.txHash, 'Transaction Hash')}
                  className="text-amber-700 hover:text-amber-900 flex items-center gap-1 text-[11px]"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[10px] break-all text-slate-800">
                {cert.txHash}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-500 font-medium">IPFS Decentralized Metadata CID:</span>
                <button 
                  onClick={() => handleCopy(cert.ipfsHash, 'IPFS CID')}
                  className="text-amber-700 hover:text-amber-900 flex items-center gap-1 text-[11px]"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[10px] break-all text-slate-800">
                {cert.ipfsHash}
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-medium">Natural Materials Verified:</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {cert.materialsUsed.map((mat, i) => (
                  <span key={i} className="bg-amber-100/70 text-amber-900 text-[10px] font-medium px-2 py-0.5 rounded-md border border-amber-200">
                    ✓ {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              onClick={() => {
                soundManager.playSuccess();
                toast.success('Certificate download initiated in PDF/A standard.');
              }}
              className="flex-1 bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white shadow-md"
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Download Official Certificate
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
