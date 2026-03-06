'use client';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, ChevronRight, Star, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
    const { t, i18n } = useTranslation();
    const [pickup, setPickup] = useState('');
    const [dropDate, setDropDate] = useState('');
    const [pickDate, setPickDate] = useState('');

    return (
        <section style={{
            position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', overflow: 'hidden', paddingTop: '6rem'
        }}>
            {/* Cinematic Background Image */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Image
                    src="/hero-new.png"
                    alt="Dubai Hypercar"
                    fill
                    priority
                    style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.6 }}
                    className="hero-image"
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(3,3,5,0.2) 0%, rgba(3,3,5,0.8) 70%, rgba(3,3,5,1) 100%)'
                }} />
                {/* Radial glow around the car */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '80vw', height: '80vh', background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%)',
                    pointerEvents: 'none'
                }} />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="section-badge" style={{ marginBottom: '2rem' }}>
                        <Star size={14} fill="currentColor" /> {t('hero.badge')}
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                        fontWeight: 900,
                        color: 'var(--text-pure)',
                        textTransform: 'uppercase',
                        lineHeight: 1.1,
                        letterSpacing: '-0.03em',
                        position: 'relative',
                        zIndex: 2,
                        textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                        {t('hero.title1', { defaultValue: 'Drive Your' })} <br style={{ display: 'block', margin: '0.2em 0' }} />
                        <span style={{
                            background: 'var(--gradient-gold)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline-block'
                        }}>
                            {t('hero.title2', { defaultValue: 'Dream' })}
                        </span>
                    </h1>

                    <p style={{
                        color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6
                    }}>
                        {t('hero.description')}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
                        <Link href="/cars" className="btn btn-primary btn-lg">
                            {t('hero.cta')} <ChevronRight size={20} />
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Search Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="glass-panel"
                    style={{
                        padding: '2rem', borderRadius: '24px', maxWidth: '1000px', margin: '0 auto',
                        textAlign: 'left'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>{t('hero.searchCars')}</h2>
                        <span className="badge badge-gold">{t('hero.instantBooking', { defaultValue: 'Instant Booking' })}</span>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem', alignItems: 'end'
                    }}>
                        <div className="form-group">
                            <label className="form-label">{t('hero.pickupLabel')}</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} color="#d4af37" style={{ position: 'absolute', [i18n.language?.startsWith('ar') ? 'right' : 'left']: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder={t('hero.searchPlaceholder')}
                                    value={pickup}
                                    onChange={e => setPickup(e.target.value)}
                                    style={{ paddingLeft: (i18n.language === 'ar' || i18n.language === 'ar-AE') ? '1rem' : '3rem', paddingRight: (i18n.language === 'ar' || i18n.language === 'ar-AE') ? '3rem' : '1rem' }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">{t('hero.pickupDate')}</label>
                            <div style={{ position: 'relative' }}>
                                <Calendar size={18} color="#d4af37" style={{ position: 'absolute', [i18n.language?.startsWith('ar') ? 'right' : 'left']: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input type="date" className="form-input" value={pickDate} onChange={e => setPickDate(e.target.value)} style={{ paddingLeft: i18n.language?.startsWith('ar') ? '1rem' : '3rem', paddingRight: i18n.language?.startsWith('ar') ? '3rem' : '1rem' }} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">{t('hero.dropoffDate')}</label>
                            <div style={{ position: 'relative' }}>
                                <Calendar size={18} color="#d4af37" style={{ position: 'absolute', [i18n.language?.startsWith('ar') ? 'right' : 'left']: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input type="date" className="form-input" value={dropDate} onChange={e => setDropDate(e.target.value)} style={{ paddingLeft: i18n.language?.startsWith('ar') ? '1rem' : '3rem', paddingRight: i18n.language?.startsWith('ar') ? '3rem' : '1rem' }} />
                            </div>
                        </div>

                        <Link href={`/cars?pickup=${pickup}&from=${pickDate}&to=${dropDate}`} className="btn btn-primary" style={{ padding: '1rem', width: '100%', height: '54px' }}>
                            <Search size={20} />
                            {t('hero.searchCars')}
                        </Link>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                .hero-image {
                    animation: panImage 30s linear infinite;
                }
            `}</style>
        </section>
    );
}

