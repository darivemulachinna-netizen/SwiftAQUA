import React from 'react';
import { Droplets, Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenDialer: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDialer, onOpenBooking }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
                <Droplets className="w-4 h-4" />
              </div>
              <span className="text-base font-bold tracking-tight">AquaPure Water Logistics</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Daily lab-certified potable water delivery for homes, residential complexes, and grand wedding & celebration venues.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NABL Lab Tested & Certified Safe</span>
            </div>
          </div>

          {/* Quick Dispatch Contacts */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
              24/7 Central Dispatch
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenDialer}
                  className="text-cyan-400 hover:text-cyan-300 font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hotline: 1800-278-2669</span>
                </button>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>dispatch@aquapure-water.com</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Express Depots in 5 City Zones</span>
              </li>
            </ul>
          </div>

          {/* Service Purposes */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
              Supplies by Purpose
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>· 20L BIS Mineral Water Cans</li>
              <li>· 1,000L Overhead Tank Replenishment</li>
              <li>· 2,000L & 3,000L Villa Sumps</li>
              <li>· 5,000L SS Food-Grade Function Tankers</li>
              <li>· 10,000L Grand Banquet & Marriage Supply</li>
              <li>· Event Chiller Dispenser Hydration Packs</li>
            </ul>
          </div>

          {/* Quality Standards */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
              Testing & Accreditations
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Compliant with Bureau of Indian Standards (BIS 10500:2012 / BIS 14543) and WHO potable water guidelines. All delivery vehicles are 100% dedicated to potable water and steam sanitized daily.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenBooking}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Book Water Online
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AquaPure Water Logistics Corporation. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Domestic & Function Potable Water</span>
            <span>·</span>
            <span>On-Spot TDS Meter Verification Guaranteed</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
