'use client';
import Link from 'next/link';
import { Car, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer style={{
            background: 'var(--bg-carbon)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '5rem 0 2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Subtle top glow */}
            <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold-primary), transparent)',
                opacity: 0.2
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                    {/* Brand Section */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: '50%',
                                background: 'var(--gradient-gold)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: 'var(--shadow-gold)'
                            }}>
                                <Car size={22} color="#000" />
                            </div>
                            <div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-pure)', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                                    {t('nav.brandName')}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>{t('nav.carRental')}</div>
                            </div>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                            {t('footer.description')}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" style={{
                                    width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)',
                                    color: 'var(--gold-primary)', transition: 'var(--transition-normal)', textDecoration: 'none',
                                }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.1)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.3)';
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                    }}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{t('footer.quickLinks')}</h4>
                        {[
                            { label: t('nav.home'), href: '/' },
                            { label: t('nav.cars'), href: '/cars' },
                            { label: t('nav.about'), href: '/about' },
                            { label: t('nav.blog'), href: '/blog' },
                            { label: t('nav.contact'), href: '/contact' },
                        ].map((l) => (
                            <Link key={l.href} href={l.href} style={{
                                display: 'block', color: 'var(--text-secondary)', fontSize: '0.95rem',
                                textDecoration: 'none', marginBottom: '0.8rem', transition: 'var(--transition-fast)',
                            }}
                                onMouseEnter={e => { (e.currentTarget.style.color = 'var(--gold-primary)'); (e.currentTarget.style.transform = 'translateX(5px)') }}
                                onMouseLeave={e => { (e.currentTarget.style.color = 'var(--text-secondary)'); (e.currentTarget.style.transform = 'translateX(0)') }}
                            >{l.label}</Link>
                        ))}
                    </div>

                    {/* Services */}
                    <div>
                        <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{t('cars.title')}</h4>
                        {[
                            t('cars.filters.economy'),
                            t('cars.filters.luxury'),
                            t('cars.filters.suv'),
                            t('cars.filters.sports'),
                            t('footer.longTermRental', { defaultValue: 'Long-Term Rental' }),
                            t('footer.airportTransfer', { defaultValue: 'Airport Transfer' })
                        ].map((s) => (
                            <p key={s} style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.8rem' }}>{s}</p>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{t('footer.contact')}</h4>
                        {[
                            { Icon: MapPin, text: t('footer.address') },
                            { Icon: Phone, text: t('footer.phone') },
                            { Icon: Mail, text: t('footer.email') },
                        ].map(({ Icon, text }) => (
                            <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                                <Icon size={18} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        © {new Date().getFullYear()} Golden Key Car Rental L.L.C. {t('footer.rights')}
                    </p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        {[
                            { label: t('footer.privacyPolicy', { defaultValue: 'Privacy Policy' }), href: '#' },
                            { label: t('footer.termsConditions', { defaultValue: 'Terms & Conditions' }), href: '#' }
                        ].map((link) => (
                            <Link key={link.label} href={link.href} style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', transition: 'var(--transition-fast)' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                            >{link.label}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
