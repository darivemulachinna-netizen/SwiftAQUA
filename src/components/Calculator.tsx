import React, { useState } from 'react';
import { Calculator as CalcIcon, Users, Clock, Droplets, PartyPopper, Home, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { WATER_PRODUCTS } from '../data/waterProducts';
import { WaterProduct } from '../types';

interface CalculatorProps {
  onBookRecommended: (product: WaterProduct, notes?: string) => void;
  onCallRecommended: (notes: string) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onBookRecommended, onCallRecommended }) => {
  const [calcTab, setCalcTab] = useState<'function' | 'house'>('function');

  // Function Calculator States
  const [guestCount, setGuestCount] = useState<number>(300);
  const [eventDurationHours, setEventDurationHours] = useState<number>(6);
  const [eventType, setEventType] = useState<'wedding' | 'corporate' | 'party' | 'community'>('wedding');
  const [includesFullMeal, setIncludesFullMeal] = useState<boolean>(true);

  // House Calculator States
  const [familyMembers, setFamilyMembers] = useState<number>(4);
  const [daysReserve, setDaysReserve] = useState<number>(3);
  const [tankSize, setTankSize] = useState<number>(1000);

  // Calculations for Event
  // Rule of thumb:
  // Drinking: 1.5 - 2 Litres per person for 6 hrs
  // Cooking/Catering: 3 - 5 Litres per meal per person if full feast, 1L if high tea
  // Handwash/Washrooms: 4 - 6 Litres per guest
  const drinkingPerGuest = eventDurationHours > 6 ? 2.5 : 1.8;
  const cookingPerGuest = includesFullMeal ? 4.5 : 1.2;
  const hygienePerGuest = eventType === 'wedding' ? 5.5 : 3.0;

  const totalEventDrinkingLitres = Math.round(guestCount * drinkingPerGuest);
  const totalEventCookingLitres = Math.round(guestCount * cookingPerGuest);
  const totalEventHygieneLitres = Math.round(guestCount * hygienePerGuest);
  const totalEventWaterNeeded = totalEventDrinkingLitres + totalEventCookingLitres + totalEventHygieneLitres;

  // 20L cans needed for drinking
  const cansNeeded = Math.ceil(totalEventDrinkingLitres / 20);

  // Recommended tanker
  const recommendedFunctionTanker = totalEventWaterNeeded > 6000
    ? WATER_PRODUCTS.find(p => p.id === 'function-tanker-10000') || WATER_PRODUCTS[4]
    : WATER_PRODUCTS.find(p => p.id === 'function-tanker-5000') || WATER_PRODUCTS[4];

  // House calculations
  // Average per capita consumption: 135 Litres/day (BIS standard) or 100L conservation standard
  const dailyHouseholdLitres = familyMembers * 125;
  const totalHouseReserveNeeded = dailyHouseholdLitres * daysReserve;
  const recommendedHouseTanker = totalHouseReserveNeeded <= 1200
    ? WATER_PRODUCTS.find(p => p.id === 'house-mini-tanker-1000') || WATER_PRODUCTS[1]
    : totalHouseReserveNeeded <= 2200
    ? WATER_PRODUCTS.find(p => p.id === 'house-tanker-2000') || WATER_PRODUCTS[2]
    : WATER_PRODUCTS.find(p => p.id === 'house-tanker-3000') || WATER_PRODUCTS[3];

  return (
    <section id="calculator" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-800 mb-2">
              <CalcIcon className="w-4 h-4" />
              <span>Smart Sizing & Volume Estimation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Water Requirement Calculator
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Calculate exact water volume for grand functions or household overhead tanks so you never run out during an event or dry spell.
            </p>
          </div>

          {/* Segmented Control */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-xl shrink-0">
            <button
              onClick={() => setCalcTab('function')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                calcTab === 'function'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PartyPopper className="w-4 h-4 text-blue-600" />
              Function & Wedding Calculator
            </button>
            <button
              onClick={() => setCalcTab('house')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                calcTab === 'house'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4 text-cyan-600" />
              House Tank Sizing
            </button>
          </div>
        </div>

        {/* Tab 1: FUNCTION & WEDDING CALCULATOR */}
        {calcTab === 'function' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
              
              {/* Event Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  1. Function Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'wedding', label: 'Wedding / Reception' },
                    { id: 'party', label: 'Engagement / Sangeet' },
                    { id: 'corporate', label: 'Conference / Meet' },
                    { id: 'community', label: 'Religious / Festival' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setEventType(item.id as any)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-colors cursor-pointer ${
                        eventType === item.id
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    2. Expected Guest Attendance
                  </label>
                  <span className="text-base font-bold font-mono text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>50 guests</span>
                  <span>500</span>
                  <span>1,000</span>
                  <span>2,000 guests</span>
                </div>
              </div>

              {/* Duration Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    3. Event Duration
                  </label>
                  <span className="text-sm font-bold font-mono text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {eventDurationHours} Hours
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="18"
                  step="1"
                  value={eventDurationHours}
                  onChange={(e) => setEventDurationHours(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Meals checkbox */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Full Catering & Kitchen Preparation?
                  </span>
                  <span className="text-xs text-slate-500">
                    Includes heavy utensil washing, rice/curry preparation, and dining handwash stations.
                  </span>
                </div>
                <button
                  onClick={() => setIncludesFullMeal(!includesFullMeal)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    includesFullMeal ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      includesFullMeal ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-blue-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-slate-900">Event Sizing Breakdown</span>
                </div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Live Estimation
                </span>
              </div>

              {/* Breakdown numbers */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Guest Drinking Water:</span>
                  <span className="font-mono font-bold text-slate-900">{totalEventDrinkingLitres.toLocaleString()} L (~{cansNeeded} Cans)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Catering & Cooking:</span>
                  <span className="font-mono font-bold text-slate-900">{totalEventCookingLitres.toLocaleString()} L</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Handwash & Restrooms:</span>
                  <span className="font-mono font-bold text-slate-900">{totalEventHygieneLitres.toLocaleString()} L</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Total Water Required</span>
                    <span className="text-2xl font-black font-mono text-blue-950">
                      {totalEventWaterNeeded.toLocaleString()} <span className="text-sm font-normal text-slate-500">Litres</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommended Package Recommendation */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block">Recommended Match</span>
                    <h4 className="text-sm font-bold text-blue-950">{recommendedFunctionTanker.name}</h4>
                  </div>
                  <span className="text-base font-bold font-mono text-blue-950">₹{recommendedFunctionTanker.price}</span>
                </div>

                <p className="text-xs text-blue-900/80">
                  Plus {cansNeeded}x 20L sanitized mineral cans for dining tables & dispensers.
                </p>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() =>
                      onBookRecommended(
                        recommendedFunctionTanker,
                        `Function Bundle for ${guestCount} Guests (${eventType}, ${eventDurationHours} hrs). Needs ~${totalEventWaterNeeded}L water + ${cansNeeded} drinking cans.`
                      )
                    }
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Book This Function Bundle on App</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() =>
                      onCallRecommended(
                        `Function water inquiry for ${guestCount} guests (${totalEventWaterNeeded} Litres).`
                      )
                    }
                    className="w-full text-center text-xs font-semibold text-blue-900 hover:text-blue-950 py-1 cursor-pointer"
                  >
                    Or Dial 1800-278-2669 to Discuss Custom Timing
                  </button>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Tab 2: HOUSE TANK SIZING */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
              
              {/* Family members slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Family / Resident Count
                  </label>
                  <span className="text-base font-bold font-mono text-cyan-900 bg-cyan-50 px-2.5 py-0.5 rounded-md border border-cyan-200">
                    {familyMembers} Members
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={familyMembers}
                  onChange={(e) => setFamilyMembers(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              {/* Days reserve slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Days of Reserve Storage Desired
                  </label>
                  <span className="text-sm font-bold font-mono text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {daysReserve} Days
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={daysReserve}
                  onChange={(e) => setDaysReserve(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              {/* Tank size selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Your Overhead / Sump Tank Capacity
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[500, 1000, 2000, 3000].map((size) => (
                    <button
                      key={size}
                      onClick={() => setTankSize(size)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                        tankSize === size
                          ? 'border-cyan-600 bg-cyan-50/70 text-cyan-900 ring-1 ring-cyan-600'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {size} Litres
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* House Result Box */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-cyan-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-cyan-600" />
                  <span className="text-sm font-bold text-slate-900">Domestic Sizing Recommendation</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">Daily Family Consumption:</span>
                  <span className="font-mono font-bold text-slate-900">~{dailyHouseholdLitres} Litres / day</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">{daysReserve}-Day Storage Volume:</span>
                  <span className="font-mono font-bold text-slate-900">~{totalHouseReserveNeeded} Litres</span>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Recommended Delivery</span>
                  <div className="text-xl font-bold font-mono text-cyan-950 mt-0.5">
                    {recommendedHouseTanker.name}
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Refill every {Math.max(1, Math.round(recommendedHouseTanker.capacityLitres / dailyHouseholdLitres))} days for uninterrupted supply.
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() =>
                    onBookRecommended(
                      recommendedHouseTanker,
                      `House refill for ${familyMembers} family members. Overhead tank size: ${tankSize}L.`
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <span>Book {recommendedHouseTanker.capacityLabel} Tanker</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
