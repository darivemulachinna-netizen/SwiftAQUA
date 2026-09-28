import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, PhoneOff, X, Mic, Volume2, ShieldCheck, CheckCircle2, UserCheck, Clock, ArrowRight } from 'lucide-react';

interface PhoneDialerModalProps {
  isOpen: boolean;
  onClose: () => void;
  productContext?: string;
}

export const PhoneDialerModal: React.FC<PhoneDialerModalProps> = ({
  isOpen,
  onClose,
  productContext,
}) => {
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState<number>(0);
  const [ivrMessage, setIvrMessage] = useState<string>('');
  const [dialedDigits, setDialedDigits] = useState<string>('');
  const [callbackPhone, setCallbackPhone] = useState<string>('');
  const [callbackRequested, setCallbackRequested] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  if (!isOpen) return null;

  const startCall = () => {
    setCallState('calling');
    setDialedDigits('');
    setCallDuration(0);
    setIvrMessage('Connecting to AquaPure Central Water Dispatch...');

    setTimeout(() => {
      setCallState('connected');
      if (productContext) {
        setIvrMessage(`Connected to Dispatch. We see your inquiry for: "${productContext}". Press 0 to confirm with operator or press 1 to fast-dispatch.`);
      } else {
        setIvrMessage('Welcome to AquaPure Express Dispatch! Press 1 for 20L Cans, Press 2 for House Tanker, Press 3 for Functions/Weddings, Press 0 for Live Agent.');
      }
    }, 1800);
  };

  const endCall = () => {
    setCallState('ended');
    setIvrMessage('Call ended. Thank you for choosing AquaPure.');
    setTimeout(() => {
      setCallState('idle');
    }, 1500);
  };

  const handleKeyPress = (digit: string) => {
    setDialedDigits((prev) => prev + digit);

    if (callState === 'connected') {
      if (digit === '1') {
        setIvrMessage('Option 1 Selected: 20L Purified Mineral Cans. A dispatch agent is confirming your address in queue. Stay on the line...');
      } else if (digit === '2') {
        setIvrMessage('Option 2 Selected: House Overhead & Sump Tanker (1,000L - 3,000L). Routing to Residential Fleet Supervisor...');
      } else if (digit === '3') {
        setIvrMessage('Option 3 Selected: Marriage & Function Bulk Potable Water. Routing to Priority Catering & Event Desk...');
      } else if (digit === '4') {
        setIvrMessage('Option 4 Selected: Water Quality Lab Verification. Today\'s Batch TDS is 92 ppm, pH 7.42, 100% Sterile. Press 0 for test certificate.');
      } else if (digit === '0') {
        setIvrMessage('Routing to Senior Dispatch Officer... "Hello! This is AquaPure Dispatch. How many litres of water can we deliver for you today?"');
      } else {
        setIvrMessage(`Key ${digit} received. Our dispatcher will assist you momentarily.`);
      }
    }
  };

  const handleRequestCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackRequested(true);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold block leading-tight">24/7 Water Dispatch Hotline</span>
              <span className="text-[11px] text-cyan-300 font-mono">Toll-Free: 1800-278-2669 / (1800-AQUA-NOW)</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Quick Direct Dial Link for Real Phones */}
          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-cyan-950 block">Calling from Mobile or Landline?</span>
              <span className="text-xs text-cyan-800">Click to dial our real phone line directly:</span>
            </div>
            <a
              href="tel:18002782669"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Direct Dial: 1800-278-2669</span>
            </a>
          </div>

          {/* Interactive In-App Phone Call Simulator */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${callState === 'connected' ? 'bg-emerald-500 animate-ping' : callState === 'calling' ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {callState === 'idle' && 'Interactive Call Simulator'}
                  {callState === 'calling' && 'Connecting to Dispatch...'}
                  {callState === 'connected' && `Call Active (${formatSeconds(callDuration)})`}
                  {callState === 'ended' && 'Call Terminated'}
                </span>
              </div>

              {callState === 'connected' && (
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  HD Voice Audio
                </span>
              )}
            </div>

            {/* Simulated IVR Voice Text Display */}
            {callState !== 'idle' && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 space-y-1 shadow-2xs">
                <div className="flex items-center gap-1.5 text-cyan-800 font-semibold text-[11px]">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Dispatcher Voice / IVR Audio:</span>
                </div>
                <p className="italic text-slate-700 leading-relaxed font-sans">
                  "{ivrMessage}"
                </p>
                {dialedDigits && (
                  <div className="text-[11px] text-slate-400 font-mono pt-1">
                    Keys Entered: <span className="font-bold text-slate-700">{dialedDigits}</span>
                  </div>
                )}
              </div>
            )}

            {/* Dialpad Grid */}
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto pt-2">
              {[
                { k: '1', sub: 'Cans' },
                { k: '2', sub: 'House' },
                { k: '3', sub: 'Function' },
                { k: '4', sub: 'Quality' },
                { k: '5', sub: 'JKL' },
                { k: '6', sub: 'MNO' },
                { k: '7', sub: 'PQRS' },
                { k: '8', sub: 'TUV' },
                { k: '9', sub: 'WXYZ' },
                { k: '*', sub: '' },
                { k: '0', sub: 'Agent' },
                { k: '#', sub: '' },
              ].map(({ k, sub }) => (
                <button
                  key={k}
                  onClick={() => handleKeyPress(k)}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-mono font-bold text-sm shadow-2xs flex flex-col items-center justify-center active:scale-95 transition-all cursor-pointer"
                >
                  <span>{k}</span>
                  {sub && <span className="text-[9px] font-sans font-normal text-slate-400 uppercase">{sub}</span>}
                </button>
              ))}
            </div>

            {/* Call Controls Button */}
            <div className="flex justify-center pt-2">
              {callState === 'idle' || callState === 'ended' ? (
                <button
                  onClick={startCall}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Start Audio Call Now</span>
                </button>
              ) : (
                <button
                  onClick={endCall}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Hang Up Call</span>
                </button>
              )}
            </div>
          </div>

          {/* Alternative: Request 60-Second Instant Callback */}
          <div className="pt-2 border-t border-slate-200">
            {callbackRequested ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Callback Request Queued!</span>
                </div>
                <p className="text-emerald-800">
                  Our dispatch supervisor is calling your number <span className="font-mono font-bold">{callbackPhone}</span> within 60 seconds with live tanker availability.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestCallback} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Prefer We Call You? Instant Callback in 60s
                  </span>
                  <span className="text-[11px] text-slate-500">Free service</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="Enter your 10-digit mobile number"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shrink-0 cursor-pointer"
                  >
                    Call Me Now
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
