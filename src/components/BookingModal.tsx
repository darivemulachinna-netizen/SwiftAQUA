import React, { useState } from 'react';
import { WaterProduct, ActiveOrder, LabBatchReport } from '../types';
import { WATER_PRODUCTS } from '../data/waterProducts';
import { CURRENT_LAB_BATCH } from '../data/qualityData';
import { X, Truck, ShieldCheck, Clock, MapPin, Phone, User, Check, ArrowRight, AlertCircle, Droplets } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: WaterProduct;
  initialNotes?: string;
  onOrderSuccess: (order: ActiveOrder) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  initialNotes = '',
  onOrderSuccess,
}) => {
  const [product, setProduct] = useState<WaterProduct>(
    selectedProduct || WATER_PRODUCTS[0]
  );

  React.useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const [quantity, setQuantity] = useState<number>(1);
  const [deliverySpeed, setDeliverySpeed] = useState<'express' | 'scheduled'>('express');
  const [scheduledDate, setScheduledDate] = useState<string>('2026-09-28');
  const [scheduledTime, setScheduledTime] = useState<string>('11:00 AM - 01:00 PM');

  const [accessType, setAccessType] = useState<'ground_floor' | 'overhead_tank' | 'sump' | 'event_stage'>('overhead_tank');
  const [hoseLength, setHoseLength] = useState<number>(100);

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [cityArea, setCityArea] = useState<string>('South City / Green Meadows');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'phone_confirmation'>('cod');
  const [notes, setNotes] = useState<string>(initialNotes);

  if (!isOpen) return null;

  // Calculate pricing
  const baseTotal = product.price * quantity;
  // If extra hose requested above what is included
  const includedHose = product.hoseLengthIncludedFt || 50;
  const extraHoseFeet = Math.max(0, hoseLength - includedHose);
  const hoseExtraCost = extraHoseFeet > 0 ? Math.ceil(extraHoseFeet / 50) * 100 : 0;
  const finalTotal = baseTotal + hoseExtraCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Please fill out all required delivery fields.');
      return;
    }

    const orderId = `AQ-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: ActiveOrder = {
      orderId,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      item: {
        product,
        quantity,
        purposeNote: notes,
      },
      delivery: {
        fullName,
        phone,
        deliveryAddress: address,
        cityArea,
        deliveryDate: deliverySpeed === 'express' ? 'Today (Immediate)' : scheduledDate,
        timeSlot: deliverySpeed === 'express' ? 'Within 45 Mins' : scheduledTime,
        accessType,
        hoseLengthRequiredFt: hoseLength,
        paymentMethod,
        notes,
      },
      status: 'confirmed',
      driverName: 'Vikram Singh (Certified Potable Logistics)',
      driverPhone: '+1 (800) 278-2669 ext 412',
      vehicleNumber: product.containerType === 'can' ? 'AP-CAN-VAN-2208' : 'AP-TANK-SS-9140',
      estimatedArrivalMinutes: deliverySpeed === 'express' ? 38 : 120,
      batchReport: CURRENT_LAB_BATCH,
    };

    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-cyan-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-700 flex items-center justify-center text-white">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold block leading-tight">Instant Water Booking</span>
              <span className="text-xs text-cyan-200">Doorstep Delivery with Live Purity Guarantee</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-cyan-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* 1. Item Selection & Quantity */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Selected Water Supply
                </label>
                <select
                  value={product.id}
                  onChange={(e) => {
                    const found = WATER_PRODUCTS.find((p) => p.id === e.target.value);
                    if (found) setProduct(found);
                  }}
                  className="mt-1 w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-600"
                >
                  <optgroup label="House / Domestic Purpose">
                    {WATER_PRODUCTS.filter((p) => p.category === 'house').map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - ₹{p.price} ({p.capacityLabel})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Function & Event Purpose">
                    {WATER_PRODUCTS.filter((p) => p.category === 'function').map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - ₹{p.price} ({p.capacityLabel})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Quantity Stepper */}
              <div className="shrink-0">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Quantity
                </label>
                <div className="mt-1 flex items-center bg-white border border-slate-300 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-l-xl cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-r-xl cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Quality Summary for this selection */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-2 border-t border-slate-200">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> TDS: {product.tdsPpm} ppm
              </span>
              <span>·</span>
              <span>pH {product.phLevel}</span>
              <span>·</span>
              <span>Hardness {product.hardnessMgL} mg/L</span>
              <span>·</span>
              <span className="text-cyan-800 font-medium">{product.idealFor}</span>
            </div>
          </div>

          {/* 2. Delivery Timing Option */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Delivery Timing
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliverySpeed('express')}
                className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                  deliverySpeed === 'express'
                    ? 'border-cyan-600 bg-cyan-50/70 text-cyan-950 ring-1 ring-cyan-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-700 animate-pulse" />
                  <span className="text-xs font-bold">Express (within 45 mins)</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Priority immediate tanker dispatch from nearest purity depot.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDeliverySpeed('scheduled')}
                className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                  deliverySpeed === 'scheduled'
                    ? 'border-cyan-600 bg-cyan-50/70 text-cyan-950 ring-1 ring-cyan-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold">Schedule for Later</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Ideal for wedding dates, morning tank refill, or party setup.
                </span>
              </button>
            </div>

            {deliverySpeed === 'scheduled' && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-600"
                />
                <select
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-600"
                >
                  <option value="06:00 AM - 08:00 AM">Early Morning (06:00 AM - 08:00 AM)</option>
                  <option value="08:00 AM - 11:00 AM">Morning (08:00 AM - 11:00 AM)</option>
                  <option value="11:00 AM - 01:00 PM">Noon (11:00 AM - 01:00 PM)</option>
                  <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM)</option>
                  <option value="05:00 PM - 09:00 PM">Evening (05:00 PM - 09:00 PM)</option>
                </select>
              </div>
            )}
          </div>

          {/* 3. Hose Length & Tank Access Requirement (For Tankers) */}
          {product.containerType !== 'can' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Hose Pipe Reach Requirement
                </label>
                <span className="text-xs font-mono font-bold text-cyan-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {hoseLength} Feet
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[50, 100, 150, 250].map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setHoseLength(len)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                      hoseLength === len
                        ? 'border-cyan-600 bg-cyan-50 text-cyan-900 ring-1 ring-cyan-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {len} ft {len <= (product.hoseLengthIncludedFt || 50) ? '(Included)' : '(+₹100)'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                Our tankers are equipped with high-pressure booster motors to fill rooftop tanks up to 5 floors.
              </p>
            </div>
          )}

          {/* 4. Customer & Address Details */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Delivery Address & Contact
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Full Name / Event Organizer"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-600"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  placeholder="Contact Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-600"
                />
              </div>
            </div>

            <div>
              <textarea
                required
                rows={2}
                placeholder="House / Flat No, Street, Landmark, Venue Gate, or Banquet Hall Name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-600 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">City Locality / Zone</label>
                <select
                  value={cityArea}
                  onChange={(e) => setCityArea(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-600 bg-white"
                >
                  <option value="South City / Green Meadows">South City / Green Meadows (Depot 1)</option>
                  <option value="North Industrial & Residential Hub">North Industrial & Residential Hub (Depot 2)</option>
                  <option value="East Coast Villa Enclave">East Coast Villa Enclave (Depot 3)</option>
                  <option value="Central Market & Banquet Strip">Central Market & Banquet Strip (Depot 4)</option>
                  <option value="West Lake View Apartments">West Lake View Apartments (Depot 5)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-600 bg-white"
                >
                  <option value="cod">Cash on Delivery (Pay Driver)</option>
                  <option value="upi">UPI QR Code on Tanker</option>
                  <option value="card">Card POS on Vehicle</option>
                  <option value="phone_confirmation">Phone Verification / Invoice</option>
                </select>
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Any special instructions (e.g. Tank on 3rd floor terrace, call 5 mins before arrival)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-600"
              />
            </div>
          </div>

          {/* Pricing & On-Spot Quality Verification Guarantee */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Total Payable</span>
              <span className="text-2xl font-bold font-mono text-slate-900">
                ₹{finalTotal}
              </span>
              {hoseExtraCost > 0 && (
                <span className="text-[11px] text-slate-400 block">
                  (Includes ₹{hoseExtraCost} for {extraHoseFeet}ft extended hose)
                </span>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <span>Confirm & Dispatch Tanker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
