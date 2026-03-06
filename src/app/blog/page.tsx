'use client';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { blogsData } from '@/data/blogs';
import Link from 'next/link';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BlogPage() {
    const { t } = useTranslation();

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#0a0a0f' }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1025 100%)',
                    padding: '5rem 0 4rem', borderBottom: '1px solid rgba(201,162,39,0.1)',
                }}>
                    <div className="container">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
                            <span className="section-badge">{t('blog.badge')}</span>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '1.25rem 0 1rem' }}>
                                {t('blog.title')}
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
                                {t('blog.desc')}
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="container" style={{ padding: '4rem 1.5rem' }}>
                    <div className="grid-2" style={{ gap: '2.5rem' }}>
                        {blogsData.map((blog, i) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="card"
                                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                                        <span className="badge badge-gold">{blog.category}</span>
                                    </div>
                                </div>

                                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                                            <Calendar size={14} color="#c9a227" /> {blog.date}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                                            <Clock size={14} color="#c9a227" /> {blog.readTime}
                                        </div>
                                    </div>

                                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', lineHeight: 1.4 }}>
                                        {blog.title}
                                    </h2>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                        {blog.excerpt}
                                    </p>

                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <User size={16} color="#c9a227" />
                                            </div>
                                            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{blog.author}</span>
                                        </div>
                                        <Link href={`/blog/${blog.id}`} className="btn btn-ghost btn-sm" style={{ gap: '0.4rem' }}>
                                            {t('blog.readMore')} <ChevronRight size={14} style={{ transform: t('dir') === 'rtl' ? 'rotate(180deg)' : 'none' }} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppFAB />
        </>
    );
}
