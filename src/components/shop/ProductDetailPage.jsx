import React, { useState } from 'react';
import { ArrowLeft, Star, ShieldCheck, Truck, RotateCcw, Check, ShoppingBag } from 'lucide-react';

export const ProductDetailPage = ({ product, onBackToShop, onSelectProduct, onOpenCheckout }) => {
  const [selectedImage, setSelectedImage] = useState(product.galleryImages?.[0] || product.image);
  const [selectedSize, setSelectedSize] = useState('9.5');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#131417] text-white pt-24 pb-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Breadcrumb & Back Button */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <button
            onClick={onBackToShop}
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Shoes</span>
          </button>

          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
            SKU: {product.sku}
          </span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Main Image Card */}
            <div className="w-full aspect-[4/3] sm:aspect-square bg-white rounded-2xl p-8 sm:p-12 flex items-center justify-center relative overflow-hidden shadow-2xl border border-white/10 group">
              <span className="absolute top-4 left-4 text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded bg-black/5 text-zinc-700 font-medium">
                {product.categoryLabel}
              </span>
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail Carousel / Multi-Angle Selector */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-none w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-white p-2 border-2 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-[#ff5a1f] shadow-lg shadow-[#ff5a1f]/20 scale-105'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Commerce Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400">
                  Verified Authentic • In Stock
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif-fraunces font-normal tracking-tight text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span>Color: {product.colorway}</span>
                <span>•</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-white font-medium">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount})</span>
                </div>
              </div>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase font-mono text-zinc-400 block mb-1">
                  Retail Edition
                </span>
                <span className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                  ${product.price}
                </span>
                <span className="text-xs text-zinc-400 ml-2 font-mono">USD</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                Free Express Delivery
              </span>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-zinc-300 uppercase tracking-wider">Select US Men's Size</span>
                <span className="text-zinc-500">True to size</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-white text-black font-semibold shadow-lg scale-102'
                        : 'bg-white/5 border border-white/10 text-zinc-300 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    US {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/15 transition-all cursor-pointer"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenCheckout}
                className="flex-1 py-4 px-5 rounded-xl bg-[#ff5a1f] hover:bg-[#e04e18] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#ff5a1f]/25 transition-all cursor-pointer"
              >
                <span>Instant Checkout • ${product.price}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-[11px] font-mono text-zinc-400">
              <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-white/2">
                <ShieldCheck className="w-4 h-4 text-[#ff5a1f]" />
                <span>100% Authentic</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-white/2">
                <Truck className="w-4 h-4 text-[#ff5a1f]" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-white/2">
                <RotateCcw className="w-4 h-4 text-[#ff5a1f]" />
                <span>Easy Returns</span>
              </div>
            </div>

            {/* Product Description */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-2">
                Design & Architecture
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications */}
            {product.specs && (
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-3">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white/3 border border-white/5">
                      <span className="text-zinc-500 block text-[10px] uppercase">{spec.label}</span>
                      <span className="text-zinc-200 font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
