import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Star } from 'lucide-react';
import { productsData, categories, colorFilters } from '../../data/productsData';

export const ShopPage = ({ onSelectProduct, onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Color filter
        if (selectedColor !== 'all' && product.colorKey !== selectedColor) {
          return false;
        }
        // Price filter
        if (priceRange === 'under-100' && product.price >= 100) return false;
        if (priceRange === '100-200' && (product.price < 100 || product.price > 200)) return false;
        if (priceRange === 'over-200' && product.price <= 200) return false;
        // Search filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchColor = product.colorway.toLowerCase().includes(q);
          const matchCategory = product.categoryLabel.toLowerCase().includes(q);
          if (!matchName && !matchColor && !matchCategory) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured
      });
  }, [selectedCategory, selectedColor, priceRange, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedColor('all');
    setPriceRange('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedColor !== 'all' ||
    priceRange !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-[#131417] text-white pt-24 pb-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#ff5a1f]">
                Official Collection
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-[11px] font-mono text-zinc-400">
                {filteredProducts.length} Silhouettes Available
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif-fraunces font-normal tracking-tight text-white">
              The Footwear Catalog
            </h1>
          </div>

          {/* Search & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Yeezy models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-64 pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f] transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 hover:bg-white/10 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filter Column */}
          <aside
            className={`lg:col-span-3 flex flex-col gap-6 p-6 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-md sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3 scrollbar-thin ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#ff5a1f]" />
                <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                  Filter Catalog
                </span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-mono text-[#ff5a1f] hover:underline cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Silhouette Model
              </h3>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all text-left cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#ff5a1f] text-white font-medium shadow-md shadow-[#ff5a1f]/20'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] opacity-70">
                      {cat.id === 'all'
                        ? productsData.length
                        : productsData.filter((p) => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Filter */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Color Shade
              </h3>
              <div className="flex flex-col gap-1.5">
                {colorFilters.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedColor(col.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all text-left cursor-pointer ${
                      selectedColor === col.id
                        ? 'bg-white text-black font-semibold shadow-md'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{col.label}</span>
                    <span className="text-[10px] opacity-70">
                      {col.id === 'all'
                        ? productsData.length
                        : productsData.filter((p) => p.colorKey === col.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Price Tier
              </h3>
              <div className="grid grid-cols-1 gap-1.5 text-xs font-mono">
                {[
                  { id: 'all', label: 'All Price Tiers' },
                  { id: 'under-100', label: 'Under $100 (Slides & Foams)' },
                  { id: '100-200', label: '$100 - $200' },
                  { id: 'over-200', label: '$200+ (350 V2 Boost)' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setPriceRange(tier.id)}
                    className={`px-3 py-2 rounded-lg text-left transition-all cursor-pointer ${
                      priceRange === tier.id
                        ? 'bg-white/20 text-white font-medium border border-white/30'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                <ArrowUpDown className="w-3 h-3 text-[#ff5a1f]" />
                <span>Sort Sequence</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#ff5a1f] cursor-pointer"
              >
                <option value="featured">Featured Curated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Model Name A-Z</option>
              </select>
            </div>
          </aside>

          {/* Products Grid Column */}
          <main className="lg:col-span-9 flex flex-col gap-6">
            {filteredProducts.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white/2 border border-white/5">
                <p className="text-lg font-serif-fraunces text-zinc-300 mb-2">
                  No Yeezy silhouettes match these criteria
                </p>
                <p className="text-xs font-mono text-zinc-500 mb-4">
                  Try adjusting your category, color, or price filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-lg bg-[#ff5a1f] text-white text-xs font-mono tracking-wider uppercase cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="group bg-white/2 hover:bg-white/5 rounded-2xl border border-white/8 hover:border-white/25 overflow-hidden transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
                  >
                    {/* Clean White Card for Shoe Photo */}
                    <div className="w-full aspect-[4/3] bg-white p-6 flex items-center justify-center relative overflow-hidden">
                      <span className="absolute top-3 left-3 text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-black/5 text-zinc-700 font-medium z-10">
                        {product.categoryLabel}
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain filter group-hover:scale-108 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Metadata & Action */}
                    <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-400 mb-1">
                          <span>{product.colorway}</span>
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-white text-[11px] font-medium">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                        <h2 className="text-base sm:text-lg font-serif-fraunces font-normal text-white group-hover:text-[#ff5a1f] transition-colors leading-snug">
                          {product.name}
                        </h2>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/8">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-zinc-500 block">
                            Price
                          </span>
                          <span className="text-lg font-semibold text-white tracking-tight">
                            ${product.price}
                          </span>
                        </div>
                        <button className="px-3.5 py-1.5 rounded-lg bg-white/10 group-hover:bg-[#ff5a1f] text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
