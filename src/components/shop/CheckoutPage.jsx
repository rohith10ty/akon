import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { productsData } from '../../data/productsData';

export const CheckoutPage = ({ onBackToShop, onNavigateHome }) => {
  // Preload default cart items from actual productsData
  const [cartItems, setCartItems] = useState([
    {
      product: productsData.find((p) => p.id === 'yeezy-350-zebra') || productsData[0],
      size: '9.5',
      quantity: 1,
    },
    {
      product: productsData.find((p) => p.id === 'yeezy-slide-azure') || productsData[8],
      size: '10.0',
      quantity: 1,
    },
  ]);

  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' | 'express'
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    email: 'collector@akon-studio.com',
    phone: '+1 (555) 019-2834',
    firstName: 'Alex',
    lastName: 'Vance',
    address: '742 Evergreen Terrace',
    apartment: 'Suite 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/28',
    cardCvc: '888',
    cardName: 'ALEX VANCE',
  });

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const updateQuantity = (index, delta) => {
    setCartItems((prev) => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const removeItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const applyPromoCode = (e) => {
    e.preventDefault();
    setDiscountError('');
    const code = discountCode.trim().toUpperCase();
    if (code === 'YEEZY10' || code === 'AKON10' || code === 'VIP10') {
      setDiscountApplied(true);
    } else if (code === '') {
      setDiscountError('Please enter a promo code');
    } else {
      setDiscountError('Invalid code. Try "YEEZY10" for 10% off');
    }
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingCost = shippingMethod === 'express' ? 15 : 0;
  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.08);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderId(`AKON-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderPlaced(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#131417] text-white pt-16 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#18191d] border border-white/10 rounded-2xl p-6 sm:p-7 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#ff5a1f]/15 blur-2xl pointer-events-none" />

          <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff5a1f] mb-1 block">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif-fraunces font-normal tracking-tight text-white mb-2">
            Thank You for Your Order
          </h1>
          <p className="text-xs text-zinc-400 mb-4 font-mono leading-relaxed">
            Order <span className="text-white font-bold">{orderId}</span> received and sent to authentication specialists.
          </p>

          {/* Compact Order Details Card */}
          <div className="p-3.5 rounded-xl bg-white/3 border border-white/6 text-left mb-5 text-[11px] font-mono">
            <div className="flex justify-between py-1.5 border-b border-white/6 text-zinc-400">
              <span>Recipient</span>
              <span className="text-white">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/6 text-zinc-400">
              <span>Shipping Address</span>
              <span className="text-white text-right truncate max-w-[200px]">
                {formData.address}, {formData.city}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/6 text-zinc-400">
              <span>Est. Delivery</span>
              <span className="text-emerald-400 font-medium">
                {shippingMethod === 'express' ? '1 - 2 Business Days' : '3 - 5 Business Days'}
              </span>
            </div>
            <div className="flex justify-between pt-2 font-semibold text-xs">
              <span className="text-zinc-300">Total Billed</span>
              <span className="text-white">${grandTotal}.00 USD</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onBackToShop}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#ff5a1f] hover:bg-[#e04e18] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer font-semibold shadow-lg shadow-[#ff5a1f]/20"
            >
              Continue Shopping
            </button>
            <button
              onClick={onNavigateHome}
              className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              Back to Experience
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131417] text-white pt-24 pb-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToShop}
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Catalog</span>
            </button>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Secure Checkout
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {/* Main 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Form Fields */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 flex flex-col gap-8">
            {/* Express Checkout Options */}
            <div className="p-6 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-md">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block mb-3 text-center">
                Express Checkout
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  className="py-3 px-4 rounded-xl bg-white text-black font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-all cursor-pointer shadow-md"
                >
                  <span className="font-bold">Pay</span>
                </button>
                <button
                  type="button"
                  className="py-3 px-4 rounded-xl bg-[#5a31f4] text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#4b27d1] transition-all cursor-pointer shadow-md"
                >
                  <span>shop</span>
                  <span className="font-bold">pay</span>
                </button>
                <button
                  type="button"
                  className="py-3 px-4 rounded-xl bg-zinc-800 text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 hover:bg-zinc-700 transition-all cursor-pointer shadow-md border border-white/10"
                >
                  <span className="font-bold">G Pay</span>
                </button>
              </div>

              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  Or Continue Below
                </span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                    1. Contact Details
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500">Required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                      Phone Number (SMS updates)
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="p-6 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-md flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/8">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                  2. Shipping Address
                </h3>
                <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#ff5a1f]" />
                  <span>Doorstep Delivery</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    Apt / Suite
                  </label>
                  <input
                    type="text"
                    value={formData.apartment}
                    onChange={(e) => handleInputChange('apartment', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    Postal / ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => handleInputChange('zip', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Speed Method */}
            <div className="p-6 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-md flex flex-col gap-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-1">
                3. Shipping Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                    shippingMethod === 'standard'
                      ? 'border-[#ff5a1f] bg-[#ff5a1f]/10 shadow-lg'
                      : 'border-white/10 bg-white/2 hover:border-white/25'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-semibold text-white">Standard Courier</span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">FREE</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    3 - 5 Business Days • Tracked
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                    shippingMethod === 'express'
                      ? 'border-[#ff5a1f] bg-[#ff5a1f]/10 shadow-lg'
                      : 'border-white/10 bg-white/2 hover:border-white/25'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-semibold text-white">Priority Express</span>
                    <span className="text-xs font-mono text-white font-semibold">$15.00</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    1 - 2 Business Days • Insured
                  </span>
                </button>
              </div>
            </div>

            {/* Payment Details */}
            <div className="p-6 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-md flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#ff5a1f]" />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                    4. Payment Information
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                  <span className="px-1.5 py-0.5 rounded bg-white/10">VISA</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/10">MC</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/10">AMEX</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                  />
                  <Lock className="w-3.5 h-3.5 text-zinc-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    Expiration
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="MM / YY"
                    value={formData.cardExp}
                    onChange={(e) => handleInputChange('cardExp', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    Security Code
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="CVC"
                    maxLength={4}
                    value={formData.cardCvc}
                    onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono text-center"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className={`w-full py-4 px-6 rounded-2xl bg-[#ff5a1f] hover:bg-[#e04e18] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#ff5a1f]/25 ${
                isSubmitting ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              {isSubmitting ? (
                <span>Authorizing Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order • ${grandTotal}.00 USD</span>
                </>
              )}
            </button>
          </form>

          {/* Right Column: Sticky Order Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
            <div className="p-6 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-md flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#ff5a1f]" />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                    Order Summary
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center text-zinc-500 font-mono text-xs">
                    Your bag is empty.
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex items-center gap-3.5 pb-3 border-b border-white/5 last:border-b-0"
                    >
                      <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex-none flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-mono font-medium text-white truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mt-0.5">
                          <span>Size: US {item.size}</span>
                          <span>•</span>
                          <span>${item.product.price} each</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(idx, -1)}
                            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono px-1 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(idx, 1)}
                            className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs font-mono font-semibold text-white">
                          ${item.product.price * item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(idx)}
                          className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={applyPromoCode} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (try YEEZY10)"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer font-medium"
                  >
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>10% VIP promotional discount applied!</span>
                  </div>
                )}
                {discountError && (
                  <p className="mt-1.5 text-[11px] font-mono text-red-400">{discountError}</p>
                )}
              </form>

              {/* Cost Breakdown */}
              <div className="pt-3 border-t border-white/8 flex flex-col gap-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal}.00</span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (10%)</span>
                    <span>-${discountAmount}.00</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-white">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost}.00`}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-white">${estimatedTax}.00</span>
                </div>

                <div className="flex justify-between text-sm pt-3 border-t border-white/8 font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-[#ff5a1f] text-base">${grandTotal}.00 USD</span>
                </div>
              </div>
            </div>

            {/* Authenticity Guarantee Card */}
            <div className="p-4 rounded-xl bg-white/2 border border-white/6 flex items-start gap-3 text-xs font-mono text-zinc-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-none mt-0.5" />
              <div>
                <span className="text-white font-medium block mb-0.5">
                  100% Verified Authentic Guarantee
                </span>
                <span className="text-[11px] leading-relaxed text-zinc-500">
                  Every silhouette undergoes rigorous inspection by certified specialists before dispatch.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
