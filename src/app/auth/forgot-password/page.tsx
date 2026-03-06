'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Mail, Car, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const schema = z.object({
    email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { resetPassword } = useAuth();

    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            await resetPassword(data.email);
            setSent(true);
            toast.success('Reset email sent!');
        } catch (err: any) {
            toast.error(err.message || 'Failed to send reset email');
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
            <div style={{
                position: 'absolute', top: '20%', left: '15%', width: 300, height: 300,
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)', pointerEvents: 'none'
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    width: '100%', maxWidth: 440,
                    background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(201,162,39,0.2)', borderRadius: 24,
                    padding: '2.5rem',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                }}
            >
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: '50%', margin: '0 auto 1rem',
                        background: 'linear-gradient(135deg, #c9a227, #e8c84d)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(201,162,39,0.4)',
                    }}>
                        <Car size={24} color="#000" />
                    </div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>
                        Reset Password
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem' }}>
                        {sent ? "Check your email for the reset link" : "Enter your email to receive a reset link"}
                    </p>
                </div>

                {sent ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', padding: '1rem 0' }}
                    >
                        <div style={{
                            width: 72, height: 72, borderRadius: '50%', margin: '0 auto 1.5rem',
                            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <CheckCircle size={32} color="#10b981" />
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            We've sent a password reset link to <strong style={{ color: '#c9a227' }}>{getValues('email')}</strong>.
                            Please check your inbox and follow the instructions.
                        </p>
                        <Link href="/auth/login" className="btn btn-primary w-full" style={{ justifyContent: 'center', padding: '0.9rem' }}>
                            Back to Sign In
                        </Link>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input {...register('email')} type="email" className="form-input" placeholder="you@example.com" style={{ paddingLeft: '2.5rem' }} />
                            </div>
                            {errors.email && <p className="form-error">{errors.email.message}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary w-full" disabled={loading}
                            style={{ padding: '0.9rem', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                            {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : (
                                <><Send size={16} /><span>Send Reset Link</span></>
                            )}
                        </button>
                    </form>
                )}

                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <Link href="/auth/login" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.86rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <ArrowLeft size={14} /> Back to Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
