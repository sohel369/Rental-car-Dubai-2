'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { carsData } from '@/data/cars';
import { Search, SlidersHorizontal } from 'lucide-react';

import { useTranslation } from 'react-i18next';

const categories = ['all', 'economy', 'luxury', 'suv', 'sports'] as const;
type Category = typeof categories[number];

export default function CarsPage() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<Category>('all');
    const [maxPrice, setMaxPrice] = useState(3000);
    const [transmission, setTransmission] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    const filtered = carsData.filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) ||
            car.brand.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'all' || car.category === category;
        const matchesPrice = car.pricePerDay <= maxPrice;
        const matchesTransmission = transmission === 'all' || car.transmission === transmission;
        return matchesSearch && matchesCategory && matchesPrice && matchesTransmission;
    });

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#0a0a0f' }}>
                {/* Page Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1025 100%)',
                    padding: '4rem 0 3rem', borderBottom: '1px solid rgba(201,162,39,0.1)',
                }}>
                    <div className="container">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="section-badge" style={{ marginBottom: '1rem' }}>{t('nav.cars')}</span>
                            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
                                {t('cars.filters.findYourPerfectDrive')}
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>
                                {filtered.length} {t('cars.filters.vehiclesAvailable')} · {t('cars.filters.filterMatch')}
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
                    {/* Search & Filter Bar */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
                            <Search size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', [isRtl ? 'right' : 'left']: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input type="text" placeholder={t('cars.filters.searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)}
                                className="form-input" style={{ [isRtl ? 'paddingRight' : 'paddingLeft']: '2.7rem', width: '100%' }} />
                        </div>
                        <button onClick={() => setShowFilters(!showFilters)} className="btn btn-ghost" style={{ gap: '0.5rem' }}>
                            <SlidersHorizontal size={16} /> {t('cars.filters.filtersBtn')}
                        </button>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            style={{
                                background: 'rgba(18,18,26,0.8)', border: '1px solid rgba(201,162,39,0.15)',
                                borderRadius: 16, padding: '1.5rem', marginBottom: '2rem',
                            }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">{t('cars.filters.maxPrice')} ({t('common.currency')}/{t('cars.perDay').replace('/', '').trim()}): {maxPrice}</label>
                                    <input type="range" min={100} max={3000} step={50} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)}
                                        style={{ width: '100%', accentColor: '#c9a227' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                                        <span>{t('common.currency')} 100</span><span>{t('common.currency')} 3000</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t('cars.filters.transmission')}</label>
                                    <select value={transmission} onChange={e => setTransmission(e.target.value)}
                                        className="form-input" style={{ cursor: 'pointer' }}>
                                        <option value="all">{t('cars.filters.transmissionAll')}</option>
                                        <option value="Automatic">{t('cars.specs.transmission')}</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Category Pills */}
                    <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setCategory(cat)}
                                className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-ghost'}`}>
                                {t(`cars.filters.${cat}`)}
                            </button>
                        ))}
                    </div>

                    {/* Car Grid */}
                    {filtered.length > 0 ? (
                        <div className="grid-3">
                            {filtered.map((car, i) => (
                                <CarCard key={car.id} car={car} index={i} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.4)' }}>
                            <Search size={40} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.4 }} />
                            <p>{t('cars.filters.noMatch')}</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            <WhatsAppFAB />
        </>
    );
}
