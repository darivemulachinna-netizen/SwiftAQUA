import React, { useState } from 'react';
import { WaterProduct, WaterPurpose } from '../types';
import { WATER_PRODUCTS } from '../data/waterProducts';
import { Truck, Phone, Droplet, Check, Shield, Info, ArrowUpRight, Sparkles, Building2, PartyPopper } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProduct: (product: WaterProduct) => void;
  onCallForProduct: (product: WaterProduct) => void;
  onOpenCalculator: () => void;
  activeFilter: 'all' | WaterPurpose;
  setActiveFilter: (filter: 'all' | WaterPurpose) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onCallForProduct,
  onOpenCalculator,
  activeFilter,
  setActiveFilter,
}) => {
  const filteredProducts = activeFilter === 'all'
    ? WATER_PRODUCTS
    : WATER_PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <section id="supplies" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-800 mb-2">
              <span>Verified Potable Water Delivery Catalog</span>
              <span className="text-slate-300">·</span>
              <span>Daily Lab Tested</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Select Your Water Purpose & Tanker Capacity
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              From individual 20L sanitized drinking jars to 10,000L high-volume food grade tankers for weddings and caterers. Order online or dial our 24/7 dispatch phone.
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-xl shrink-0 self-start md:self-end">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Supplies ({WATER_PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('house')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'house'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-cyan-600" />
              House Purpose
            </button>
            <button
              onClick={() => setActiveFilter('function')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'function'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PartyPopper className="w-3.5 h-3.5 text-blue-600" />
              Function & Events
            </button>
          </div>
        </div>

        {/* Function Helper Banner */}
        {activeFilter === 'function' && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <PartyPopper className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-semibold text-blue-950 block">
                  Planning a Marriage, Reception, or Community Gathering?
                </span>
                <span className="text-xs text-blue-800">
                  Not sure how many litres of water or dispensers you need for your guest count? Use our event calculator.
                </span>
              </div>
            </div>
            <button
              onClick={onOpenCalculator}
              className="px-4 py-2 text-xs font-semibold text-blue-900 bg-white hover:bg-blue-100 border border-blue-300 rounded-lg transition-colors shrink-0 shadow-2xs cursor-pointer"
            >
              Launch Event Water Calculator
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isFunction = product.category === 'function';

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col overflow-hidden group"
              >
                {/* Visual Header / Container Badge */}
                <div className={`p-4 ${isFunction ? 'bg-blue-50/60' : 'bg-cyan-50/60'} border-b border-slate-100 flex items-start justify-between`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isFunction ? 'bg-blue-600 text-white' : 'bg-cyan-600 text-white'}`}>
                      <Droplet className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        {isFunction ? 'Function / Event' : 'House / Domestic'}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 block">
                        {product.capacityLabel}
                      </span>
                    </div>
                  </div>

                  {product.popular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                      Most Booked
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-cyan-800 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {product.tagline}
                    </p>

                    {/* Water Quality Highlights for this item */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-slate-400 font-medium">TDS:</span>
                        <span className="font-mono font-bold text-slate-900">{product.tdsPpm} ppm</span>
                      </div>
                      <div className="text-slate-300">·</div>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-slate-400 font-medium">pH:</span>
                        <span className="font-mono font-bold text-slate-900">{product.phLevel}</span>
                      </div>
                      <div className="text-slate-300">·</div>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-slate-400 font-medium">Hardness:</span>
                        <span className="font-mono font-bold text-slate-900">{product.hardnessMgL} mg/L</span>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="mt-3.5 space-y-1.5">
                      {product.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {product.hoseLengthIncludedFt && (
                      <div className="mt-2 text-[11px] text-cyan-800 bg-cyan-50/70 px-2 py-1 rounded-md font-medium">
                        Included Hose: <span className="font-bold">{product.hoseLengthIncludedFt} ft</span> (High-pressure pump)
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-slate-500 block">All-inclusive Price</span>
                        <span className="text-xl font-bold font-mono text-slate-900">
                          ₹{product.price}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Est. {product.deliveryTimeEstimate}
                      </span>
                    </div>

                    {/* Dual Action on Card: App Booking vs Phone Dialing */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Book on App</span>
                      </button>

                      <button
                        onClick={() => onCallForProduct(product)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-lg transition-colors cursor-pointer"
                        title={`Call to order ${product.name}`}
                      >
                        <Phone className="w-3.5 h-3.5 text-cyan-700" />
                        <span>Dial Order</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
