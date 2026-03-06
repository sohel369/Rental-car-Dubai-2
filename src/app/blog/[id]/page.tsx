'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { blogsData } from '@/data/blogs';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BlogDetailPage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const blog = blogsData.find(b => b.id === id);

    if (!blog) return null;

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#0a0a0f' }}>
                {/* Hero Image */}
                <div style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden' }}>
                    <img
                        src={blog.image}
                        alt={blog.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, #0a0a0f 0%, rgba(10,10,15,0.4) 50%, transparent 100%)'
                    }} />
                    <div className="container" style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>{blog.category}</span>
                            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, maxWidth: 800 }}>
                                {blog.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>

                <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '4rem', alignItems: 'start' }} className="blog-content-grid">
                        {/* Main Content */}
                        <article>
                            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#c9a227', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '2.5rem', fontWeight: 600 }}>
                                <ArrowLeft size={16} /> Back to Blog
                            </Link>

                            <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                                    <User size={16} color="#c9a227" /> By {blog.author}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                                    <Calendar size={16} color="#c9a227" /> {blog.date}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                                    <Clock size={16} color="#c9a227" /> {blog.readTime}
                                </div>
                            </div>

                            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                <p style={{ marginBottom: '1.5rem' }}>{blog.content}</p>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <h3 style={{ color: '#fff', fontSize: '1.5rem', margin: '2.5rem 0 1.25rem' }}>Why Choose Golden Key for Your Journey?</h3>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-ghost btn-sm" style={{ gap: '0.5rem' }}><Share2 size={14} /> Share Article</button>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {['#luxury', '#dubai', '#travel'].map(tag => (
                                        <span key={tag} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside style={{ position: 'sticky', top: 100 }}>
                            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>Search Journal</h3>
                                <div className="form-group">
                                    <input type="text" className="form-input" placeholder="Search articles..." />
                                </div>
                            </div>

                            <div className="card" style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>Latest Posts</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {blogsData.filter(b => b.id !== id).slice(0, 3).map(post => (
                                        <Link key={post.id} href={`/blog/${post.id}`} style={{ display: 'flex', gap: '1rem', textDecoration: 'none' }}>
                                            <img src={post.image} alt={post.title} style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }} />
                                            <div>
                                                <h4 style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600, lineHeight: 1.4, marginBottom: '0.2rem' }}>{post.title}</h4>
                                                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{post.date}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppFAB />
            <style>{`
                @media (max-width: 900px) {
                    .blog-content-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
                    aside { position: static !important; }
                }
            `}</style>
        </>
    );
}
