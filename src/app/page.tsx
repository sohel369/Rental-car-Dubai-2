'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CarCard from '@/components/CarCard';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { carsData } from '@/data/cars';
import { Star, Award, Shield, Clock, ChevronRight, CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const categories = ['all', 'economy', 'luxury', 'suv', 'sports'] as const;

export default function HomePage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('all');

  const filteredCars = activeCategory === 'all'
    ? carsData.slice(0, 6)
    : carsData.filter(c => c.category === activeCategory);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* Why Choose Us */}
        <section className="section" style={{ background: 'var(--gradient-dark)' }}>
          <div className="container">
            <motion.div className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-badge"><Award size={14} /> {t('home.whyBadge')}</span>
              <h2 className="section-title">{t('home.whyTitle')}</h2>
              <div className="divider-gold"></div>
              <p className="section-subtitle">{t('home.whySubtitle')}</p>
            </motion.div>

            <div className="grid-4">
              {[
                { Icon: Shield, title: t('home.features.f1.title'), desc: t('home.features.f1.desc') },
                { Icon: Clock, title: t('home.features.f2.title'), desc: t('home.features.f2.desc') },
                { Icon: Star, title: t('home.features.f3.title'), desc: t('home.features.f3.desc') },
                { Icon: Zap, title: t('home.features.f4.title'), desc: t('home.features.f4.desc', { defaultValue: 'Instant Booking' }) },
              ].map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="card"
                  style={{ padding: '2.5rem 2rem', textAlign: 'center' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <div style={{
                    width: 72, height: 72, borderRadius: '24px', margin: '0 auto 1.5rem',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.02))',
                    border: '1px solid rgba(212,175,55,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: 'rotate(45deg)',
                    boxShadow: 'var(--shadow-gold)'
                  }}>
                    <div style={{ transform: 'rotate(-45deg)' }}>
                      <Icon size={32} color="var(--gold-primary)" />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet Section */}
        <section className="section" style={{ background: 'var(--bg-pure)' }}>
          <div className="container">
            <motion.div className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-badge">{t('home.fleetBadge')}</span>
              <h2 className="section-title">{t('home.fleetTitle')}</h2>
              <div className="divider-gold"></div>
              <p className="section-subtitle">{t('home.fleetSubtitle')}</p>
            </motion.div>

            {/* Category filters */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ minWidth: 100, borderRadius: '99px' }}
                >
                  {cat === 'all' ? t('cars.filters.all') : t(`cars.filters.${cat}`)}
                </button>
              ))}
            </div>

            <div className="grid-3">
              {filteredCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <Link href="/cars" className="btn btn-outline btn-lg" style={{ gap: '0.5rem', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                {t('home.viewFullFleet')} <ChevronRight size={18} style={{ transform: t('dir') === 'rtl' ? 'rotate(180deg)' : 'none' }} />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section" style={{ background: 'var(--bg-carbon)', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle glow behind testimonials */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '60vw', height: '60vh', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%)',
            pointerEvents: 'none', zIndex: 0
          }} />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-badge"><Star size={14} fill="currentColor" /> {t('home.reviewsBadge')}</span>
              <h2 className="section-title">{t('home.reviewsTitle')}</h2>
              <div className="divider-gold"></div>
            </motion.div>

            <div className="grid-3">
              {[
                { name: 'Ahmed Al-Rashidi', location: 'Dubai, UAE', rating: 5, text: 'Absolutely world class service! The Lamborghini Urus was in perfect condition and the booking process was seamless. Will definitely rent again!' },
                { name: 'Sarah Johnson', location: 'London, UK', rating: 5, text: 'Best car rental experience in Dubai. Professional staff, immaculate cars, and the WhatsApp support was instant. Highly recommended!' },
                { name: 'Mohammed Hassan', location: 'Riyadh, KSA', rating: 5, text: 'الخدمة ممتازة والسيارات فاخرة. فريق العمل محترف ومتجاوب. سأتعامل معهم دائماً في زيارتي لدبي.' },
              ].map((r, i) => (
                <motion.div key={r.name} className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <div style={{ display: 'flex', gap: 4, marginBottom: '1.5rem' }}>
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="var(--gold-primary)" color="var(--gold-primary)" />)}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic' }}>
                    "{r.text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: '50%',
                      background: 'var(--gradient-gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.2rem', fontWeight: 800, color: '#000',
                    }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-pure)' }}>{r.name}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{r.location}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{
          padding: '8rem 0',
          background: 'var(--bg-elevated)',
          position: 'relative', overflow: 'hidden',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold-primary), transparent)',
            opacity: 0.3
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: '800px', height: '800px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                {t('home.ctaTitlePrefix')}<span className="text-gold"> {t('home.ctaTitleGold')}</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: 600, margin: '0 auto 3rem', lineHeight: 1.7 }}>
                {t('home.ctaSubtitle')}
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/cars" className="btn btn-primary btn-lg">{t('home.browseFleet')}</Link>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971500000000'}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost btn-lg" style={{ color: '#25d366', borderColor: 'rgba(37,211,102,0.3)' }}>
                  {t('home.whatsappUs')}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

