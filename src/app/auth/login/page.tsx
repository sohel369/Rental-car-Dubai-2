'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Car, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
    const { t, i18n } = useTranslation();
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signIn, signInWithGoogle } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            await signIn(data.email, data.password);
            toast.success(t('auth.signedInWelcome'));
            router.push('/dashboard');
        } catch (err: any) {
            toast.error(err.message || t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            toast.success(t('auth.googleSignInSuccess'));
            router.push('/dashboard');
        } catch (err: any) {
            toast.error(err.message || t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1025 50%, #0a0a0f 100%)',
            position: 'relative', overflow: 'hidden', padding: '2rem',
        }}>
            {/* Background effects */}
            <div style={{
                position: 'absolute', top: '20%', left: '10%', width: 400, height: 400,
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', bottom: '15%', right: '10%', width: 300, height: 300,
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,80,200,0.06) 0%, transparent 70%)', pointerEvents: 'none'
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    width: '100%', maxWidth: 460,
                    background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(201,162,39,0.2)', borderRadius: 24,
                    padding: '2.5rem',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                }}
            >
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center' }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #c9a227, #e8c84d)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(201,162,39,0.4)',
                        }}>
                            <Car size={22} color="#000" />
                        </div>
                    </Link>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginTop: '1rem', marginBottom: '0.3rem' }}>
                        {t('auth.welcomeBack')}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>
                        {t('auth.signInToAccount')}
                    </p>
                </div>

                {/* Google Sign In */}
                <button onClick={handleGoogle} disabled={loading}
                    style={{
                        width: '100%', padding: '0.8rem', borderRadius: 12, marginBottom: '1.5rem',
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                        color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '0.75rem', fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {t('auth.google')}
                </button>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>or continue with email</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input {...register('email')} type="email" className="form-input" placeholder="you@example.com" style={{ paddingLeft: '2.5rem' }} />
                        </div>
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input {...register('password')} type={showPass ? 'text' : 'password'} className="form-input" placeholder="••••••••" style={{ paddingLeft: '2.5rem', paddingRight: '3rem' }} />
                            <button type="button" onClick={() => setShowPass(!showPass)} style={{
                                position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                                background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)',
                            }}>
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.password && <p className="form-error">{errors.password.message}</p>}
                    </div>

                    <div style={{ textAlign: i18n.language?.startsWith('ar') ? 'left' : 'right' }}>
                        <Link href="/auth/forgot-password" style={{ color: '#c9a227', fontSize: '0.83rem', textDecoration: 'none' }}>
                            {t('auth.forgotPassword')}
                        </Link>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={loading}
                        style={{ padding: '0.9rem', marginTop: '0.25rem', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                        {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : (
                            <><span style={{ marginInlineEnd: '0.5rem' }}>{t('auth.signIn')}</span><ArrowRight size={16} style={{ transform: i18n.language?.startsWith('ar') ? 'rotate(180deg)' : 'none' }} /></>
                        )}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.86rem' }}>
                    {t('auth.dontHaveAccount')}{' '}
                    <Link href="/auth/register" style={{ color: '#c9a227', fontWeight: 600, textDecoration: 'none' }}>
                        {t('auth.createOne')}
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
