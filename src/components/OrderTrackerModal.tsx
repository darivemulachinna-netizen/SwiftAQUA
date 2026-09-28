import React, { useState, useEffect } from 'react';
import { ActiveOrder } from '../types';
import { Truck, Phone, ShieldCheck, CheckCircle2, Clock, MapPin, X, FileText, ChevronRight, AlertCircle, Droplets } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: ActiveOrder;
  onViewCertificate: () => void;
  onAdvanceStatus?: (nextStatus: ActiveOrder['status']) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  order,
  onViewCertificate,
  onAdvanceStatus,
}) => {
  const [eta, setEta] = useState<number>(order.estimatedArrivalMinutes);
  const [currentStatus, setCurrentStatus] = useState<ActiveOrder['status']>(order.status);

  useEffect(() => {
    setCurrentStatus(order.status);
    setEta(order.estimatedArrivalMinutes);
  }, [order]);

  if (!isOpen) return null;

  const steps = [
    { key: 'confirmed', label: 'Order Confirmed', time: 'Just now' },
    { key: 'tanker_assigned', label: 'Tanker Assigned & Sanitized', time: '+5 mins' },
    { key: 'quality_tested', label: 'Water Quality Tested', time: '+12 mins' },
    { key: 'out_for_delivery', label: 'Out for Delivery', time: 'En route' },
    { key: 'delivered', label: 'Pumping to Tank / Delivered', time: 'Completed' },
  ];

  const getStepIndex = (s: ActiveOrder['status']) => {
    switch (s) {
      case 'confirmed': return 0;
      case 'tanker_assigned': return 1;
      case 'quality_tested': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentStatus);

  const simulateNext = () => {
    const sequence: ActiveOrder['status'][] = [
      'confirmed',
      'tanker_assigned',
      'quality_tested',
      'out_for_delivery',
      'delivered',
    ];
    const nextIdx = Math.min(sequence.length - 1, currentIndex + 1);
    const nextStatus = sequence[nextIdx];
    setCurrentStatus(nextStatus);
    if (onAdvanceStatus) onAdvanceStatus(nextStatus);
    if (nextStatus === 'out_for_delivery') setEta(18);
    if (nextStatus === 'delivered') setEta(0);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">Live Water Delivery Tracker</span>
                <span className="text-xs font-mono text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">
                  {order.orderId}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Placed at {order.placedAt}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Estimated Arrival Banner */}
          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800">
                Estimated Arrival
              </span>
              <div className="text-2xl font-black font-mono text-cyan-950">
                {currentStatus === 'delivered' ? 'Delivered & Pumped' : `${eta} Minutes`}
              </div>
              <p className="text-xs text-cyan-800">
                Vehicle: <span className="font-mono font-bold">{order.vehicleNumber}</span> (Dedicated Potable Tanker)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${order.driverPhone}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Driver ({order.driverName.split(' ')[0]})</span>
              </a>
            </div>
          </div>

          {/* Stepper Visualization */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Dispatch & Quality Progression
            </label>
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {steps.map((st, idx) => {
                const isPassed = idx <= currentIndex;
                const isCurrent = idx === currentIndex;

                return (
                  <div key={st.key} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-cyan-900'
                              : isPassed
                              ? 'text-slate-800'
                              : 'text-slate-400'
                          }`}
                        >
                          {st.label}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{st.time}</span>
                      </div>
                      {isCurrent && (
                        <p className="text-[11px] text-cyan-800 mt-0.5">
                          Currently active. Driver is navigating toward {order.delivery.cityArea}.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Test Simulation Button */}
            {currentIndex < 4 && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={simulateNext}
                  className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 underline decoration-cyan-400 cursor-pointer"
                >
                  [Demo] Advance to Next Delivery Step →
                </button>
              </div>
            )}
          </div>

          {/* Attached Water Quality Certificate for this Vehicle */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">
                  Attached Vehicle Water Quality Seal
                </span>
              </div>
              <button
                onClick={onViewCertificate}
                className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Certificate</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">TDS</span>
                <span className="text-sm font-bold font-mono text-cyan-900">
                  {order.item.product.tdsPpm} ppm
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">pH</span>
                <span className="text-sm font-bold font-mono text-cyan-900">
                  {order.item.product.phLevel}
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Hardness</span>
                <span className="text-sm font-bold font-mono text-cyan-900">
                  {order.item.product.hardnessMgL} mg/L
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Microbial</span>
                <span className="text-sm font-bold font-mono text-emerald-700">
                  0.00 CFU
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              * Driver carries a calibrated digital TDS meter and will test the water in front of you before starting the pump into your overhead tank or sump.
            </p>
          </div>

          {/* Delivery Details Summary */}
          <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-400">Recipient:</span>
              <span className="font-semibold text-slate-900">{order.delivery.fullName} ({order.delivery.phone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Address:</span>
              <span className="font-semibold text-slate-900 text-right max-w-xs">{order.delivery.deliveryAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Product:</span>
              <span className="font-semibold text-slate-900">
                {order.item.quantity}x {order.item.product.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Hose Length:</span>
              <span className="font-semibold text-slate-900">{order.delivery.hoseLengthRequiredFt} ft High-Pressure Hose</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
