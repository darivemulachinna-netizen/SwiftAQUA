import React from 'react';
import { Phone, Droplets, ShieldCheck, Calculator, Truck, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenDialer: (productContext?: string) => void;
  onOpenBooking: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeOrdersCount: number;
  onViewOrders: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDialer,
  onOpenBooking,
  activeSection,
  setActiveSection,
  activeOrdersCount,
  onViewOrders,
}) => {
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-600 text-white flex items-center justify-center shadow-sm">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                  AquaPure
                </span>
                <span className="text-[11px] font-medium text-slate-500 block">
                  Certified Potable Water Supply
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => scrollTo('domestic-supplies')}
              className={`hover:text-cyan-700 transition-colors cursor-pointer ${
                activeSection === 'domestic-supplies' ? 'text-cyan-700 font-semibold' : ''
              }`}
            >
              Domestic Water
            </button>
            <button
              onClick={() => scrollTo('function-supplies')}
              className={`hover:text-cyan-700 transition-colors cursor-pointer ${
                activeSection === 'function-supplies' ? 'text-cyan-700 font-semibold' : ''
              }`}
            >
              Function & Events
            </button>
            <button
              onClick={() => scrollTo('quality-hub')}
              className={`hover:text-cyan-700 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'quality-hub' ? 'text-cyan-700 font-semibold' : ''
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Purity & Lab Tests
            </button>
            <button
              onClick={() => scrollTo('calculator')}
              className={`hover:text-cyan-700 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'calculator' ? 'text-cyan-700 font-semibold' : ''
              }`}
            >
              <Calculator className="w-4 h-4 text-cyan-600" />
              Water Calculator
            </button>
            {activeOrdersCount > 0 && (
              <button
                onClick={onViewOrders}
                className="text-cyan-800 font-semibold hover:text-cyan-900 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                Active Deliveries ({activeOrdersCount})
              </button>
            )}
          </nav>

          {/* Zone 3: 1-2 primary actions (Direct Phone Hotline + Book Water) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenDialer()}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
              title="Call 24/7 Water Dispatch Desk"
            >
              <Phone className="w-4 h-4 text-cyan-700 animate-pulse" />
              <span className="hidden sm:inline">Dispatch Desk:</span>
              <span className="font-mono font-bold text-cyan-800">1800-AQUA-NOW</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              Book Online
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
