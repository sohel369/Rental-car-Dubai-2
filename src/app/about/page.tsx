'use client';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { Award, Users, Car, Globe, Star } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#0a0a0f' }}>
                {/* Hero */}
                <div style={{
                    background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1025 60%, #0f0a1a 100%)',
                    padding: '6rem 0 5rem', borderBottom: '1px solid rgba(201,162,39,0.1)', position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '30%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="section-badge"><Award size={12} /> {t('about.storyBadge')}</span>
                            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '1.25rem 0 1rem' }}>
                                {t('about.storyTitle')}
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                                {t('about.storyDesc')}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ background: 'rgba(201,162,39,0.04)', borderBottom: '1px solid rgba(201,162,39,0.08)', padding: '2.5rem 0' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
                            {[
                                { value: '200+', label: t('about.statsVehicles'), Icon: Car },
                                { value: '10K+', label: t('about.statsCustomers'), Icon: Users },
                                { value: '5★', label: t('about.statsRating'), Icon: Star },
                                { value: '7+', label: t('about.statsYears'), Icon: Globe },
                            ].map(({ value, label, Icon }, i) => (
                                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    style={{ textAlign: 'center', padding: '1rem' }}>
                                    <Icon size={24} color="#c9a227" style={{ margin: '0 auto 0.75rem' }} />
                                    <div style={{ fontSize: '2.2rem', fontWeight: 900, background: 'linear-gradient(135deg,#c9a227,#e8c84d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{value}</div>
                                    <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem', fontWeight: 500 }}>{label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Story */}
                <section className="section">
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                            <motion.div initial={{ opacity: 0, x: isRtl ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem' }}>
                                    {t('about.passionTitle')}
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '1rem' }}>
                                    {t('about.passionDesc1')}
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem' }}>
                                    {t('about.passionDesc2')}
                                </p>
                                <Link href="/cars" className="btn btn-primary btn-lg">{t('about.exploreFleet')}</Link>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(201,162,39,0.15)', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80"
                                        alt="Car rental Dubai skyline"
                                        style={{ width: '100%', height: 440, objectFit: 'cover' }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="section" style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%)' }}>
                    <div className="container">
                        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <span className="section-badge">{t('about.valuesBadge')}</span>
                            <h2 className="section-title">{t('about.valuesTitle')}</h2>
                            <div className="divider-gold"></div>
                        </motion.div>

                        <div className="grid-3" style={{ gap: '2rem' }}>
                            {[
                                { title: t('about.values.v1.title'), desc: t('about.values.v1.desc'), emoji: '🔍' },
                                { title: t('about.values.v2.title'), desc: t('about.values.v2.desc'), emoji: '⭐' },
                                { title: t('about.values.v3.title'), desc: t('about.values.v3.desc'), emoji: '❤️' },
                                { title: t('about.values.v4.title'), desc: t('about.values.v4.desc'), emoji: '🚀' },
                                { title: t('about.values.v5.title'), desc: t('about.values.v5.desc'), emoji: '🌿' },
                                { title: t('about.values.v6.title'), desc: t('about.values.v6.desc'), emoji: '💬' },
                            ].map(({ title, desc, emoji }, i) => (
                                <motion.div key={title} className="card" style={{ padding: '2.5rem' }}
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{emoji}</div>
                                    <h3 style={{ fontWeight: 700, color: '#fff', marginBottom: '0.8rem', fontSize: '1.1rem' }}>{title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.92rem', lineHeight: 1.7 }}>{desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppFAB />
            <style>{`
                @media (max-width: 768px) {
                    .section { padding: 4rem 1rem; }
                    .grid-3 { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
                }
            `}</style>
        </>
    );
}
