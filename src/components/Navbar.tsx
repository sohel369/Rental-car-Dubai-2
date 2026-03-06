'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Car } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/context/I18nContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function Navbar() {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { lang, toggleLang } = useI18n();
    const { user, logOut } = useAuth();

    const navLinks = [
        { label: t('nav.home'), href: '/' },
        { label: t('nav.cars'), href: '/cars' },
        { label: t('nav.about'), href: '/about' },
        { label: t('nav.blog'), href: '/blog' },
        { label: t('nav.contact'), href: '/contact' },
    ];

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const handleLogout = async () => {
        await logOut();
        toast.success(t('nav.signOut') + ' ' + t('common.success', { defaultValue: 'successfully' }));
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem', zIndex: 10 }}>
                    <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: 'var(--gradient-gold)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: 'var(--shadow-gold)'
                    }}>
                        <Car size={22} color="#000" />
                    </div>
                    <div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-pure)', lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                            {t('nav.brandName')}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t('nav.carRental')}</div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} >
                    {navLinks.map((l) => (
                        <Link key={l.href} href={l.href} style={{
                            color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem',
                            fontWeight: 500, transition: 'var(--transition-fast)', textTransform: 'uppercase', letterSpacing: '0.05em'
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                        >{l.label}</Link>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 10 }}>
                    {/* Language Toggle */}
                    <button onClick={toggleLang} className="btn btn-ghost btn-sm" style={{ padding: '0.5rem 1rem', gap: '0.4rem', borderRadius: '99px' }}>
                        <Globe size={16} />
                        {lang === 'en' ? 'عربي' : 'EN'}
                    </button>

                    <div className="desktop-actions" style={{ display: 'flex', gap: '1rem' }}>
                        {user ? (
                            <>
                                <Link href="/dashboard" className="btn btn-ghost btn-sm">{t('nav.dashboard')}</Link>
                                <button onClick={handleLogout} className="btn btn-outline btn-sm">{t('nav.signOut')}</button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login" className="btn btn-ghost btn-sm">{t('nav.signIn')}</Link>
                                <Link href="/auth/register" className="btn btn-primary btn-sm">{t('nav.signUp')}</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu toggle */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} style={{
                        display: 'none', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)',
                        color: 'var(--text-pure)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px'
                    }} className="mobile-menu-btn">
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{
                            background: 'var(--bg-carbon)', backdropFilter: 'blur(30px)',
                            borderTop: '1px solid var(--border-subtle)', overflow: 'hidden',
                            position: 'absolute', top: '100%', left: 0, right: 0,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
                        }}
                    >
                        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {navLinks.map((l) => (
                                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                                    style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600, padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                    {l.label}
                                </Link>
                            ))}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                                {user ? (
                                    <>
                                        <Link href="/dashboard" className="btn btn-ghost w-full" onClick={() => setMobileOpen(false)}>{t('nav.dashboard')}</Link>
                                        <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="btn btn-outline w-full">{t('nav.signOut')}</button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/auth/login" className="btn btn-ghost w-full" onClick={() => setMobileOpen(false)}>{t('nav.signIn')}</Link>
                                        <Link href="/auth/register" className="btn btn-primary w-full" onClick={() => setMobileOpen(false)}>{t('nav.signUp')}</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @media (max-width: 900px) {
                    .navbar-links { display: none !important; }
                    .desktop-actions { display: none !important; }
                    .mobile-menu-btn { display: flex !important; }
                }
            `}</style>
        </nav>
    );
}
