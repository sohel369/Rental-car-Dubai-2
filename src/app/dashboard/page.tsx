'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { subscribeToUserBookings, cancelBooking, Booking } from '@/lib/bookings';
import {
    Clock,
    CheckCircle,
    XCircle,
    Car as CarIcon,
    Calendar,
    CreditCard,
    User as UserIcon,
    Settings,
    LogOut,
    ChevronRight,
    Search
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Dashboard() {
    const { t, i18n } = useTranslation();
    const { user, logOut, loading: authLoading } = useAuth();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'settings'>('bookings');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login?redirect=/dashboard');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user) return;

        const unsub = subscribeToUserBookings(user.uid, (data) => {
            setBookings(data);
            setLoading(false);
        });

        return () => unsub();
    }, [user]);

    const handleCancel = async (id: string) => {
        if (confirm(t('dashboard.confirmCancel', { defaultValue: 'Are you sure you want to cancel this booking?' }))) {
            try {
                await cancelBooking(id);
                toast.success(t('dashboard.cancelSuccess', { defaultValue: 'Booking cancelled successfully' }));
            } catch (error) {
                toast.error(t('common.error'));
            }
        }
    };

    if (authLoading || (!authLoading && !user)) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f' }}>
                <div className="spinner" />
            </div>
        );
    }

    const isRtl = i18n.language?.startsWith('ar');

    return (
        <div dir={isRtl ? 'rtl' : 'ltr'}>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#0a0a0f' }}>
                <div className="container" style={{ padding: '3rem 1.5rem' }}>
                    <div className="dashboard-grid">

                        {/* Sidebar */}
                        <aside>
                            <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                                <div style={{
                                    width: 80, height: 80, borderRadius: '50%', margin: '0 auto 1rem',
                                    background: 'linear-gradient(135deg, #c9a227, #e8c84d)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '2.2rem', fontWeight: 900, color: '#000',
                                    boxShadow: '0 0 20px rgba(201,162,39,0.3)'
                                }}>
                                    {user?.displayName?.[0] || user?.email?.[0].toUpperCase() || 'U'}
                                </div>
                                <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{user?.displayName}</h2>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{user?.email}</p>
                            </div>

                            <div className="card" style={{ overflow: 'hidden' }}>
                                {[
                                    { id: 'bookings', label: t('dashboard.bookings'), Icon: Calendar },
                                    { id: 'profile', label: t('dashboard.profile'), Icon: UserIcon },
                                    { id: 'settings', label: t('dashboard.settings', { defaultValue: 'Settings' }), Icon: Settings },
                                ].map(({ id, label, Icon }) => (
                                    <button
                                        key={id}
                                        onClick={() => setActiveTab(id as any)}
                                        style={{
                                            width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
                                            padding: '1.25rem 1.5rem', border: 'none', cursor: 'pointer',
                                            background: activeTab === id ? 'rgba(201,162,39,0.1)' : 'transparent',
                                            color: activeTab === id ? '#c9a227' : 'rgba(255,255,255,0.6)',
                                            transition: 'all 0.2s',
                                            borderLeft: !isRtl && activeTab === id ? '3px solid #c9a227' : 'none',
                                            borderRight: isRtl && activeTab === id ? '3px solid #c9a227' : 'none',
                                            textAlign: isRtl ? 'right' : 'left'
                                        }}
                                    >
                                        <Icon size={18} />
                                        <span style={{ fontWeight: 600 }}>{label}</span>
                                    </button>
                                ))}
                                <button
                                    onClick={() => logOut()}
                                    style={{
                                        width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '1.25rem 1.5rem', border: 'none', background: 'transparent',
                                        color: '#ef4444', cursor: 'pointer', transition: 'all 0.2s',
                                        textAlign: isRtl ? 'right' : 'left'
                                    }}
                                >
                                    <LogOut size={18} />
                                    <span style={{ fontWeight: 600 }}>{t('nav.signOut')}</span>
                                </button>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="dashboard-content">
                            {activeTab === 'bookings' && (
                                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }} className="content-header">
                                        <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800 }}>{t('dashboard.bookings')}</h1>
                                        <div style={{ position: 'relative', width: 280 }} className="search-box">
                                            <Search size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', [isRtl ? 'right' : 'left']: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                            <input type="text" placeholder={t('hero.searchCars')}
                                                className="form-input" style={{ [isRtl ? 'paddingRight' : 'paddingLeft']: '2.8rem', fontSize: '0.9rem' }} />
                                        </div>
                                    </div>

                                    {loading ? (
                                        <div style={{ padding: '6rem 0', textAlign: 'center' }}>
                                            <div className="spinner" style={{ margin: '0 auto' }} />
                                        </div>
                                    ) : bookings.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            {bookings.map((booking) => (
                                                <div key={booking.id} className="card booking-card" style={{ display: 'grid', gridTemplateColumns: '140px 1fr 200px', gap: '1.5rem', padding: '1.25rem', alignItems: 'center' }}>
                                                    <div style={{ height: 100, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                        <img src={booking.carImage} alt={booking.carName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                    <div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                                                            <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{booking.carBrand}</span>
                                                            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>{booking.carName}</h3>
                                                        </div>
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginTop: '0.6rem' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.86rem' }}>
                                                                <Calendar size={14} color="#c9a227" /> {booking.pickupDate} → {booking.returnDate}
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.86rem' }}>
                                                                <CreditCard size={14} color="#c9a227" /> {t('common.currency')} {booking.totalPrice.toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: isRtl ? 'flex-start' : 'flex-end', gap: '0.8rem', [!isRtl ? 'borderLeft' : 'borderRight']: '1px solid rgba(255,255,255,0.06)', [!isRtl ? 'paddingLeft' : 'paddingRight']: '1.5rem', textAlign: isRtl ? 'right' : 'left' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                                            className={`badge ${booking.status === 'confirmed' ? 'badge-green' : booking.status === 'cancelled' ? 'badge-red' : 'badge-gold'}`}>
                                                            {booking.status === 'confirmed' ? <CheckCircle size={14} /> : booking.status === 'cancelled' ? <XCircle size={14} /> : <Clock size={14} />}
                                                            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                                {t(`dashboard.status.${booking.status}`, { defaultValue: booking.status })}
                                                            </span>
                                                        </div>
                                                        {booking.status === 'pending' && (
                                                            <button
                                                                onClick={() => handleCancel(booking.id!)}
                                                                style={{ border: 'none', background: 'none', color: '#ef4444', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                                                                {t('dashboard.cancelBooking')}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="card" style={{ padding: '6rem', textAlign: 'center', opacity: 0.6 }}>
                                            <CarIcon size={48} color="#c9a227" style={{ margin: '0 auto 1.5rem' }} />
                                            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{t('dashboard.noBookings')}</h3>
                                            <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>{t('dashboard.noBookingsDesc')}</p>
                                            <Link href="/cars" className="btn btn-primary">{t('nav.cars')}</Link>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab !== 'bookings' && (
                                <div className="card" style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
                                    <Settings size={40} style={{ margin: '0 auto 1.25rem' }} />
                                    <p>{activeTab === 'profile' ? t('dashboard.profile') : t('dashboard.settings')} {t('dashboard.comingSoon')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppFAB />
            <style>{`
                .dashboard-grid {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 2.5rem;
                }
                @media (max-width: 900px) {
                    .dashboard-grid { grid-template-columns: 1fr !important; }
                    .content-header { flex-direction: column; align-items: flex-start !important; gap: 1rem; }
                    .search-box { width: 100% !important; }
                    .booking-card { grid-template-columns: 100px 1fr !important; }
                    .booking-card > :last-child { 
                        grid-column: 1 / -1; 
                        border: none !important; 
                        padding: 0 !important; 
                        flex-direction: row !important; 
                        justify-content: space-between !important;
                        border-top: 1px solid rgba(255,255,255,0.06) !important;
                        padding-top: 1rem !important;
                        margin-top: 0.5rem;
                    }
                }
                @media (max-width: 480px) {
                    .booking-card { grid-template-columns: 1fr !important; text-align: center !important; }
                    .booking-card img { height: 160px !important; }
                    .booking-card > div:nth-child(2) { align-items: center; display: flex; flex-direction: column; }
                }
            `}</style>
        </div>
    );
}
