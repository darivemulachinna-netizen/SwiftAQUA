import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { QualityHub } from './components/QualityHub';
import { Calculator } from './components/Calculator';
import { PhoneDialerModal } from './components/PhoneDialerModal';
import { BookingModal } from './components/BookingModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { PurityCertificateModal } from './components/PurityCertificateModal';
import { Footer } from './components/Footer';
import { WaterProduct, WaterPurpose, ActiveOrder } from './types';
import { WATER_PRODUCTS } from './data/waterProducts';
import { CURRENT_LAB_BATCH } from './data/qualityData';
import { Truck, Phone, ShieldCheck, CheckCircle2, ChevronRight, Droplets } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeFilter, setActiveFilter] = useState<'all' | WaterPurpose>('all');

  // Modals state
  const [isDialerOpen, setIsDialerOpen] = useState<boolean>(false);
  const [dialerContext, setDialerContext] = useState<string>('');

  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedProductForBooking, setSelectedProductForBooking] = useState<WaterProduct | undefined>(undefined);
  const [initialBookingNotes, setInitialBookingNotes] = useState<string>('');

  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // Active orders state
  const [orders, setOrders] = useState<ActiveOrder[]>([
    {
      orderId: 'AQ-ORD-774921',
      placedAt: '08:15 AM',
      item: {
        product: WATER_PRODUCTS[1], // 1,000L Domestic Tanker
        quantity: 1,
        purposeNote: 'Overhead 1,000L tank fill for residential duplex',
      },
      delivery: {
        fullName: 'Vikrant Roy',
        phone: '+91 98450 11234',
        deliveryAddress: 'Villa #42, Whispering Palms, South City',
        cityArea: 'South City / Green Meadows',
        deliveryDate: 'Today',
        timeSlot: 'Within 45 Mins',
        accessType: 'overhead_tank',
        hoseLengthRequiredFt: 100,
        paymentMethod: 'cod',
      },
      status: 'out_for_delivery',
      driverName: 'Mohan Sharma (Certified Driver)',
      driverPhone: '+1 (800) 278-2669 ext 102',
      vehicleNumber: 'AP-TANK-SS-4819',
      estimatedArrivalMinutes: 14,
      batchReport: CURRENT_LAB_BATCH,
    },
  ]);

  const [trackingOrder, setTrackingOrder] = useState<ActiveOrder | null>(null);

  // Handlers
  const handleOpenDialer = (context?: string) => {
    setDialerContext(context || '');
    setIsDialerOpen(true);
  };

  const handleOpenBooking = (product?: WaterProduct, notes?: string) => {
    setSelectedProductForBooking(product || WATER_PRODUCTS[0]);
    setInitialBookingNotes(notes || '');
    setIsBookingOpen(true);
  };

  const handleSelectCategory = (category: WaterPurpose) => {
    setActiveFilter(category);
    const elem = document.getElementById('supplies');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductSelect = (product: WaterProduct) => {
    handleOpenBooking(product);
  };

  const handleCallForProduct = (product: WaterProduct) => {
    handleOpenDialer(`Order ${product.name} (₹${product.price})`);
  };

  const handleBookRecommended = (product: WaterProduct, notes?: string) => {
    handleOpenBooking(product, notes);
  };

  const handleCallRecommended = (notes: string) => {
    handleOpenDialer(notes);
  };

  const handleOrderSuccess = (newOrder: ActiveOrder) => {
    setOrders([newOrder, ...orders]);
    setIsBookingOpen(false);
    setTrackingOrder(newOrder);
  };

  const handleAdvanceOrderStatus = (nextStatus: ActiveOrder['status']) => {
    if (!trackingOrder) return;
    const updated = { ...trackingOrder, status: nextStatus };
    setTrackingOrder(updated);
    setOrders(orders.map((o) => (o.orderId === updated.orderId ? updated : o)));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Active Order Banner if any en-route order exists */}
      {orders.length > 0 && orders[0].status !== 'delivered' && (
        <div className="bg-cyan-900 text-white text-xs px-4 py-2.5 flex items-center justify-between z-30 shadow-xs">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>
                Active Dispatch: <strong className="font-mono">{orders[0].orderId}</strong> ({orders[0].item.product.capacityLabel}) is{' '}
                <span className="text-cyan-200 capitalize font-medium">{orders[0].status.replace(/_/g, ' ')}</span> · Arriving in ~{orders[0].estimatedArrivalMinutes} mins.
              </span>
            </div>
            <button
              onClick={() => setTrackingOrder(orders[0])}
              className="text-cyan-200 hover:text-white font-bold underline decoration-cyan-400 flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Track Live Tanker & Quality Report</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Primary Top Bar */}
      <Navbar
        onOpenDialer={() => handleOpenDialer()}
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeOrdersCount={orders.length}
        onViewOrders={() => {
          if (orders.length > 0) setTrackingOrder(orders[0]);
        }}
      />

      <main className="flex-1">
        {/* Hero with Dual Booking Channels & Live Quality Telemetry */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenDialer={() => handleOpenDialer()}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          onSelectCategory={handleSelectCategory}
        />

        {/* Supplies Catalog for House and Function Purpose */}
        <div id="domestic-supplies" />
        <div id="function-supplies" />
        <ProductCatalog
          onSelectProduct={handleProductSelect}
          onCallForProduct={handleCallForProduct}
          onOpenCalculator={() => {
            const el = document.getElementById('calculator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Quality Hub: Live Lab Testing & NABL Verification */}
        <QualityHub onOpenCertificate={() => setIsCertificateOpen(true)} />

        {/* Smart Water Requirement & Tank Sizing Calculator */}
        <Calculator
          onBookRecommended={handleBookRecommended}
          onCallRecommended={handleCallRecommended}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenDialer={() => handleOpenDialer()}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* MODALS */}
      {/* 1. Interactive Phone Hotline & IVR Dialpad Simulator */}
      <PhoneDialerModal
        isOpen={isDialerOpen}
        onClose={() => setIsDialerOpen(false)}
        productContext={dialerContext}
      />

      {/* 2. Direct In-App Water Booking Flow */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedProduct={selectedProductForBooking}
        initialNotes={initialBookingNotes}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 3. Live Water Delivery Tracker Modal */}
      {trackingOrder && (
        <OrderTrackerModal
          isOpen={!!trackingOrder}
          onClose={() => setTrackingOrder(null)}
          order={trackingOrder}
          onViewCertificate={() => setIsCertificateOpen(true)}
          onAdvanceStatus={handleAdvanceOrderStatus}
        />
      )}

      {/* 4. Official Certified Lab Purity Certificate Modal */}
      <PurityCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        batchReport={CURRENT_LAB_BATCH}
      />

    </div>
  );
}
