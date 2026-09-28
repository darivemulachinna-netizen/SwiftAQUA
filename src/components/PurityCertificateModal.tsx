import React from 'react';
import { LabBatchReport } from '../types';
import { CURRENT_LAB_BATCH } from '../data/qualityData';
import { X, Printer, ShieldCheck, CheckCircle2, QrCode, Award, Droplets } from 'lucide-react';

interface PurityCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchReport?: LabBatchReport;
}

export const PurityCertificateModal: React.FC<PurityCertificateModalProps> = ({
  isOpen,
  onClose,
  batchReport = CURRENT_LAB_BATCH,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-8">
        
        {/* Top Control Bar */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold">Official Water Quality Analysis Certificate</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Body */}
        <div className="p-8 sm:p-10 space-y-6 max-h-[80vh] overflow-y-auto bg-white font-sans text-slate-800">
          
          {/* Certificate Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-700 text-white flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900 font-heading">
                  AQUAPURE LABORATORIES
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Central Potable Water Quality Assurance Division · NABL Accredited Testing Lab
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                License: {batchReport.licenseNumber}
              </p>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Certificate & Batch ID
              </span>
              <span className="text-sm font-mono font-bold text-cyan-900 block">
                {batchReport.batchId}
              </span>
              <span className="text-[11px] text-slate-500 block">
                Issued: {batchReport.testedAt}
              </span>
            </div>
          </div>

          {/* Source & Rating Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Source Origin</span>
              <span className="font-semibold text-slate-800">{batchReport.sourceAquifer}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Potability Grade</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> {batchReport.overallRating}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tamper-Proof Seal Code</span>
              <span className="font-mono font-bold text-cyan-800">{batchReport.certifiedSealNumber}</span>
            </div>
          </div>

          {/* Test Results Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Test Parameter</th>
                  <th className="py-2.5 px-3">Batch Value</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3">WHO Guideline</th>
                  <th className="py-2.5 px-3">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {batchReport.metrics.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-semibold text-slate-900">{m.name}</td>
                    <td className="py-2 px-3 font-mono font-bold text-cyan-900">{m.measuredValue}</td>
                    <td className="py-2 px-3 text-slate-500 font-mono">{m.unit}</td>
                    <td className="py-2 px-3 text-slate-600">{m.whoStandard}</td>
                    <td className="py-2 px-3">
                      <span className="text-emerald-700 font-bold inline-flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> PASSED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Verification Sign-offs & QR Stamp */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 p-1.5 bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center shrink-0">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <span className="font-bold text-slate-800 block">Scan to Verify in Real-Time</span>
                <span>Encrypted cryptographic hash matches delivery vehicle manifest.</span>
              </div>
            </div>

            <div className="flex items-center gap-8 text-right">
              <div className="space-y-1">
                <div className="h-6 flex items-end justify-end">
                  <span className="text-xs font-serif italic font-bold text-slate-700 underline decoration-slate-400">
                    Dr. Rameshwar Rao
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Testing Chemist
                </span>
                <span className="text-[11px] text-slate-600 block">{batchReport.technicianName}</span>
              </div>

              <div className="space-y-1">
                <div className="h-6 flex items-end justify-end">
                  <span className="text-xs font-serif italic font-bold text-slate-700 underline decoration-slate-400">
                    Sarah M. Chen
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Chief Quality Officer
                </span>
                <span className="text-[11px] text-slate-600 block">{batchReport.chiefChemist}</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center pt-2">
            * This document confirms compliance with Bureau of Indian Standards (BIS 10500:2012 / BIS 14543) and WHO potable water guidelines for human consumption and food preparation.
          </div>

        </div>

      </div>
    </div>
  );
};
