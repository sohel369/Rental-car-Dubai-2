'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { carsData } from '@/data/cars';
import { Star, Users, Fuel, Settings, Check, Calendar, MapPin, ArrowLeft, Phone } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function CarDetailPage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const car = carsData.find(c => c.id === id);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [addons, setAddons] = useState({ childSeat: false, additionalDriver: false, unlimitedKM: false });

    if (!car) {
        return (
            <><Navbar />
                <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>{t('common.error')}</h2>
                        <Link href="/cars" className="btn btn-primary">{t('nav.cars')}</Link>
                    </div>
                </div>
                <Footer /></>
        );
    }

    const days = pickupDate && returnDate
        ? Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
        : 1;

    const addonsCost = (addons.childSeat ? 50 : 0) + (addons.additionalDriver ? 100 : 0) + (addons.unlimitedKM ? 150 : 0);
    const total = (car.pricePerDay + addonsCost) * days;

    const [isBooking, setIsBooking] = useState(false);

    const handleBook = async () => {
        if (!user) {
            toast.error(t('auth.signInRequired', { defaultValue: 'Please sign in to book a car' }));
            const currentPath = window.location.pathname;
            router.push(`/auth/login?redirect=${currentPath}`);
            return;
        }

        if (!pickupDate || !returnDate) {
            toast.error(t('booking.selectDates', { defaultValue: 'Please select pickup and return dates' }));
            return;
        }

        try {
            setIsBooking(true);
            const { createBooking } = await import('@/lib/bookings');

            await createBooking({
                userId: user.uid,
                userName: user.displayName || 'Guest',
                userEmail: user.email || '',
                carId: car.id,
                carName: car.name,
                carBrand: car.brand,
                carImage: car.image,
                pickupDate,
                returnDate,
                totalPrice: total,
                status: 'pending',
                addons: addons
            });

            toast.success(t('booking.bookingSuccess', { defaultValue: 'Successfully Booked!' }) + ` ${car.brand} ${car.name}`);
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error(t('common.error', { defaultValue: 'Something went wrong' }));
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#0a0a0f' }}>
                <div className="container" style={{ padding: '3rem 1.5rem' }}>
                    <Link href="/cars" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.88rem', marginBottom: '2rem' }}>
                        <ArrowLeft size={16} /> {t('common.back')} {t('nav.cars')}
                    </Link>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', alignItems: 'start' }}>
                        {/* Left */}
                        <div>
                            {/* Image */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                style={{ borderRadius: 20, overflow: 'hidden', marginBottom: '2rem', border: '1px solid rgba(201,162,39,0.15)' }}>
                                <img src={car.image} alt={`${car.brand} ${car.name}`} style={{ width: '100%', height: 380, objectFit: 'cover' }} />
                            </motion.div>

                            {/* Info */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.82rem', color: '#c9a227', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{car.brand}</div>
                                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{car.name}</h1>
                                    </div>
                                    <span className={`badge ${car.available ? 'badge-green' : 'badge-red'}`}>{car.available ? t('cars.available') : t('cars.unavailable')}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= Math.floor(car.rating) ? '#c9a227' : 'transparent'} color="#c9a227" />)}
                                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{car.rating} · {car.reviews} {t('booking.reviews')}</span>
                                </div>

                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>{car.description}</p>

                                {/* Specs */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                                    {[
                                        { label: t('cars.specs.seats'), value: `${car.seats} ${t('cars.specs.seats')}`, Icon: Users },
                                        { label: t('cars.specs.transmission'), value: car.transmission, Icon: Settings },
                                        { label: t('cars.specs.fuel'), value: car.fuel, Icon: Fuel },
                                        { label: t('hero.pickupDate'), value: car.year, Icon: Calendar },
                                    ].map(({ label, value, Icon }) => (
                                        <div key={label} style={{
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                            borderRadius: 12, padding: '1rem',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                <Icon size={14} color="#c9a227" />
                                                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                                            </div>
                                            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 style={{ color: '#c9a227', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>{t('cars.features')}</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                                        {car.features.map(feat => (
                                            <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem' }}>
                                                <Check size={14} color="#10b981" /> {feat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Booking Card */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            style={{
                                background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(201,162,39,0.2)', borderRadius: 20,
                                padding: '1.75rem', position: 'sticky', top: 100,
                            }}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>{t('hero.ctaSecondary')}</div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                                    <span style={{ fontSize: '2.2rem', fontWeight: 900, background: 'linear-gradient(135deg,#c9a227,#e8c84d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                        {t('common.currency')} {car.pricePerDay.toLocaleString()}
                                    </span>
                                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>{t('cars.perDay')}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label"><Calendar size={13} style={{ [t('dir') === 'rtl' ? 'marginLeft' : 'marginRight']: 4 }} />{t('hero.pickupDate')}</label>
                                    <input type="date" className="form-input" value={pickupDate} onChange={e => setPickupDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label"><Calendar size={13} style={{ [t('dir') === 'rtl' ? 'marginLeft' : 'marginRight']: 4 }} />{t('hero.dropoffDate')}</label>
                                    <input type="date" className="form-input" value={returnDate} onChange={e => setReturnDate(e.target.value)} min={pickupDate || new Date().toISOString().split('T')[0]} />
                                </div>
                            </div>

                            {/* Add-ons */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>{t('booking.addons')}</h4>
                                {[
                                    { key: 'childSeat', label: t('booking.childSeat'), price: 50 },
                                    { key: 'additionalDriver', label: t('booking.additionalDriver'), price: 100 },
                                    { key: 'unlimitedKM', label: t('booking.unlimitedKM'), price: 150 },
                                ].map(({ key, label, price }) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <input type="checkbox" checked={addons[key as keyof typeof addons]}
                                                onChange={() => setAddons(a => ({ ...a, [key]: !a[key as keyof typeof addons] }))}
                                                style={{ accentColor: '#c9a227', width: 16, height: 16, cursor: 'pointer' }} />
                                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.86rem' }}>{label}</span>
                                        </div>
                                        <span style={{ color: '#c9a227', fontSize: '0.82rem', fontWeight: 600 }}>+{t('common.currency')} {price}/{t('cars.perDay')}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Price Summary */}
                            <div style={{ background: 'rgba(201,162,39,0.05)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>
                                    <span>{t('common.currency')} {car.pricePerDay} × {days} {t('common.days')}</span>
                                    <span>{t('common.currency')} {(car.pricePerDay * days).toLocaleString()}</span>
                                </div>
                                {addonsCost > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>
                                        <span>{t('booking.addons')}</span><span>{t('common.currency')} {addonsCost * days}</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#fff', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.6rem', marginTop: '0.4rem' }}>
                                    <span>{t('booking.total')}</span>
                                    <span style={{ background: 'linear-gradient(135deg,#c9a227,#e8c84d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                        {t('common.currency')} {total.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <button onClick={handleBook} className={`btn ${car.available ? 'btn-primary' : 'btn-ghost'} w-full`}
                                disabled={!car.available} style={{ padding: '0.95rem', justifyContent: 'center', fontSize: '1rem' }}>
                                {car.available ? t('cars.bookNow') : t('cars.unavailable')}
                            </button>

                            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971500000000'}?text=${encodeURIComponent(`Hi! I'm interested in the ${car.brand} ${car.name}`)}`}
                                target="_blank" rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    marginTop: '0.75rem', padding: '0.75rem', borderRadius: 12,
                                    background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)',
                                    color: '#25d366', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.15)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.1)')}
                            >
                                <Phone size={15} /> {t('footer.contact')} {t('common.whatsapp')}
                            </a>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppFAB />
            <style>{`
        @media (max-width: 900px) {
          main > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </>
    );
}
