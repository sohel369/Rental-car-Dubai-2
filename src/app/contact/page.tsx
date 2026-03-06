'use client';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        toast.success(t('contact.form.success'));
        setForm({ name: '', email: '', phone: '', message: '' });
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#0a0a0f' }}>
                {/* Header */}
                <div style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1025 100%)', padding: '4rem 0 3rem', borderBottom: '1px solid rgba(201,162,39,0.1)' }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="section-badge">{t('contact.badge')}</span>
                            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', margin: '1rem 0 0.75rem' }}>
                                {t('contact.title')}
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto' }}>
                                {t('contact.desc')}
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="container" style={{ padding: '4rem 1.5rem' }}>
                    <div className="contact-grid">
                        {/* Info */}
                        <motion.div initial={{ opacity: 0, x: isRtl ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>{t('contact.reachUs')}</h2>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                                {t('contact.reachUsDesc')}
                            </p>

                            {[
                                { Icon: Phone, label: t('contact.labels.phone'), value: t('footer.phone') },
                                { Icon: Mail, label: t('contact.labels.email'), value: t('footer.email') },
                                { Icon: MapPin, label: t('contact.labels.address'), value: t('footer.address') },
                                { Icon: Clock, label: t('contact.labels.hours'), value: t('contact.values.hours') },
                            ].map(({ Icon, label, value }) => (
                                <div key={label} style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem', padding: '1.5rem', background: 'rgba(18,18,26,0.6)', border: '1px solid rgba(201,162,39,0.1)', borderRadius: 18 }}>
                                    <div style={{ [isRtl ? 'marginLeft' : 'marginRight']: '1.25rem', width: 48, height: 48, borderRadius: '50%', background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Icon size={20} color="#c9a227" />
                                    </div>
                                    <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                        <div style={{ fontSize: '0.78rem', color: 'rgba(201,162,39,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.25rem' }}>{label}</div>
                                        <div style={{ fontWeight: 600, color: '#fff', fontSize: '1rem' }}>{value}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Form */}
                        <motion.div initial={{ opacity: 0, x: isRtl ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            style={{ background: 'rgba(18,18,26,0.8)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: 24, padding: '2.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">{t('auth.fullName')}</label>
                                        <input type="text" className="form-input" placeholder={t('contact.form.placeholderName')} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">{t('auth.email')}</label>
                                        <input type="email" className="form-input" placeholder={t('contact.form.placeholderEmail')} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t('booking.phone')}</label>
                                    <input type="tel" className="form-input" placeholder={t('contact.form.placeholderPhone')} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t('contact.form.message')}</label>
                                    <textarea className="form-input" placeholder={t('contact.form.placeholderMessage')} rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: 'vertical' }} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ gap: '0.75rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                                    {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : <><Send size={18} /> {t('contact.form.send')}</>}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppFAB />
            <style>{`
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.4fr;
                    gap: 4rem;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }
                    main { padding-top: 70px !important; }
                }
            `}</style>
        </>
    );
}
