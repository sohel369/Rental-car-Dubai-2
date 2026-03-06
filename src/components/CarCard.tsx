'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Users, Fuel, Settings, ArrowRight } from 'lucide-react';
import type { Car } from '@/data/cars';
import { useTranslation } from 'react-i18next';

interface CarCardProps {
    car: Car;
    index?: number;
}

export default function CarCard({ car, index = 0 }: CarCardProps) {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card"
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
            {/* Image Container */}
            <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: 'var(--bg-carbon)' }}>
                <img
                    src={car.image}
                    alt={`${car.brand} ${car.name}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                />

                {/* Category badge */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    <span className="badge badge-gold" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.4rem 0.8rem', background: 'rgba(212,175,55,0.2)', backdropFilter: 'blur(10px)' }}>{car.category}</span>
                </div>

                {/* Availability */}
                <div style={{ position: 'absolute', top: '1rem', [t('dir') === 'rtl' ? 'left' : 'right']: '1rem' }}>
                    <span className={`badge ${car.available ? 'badge-green' : 'badge-red'}`} style={{ backdropFilter: 'blur(10px)' }}>
                        {car.available ? t('cars.available') : t('cars.unavailable')}
                    </span>
                </div>

                {/* Bottom glass gradient */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                    background: 'linear-gradient(to top, var(--bg-elevated) 0%, transparent 100%)',
                }} />
            </div>

            {/* Content Container */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-elevated)' }}>
                {/* Brand & Name */}
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        {car.brand}
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-pure)' }}>{car.name}</div>
                </div>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <div className="stars" style={{ display: 'flex', gap: 2 }}>
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={14} fill={s <= Math.floor(car.rating) ? 'var(--gold-primary)' : 'transparent'} color="var(--gold-primary)" />
                        ))}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{car.rating} ({car.reviews})</span>
                </div>

                {/* Specs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem', flex: 1 }}>
                    {[
                        { Icon: Users, text: `${car.seats} ${t('cars.specs.seats')}` },
                        { Icon: Fuel, text: car.fuel },
                        { Icon: Settings, text: car.transmission },
                        { Icon: Settings, text: `${car.doors} ${t('cars.specs.doors')}` },
                    ].map(({ Icon, text }) => (
                        <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <Icon size={14} color="var(--gold-primary)" />
                            {text}
                        </div>
                    ))}
                </div>

                {/* Price & CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <div>
                        <span style={{ fontSize: '1.8rem', fontWeight: 900, background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {t('common.currency')} {car.pricePerDay.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', [t('dir') === 'rtl' ? 'marginRight' : 'marginLeft']: '0.25rem' }}>/{t('cars.perDay')}</span>
                    </div>
                    <Link
                        href={car.available ? `/cars/${car.id}` : '#'}
                        className={`btn btn-sm ${car.available ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: car.available ? 1 : 0.5, flexDirection: t('dir') === 'rtl' ? 'row-reverse' : 'row' }}
                    >
                        {t('cars.bookNow')} <ArrowRight size={16} style={{ transform: t('dir') === 'rtl' ? 'rotate(180deg)' : 'none' }} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
