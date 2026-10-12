"use client";

import React, { useState, useEffect } from 'react';
import { Museum, Language, IoTSensorData } from '@/types/heritage';
import { initialMuseums } from '@/data/heritageData';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { 
  Activity, 
  Thermometer, 
  Droplets, 
  Sun, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  Wind, 
  RotateCcw, 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  AlertTriangle,
  Fan
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface IoTDashboardProps {
  currentLanguage: Language;
  onEarnPoints: (points: number, reason: string) => void;
}

export const IoTDashboard: React.FC<IoTDashboardProps> = ({
  currentLanguage,
  onEarnPoints
}) => {
  const [museums, setMuseums] = useState<Museum[]>(initialMuseums);
  const [selectedMuseumId, setSelectedMuseumId] = useState<number>(1);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [telemetryLogs, setTelemetryLogs] = useState<Array<{ time: string; msg: string; type: 'safe' | 'alert' | 'action' }>>([
    { time: '14:28:10', msg: 'HVAC Air Curtains operating in Gallery 4 (Bhoota Cult Wood)', type: 'safe' },
    { time: '14:29:45', msg: 'Slight humidity variance detected in Raja Dinkar Kelkar Museum (59.4%)', type: 'alert' }
  ]);

  const activeMuseum = museums.find((m) => m.id === selectedMuseumId) || museums[0];

  // Dynamic live sensor jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMuseums((prevMuseums) =>
        prevMuseums.map((museum) => {
          if (museum.id === selectedMuseumId) {
            // Apply slight organic fluctuation
            const tempDelta = (Math.random() - 0.5) * 0.2;
            const humDelta = (Math.random() - 0.5) * 0.4;
            const luxDelta = (Math.random() - 0.5) * 5;
            const vibDelta = (Math.random() - 0.5) * 0.005;

            const newTemp = Math.round((museum.sensors.temp + tempDelta) * 10) / 10;
            const newHum = Math.round((museum.sensors.humidity + humDelta) * 10) / 10;
            const newLux = Math.max(100, Math.round(museum.sensors.light + luxDelta));
            const newVib = Math.max(0.01, Math.round((museum.sensors.vibration + vibDelta) * 100) / 100);

            // Determine status
            let newStatus: 'safe' | 'warning' | 'critical' = 'safe';
            if (newHum > 58 || newTemp > 24.5 || newLux > 350) {
              newStatus = 'warning';
            }
            if (newHum > 65 || newTemp > 27) {
              newStatus = 'critical';
            }

            return {
              ...museum,
              sensors: {
                ...museum.sensors,
                temp: newTemp,
                humidity: newHum,
                light: newLux,
                vibration: newVib,
                lastUpdated: 'Live Telemetry (Synced)',
                status: newStatus
              }
            };
          }
          return museum;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedMuseumId]);

  // Action: Automated Climate Buffer engagement
  const handleTriggerClimateBuffer = () => {
    soundManager.playAlert();
    setIsBuffering(true);
    toast.info('Engaging automated dry-gas nitrogen buffer and desiccant HVAC system...');

    setTimeout(() => {
      soundManager.playSuccess();
      setMuseums((prevMuseums) =>
        prevMuseums.map((m) => {
          if (m.id === selectedMuseumId) {
            return {
              ...m,
              sensors: {
                ...m.sensors,
                temp: 21.5,
                humidity: 46.5,
                light: 220,
                vibration: 0.03,
                status: 'safe',
                lastUpdated: 'Stabilized by Automated Guardian'
              }
            };
          }
          return m;
        })
      );

      setIsBuffering(false);
      const newLog = {
        time: new Date().toLocaleTimeString(),
        msg: `Micro-climate successfully stabilized at ${activeMuseum.name}. Relative Humidity normalized to 46.5%.`,
        type: 'action' as const
      };
      setTelemetryLogs((prev) => [newLog, ...prev.slice(0, 7)]);
      toast.success('Micro-climate restored to museum-grade conservation baseline! +75 Heritage XP');
      onEarnPoints(75, `Prevented conservation decay at ${activeMuseum.name}`);
    }, 2000);
  };

  // Calculate Health Index (0-100)
  const calculateHealthScore = (sensors: IoTSensorData) => {
    let score = 100;
    if (sensors.humidity > 55) score -= (sensors.humidity - 55) * 3;
    if (sensors.temp > 23) score -= (sensors.temp - 23) * 4;
    if (sensors.light > 300) score -= (sensors.light - 300) * 0.08;
    return Math.max(40, Math.min(100, Math.round(score)));
  };

  const healthScore = calculateHealthScore(activeMuseum.sensors);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-amber-950 text-white shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">
              {getTranslation('iotHeaderTitle', currentLanguage)}
            </h2>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/40 text-[10px]">
              SUB-SECOND STREAM
            </Badge>
          </div>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            {getTranslation('iotHeaderSubtitle', currentLanguage)}
          </p>
        </div>

        <Button
          disabled={isBuffering}
          onClick={handleTriggerClimateBuffer}
          className="bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white shadow-lg text-xs"
        >
          <Fan className={`w-4 h-4 mr-1.5 ${isBuffering ? 'animate-spin' : ''}`} />
          {isBuffering ? 'Engaging HVAC...' : getTranslation('triggerDehumidifier', currentLanguage)}
        </Button>
      </div>

      {/* Museum Selection Carousel/Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {museums.map((m) => {
          const isSelected = selectedMuseumId === m.id;
          const score = calculateHealthScore(m.sensors);
          return (
            <Card
              key={m.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedMuseumId(m.id);
              }}
              className={`p-4 cursor-pointer transition-all border-2 rounded-xl relative overflow-hidden ${
                isSelected
                  ? 'border-[#E65100] bg-white shadow-lg scale-102 ring-2 ring-orange-200'
                  : 'border-slate-200 bg-white/70 hover:bg-white hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 line-clamp-1">
                    {m.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{m.city}, {m.state}</span>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={`text-[10px] ${
                    m.sensors.status === 'safe'
                      ? 'border-emerald-300 text-emerald-700 bg-emerald-50'
                      : 'border-amber-300 text-amber-700 bg-amber-50 animate-pulse'
                  }`}
                >
                  {m.sensors.status === 'safe' ? 'Safe' : 'Alert'}
                </Badge>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-500">Health Index:</span>
                <span className={`font-bold font-mono ${score > 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {score}%
                </span>
              </div>
              <Progress value={score} className="h-1.5 mt-1 bg-slate-100" />
            </Card>
          );
        })}
      </div>

      {/* Active Museum Deep Dive & Live Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Key Artifact & Live Status */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5 rounded-2xl bg-white border-amber-200/80 shadow-md space-y-4">
            <div className="aspect-4/3 rounded-xl overflow-hidden relative shadow-sm border border-slate-200">
              <img
                src={activeMuseum.image}
                alt={activeMuseum.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300">Monitored National Treasure</span>
                <p className="text-sm font-semibold">{activeMuseum.keyArtifact}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Lead Curator:</span>
                <span className="font-semibold text-slate-800">{activeMuseum.curator}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Protected Antiquities:</span>
                <span className="font-semibold text-slate-800">{activeMuseum.artifactsCount.toLocaleString()} items</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Telemetry Sync:</span>
                <span className="font-mono text-emerald-600 font-semibold">{activeMuseum.sensors.lastUpdated}</span>
              </div>
            </div>

            {/* Overall Health Gauge */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-center space-y-2">
              <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
                Conservation Health Score
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className={`font-serif text-4xl font-bold ${healthScore > 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {healthScore}
                </span>
                <span className="text-slate-400 font-serif text-2xl">/100</span>
              </div>
              <p className="text-[11px] text-amber-800">
                {healthScore > 85
                  ? 'All micro-environmental parameters within optimal archeological limits.'
                  : 'Environmental deviation detected. Action recommended.'}
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column: Live Sensor Telemetry Gauges */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sensor 1: Temperature */}
            <Card className="p-5 rounded-2xl bg-white border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      {getTranslation('tempLabel', currentLanguage)}
                    </span>
                    <h3 className="font-mono text-2xl font-bold text-slate-900">
                      {activeMuseum.sensors.temp}°C
                    </h3>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] bg-rose-50 border-rose-200 text-rose-700">
                  Target: 20-22°C
                </Badge>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Thermal Stability: ±0.3°C</span>
                <span className="text-emerald-600 font-medium">Optimal Range</span>
              </div>
            </Card>

            {/* Sensor 2: Relative Humidity */}
            <Card className={`p-5 rounded-2xl bg-white shadow-sm relative overflow-hidden border-2 ${
              activeMuseum.sensors.humidity > 55 ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    activeMuseum.sensors.humidity > 55
                      ? 'bg-amber-100 text-amber-700 border-amber-300'
                      : 'bg-blue-50 text-blue-600 border-blue-200'
                  }`}>
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      {getTranslation('humidityLabel', currentLanguage)}
                    </span>
                    <h3 className="font-mono text-2xl font-bold text-slate-900">
                      {activeMuseum.sensors.humidity}%
                    </h3>
                  </div>
                </div>
                <Badge variant="outline" className={`text-[10px] ${
                  activeMuseum.sensors.humidity > 55
                    ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  Safe: 45-55%
                </Badge>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Desiccant buffer status:</span>
                <span className={activeMuseum.sensors.humidity > 55 ? 'text-amber-700 font-semibold' : 'text-emerald-600 font-medium'}>
                  {activeMuseum.sensors.humidity > 55 ? 'Buffer recommended' : 'Balanced'}
                </span>
              </div>
            </Card>

            {/* Sensor 3: Lux Exposure */}
            <Card className="p-5 rounded-2xl bg-white border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      {getTranslation('lightLabel', currentLanguage)}
                    </span>
                    <h3 className="font-mono text-2xl font-bold text-slate-900">
                      {activeMuseum.sensors.light} Lux
                    </h3>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] bg-amber-50 border-amber-200 text-amber-700">
                  Max: 300 Lux
                </Badge>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>UV Filter: 99.8% Attenuation</span>
                <span className="text-emerald-600 font-medium">Safe for Silks</span>
              </div>
            </Card>

            {/* Sensor 4: Micro-Vibration & AQI */}
            <Card className="p-5 rounded-2xl bg-white border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      {getTranslation('vibrationLabel', currentLanguage)}
                    </span>
                    <h3 className="font-mono text-2xl font-bold text-slate-900">
                      {activeMuseum.sensors.vibration} mm/s
                    </h3>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] bg-purple-50 border-purple-200 text-purple-700">
                  AQI: {activeMuseum.sensors.airQualityAQI}
                </Badge>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Seismic/Transit isolation:</span>
                <span className="text-emerald-600 font-medium">Vibration Damped</span>
              </div>
            </Card>
          </div>

          {/* Conservation Incident & Action Logs */}
          <Card className="p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Autonomous Conservation Audit Trail
                </h4>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">ENCRYPTED LOG</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {telemetryLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[11px]">
                  <span className="text-slate-500">{log.time}</span>
                  <span className={
                    log.type === 'action'
                      ? 'text-emerald-400 font-semibold'
                      : log.type === 'alert'
                      ? 'text-amber-400'
                      : 'text-slate-300'
                  }>
                    {log.type === 'action' ? '✓ ' : log.type === 'alert' ? '⚠ ' : '• '}
                    {log.msg}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
