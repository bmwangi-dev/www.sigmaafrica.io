import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import { Phone, Mail, Linkedin, Twitter, Facebook, Instagram, ChevronDown, CheckCircle2 } from 'lucide-react';
import ApplicationSuccess from './ApplicationSuccess';

const ApplicationSection = () => {
    const [submitted, setSubmitted] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        organization: '',
        role_usage: '',
        schedule_commitment: '',
        tools_interest: [] as string[],
        discovery_source: '',
        recommendation_likelihood: '',
        additional_comments: '',
    });

    const handleCheckboxChange = (value: string) => {
        let newInterests = [...data.tools_interest];
        if (newInterests.includes(value)) {
            newInterests = newInterests.filter(item => item !== value);
        } else {
            newInterests.push(value);
        }
        setData('tools_interest', newInterests);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/skill-sparks/apply', {
            onSuccess: () => {
                reset();
                setSubmitted(true);
            },
        });
    };

    const inputStyle = "w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 border-[var(--color-migenta)] border-2 ring-0 outline-none focus:bg-white transition-all duration-200";

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column - Program Highlights (Sticky) */}
                    <div className="lg:sticky lg:top-10 space-y-8">
                        <div className="space-y-4">
                            <div className="inline-block px-4 py-1 rounded-full bg-[var(--color-migenta)] text-white font-bold text-sm tracking-widest uppercase">
                                Enrollment Open • Oct 2026
                            </div>
                            <Heading level={2} size="5xl" weight="bold" className="text-gray-900 leading-tight">
                                Sigma <span className="text-[var(--color-migenta)]">SkillSpark 3.1</span>
                            </Heading>
                            <Text as="p" size="xl" className="text-gray-600 max-w-xl">
                                A definitive 9-week workshop designed to transform your career trajectory through data science.
                            </Text>
                        </div>

                        {/* Curriculum Preview Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Advanced Excel", time: "2 Weeks" },
                                { title: "SQL Mastery", time: "1 Week" },
                                { title: "PowerBI Viz", time: "2 Weeks" },
                                { title: "Python Pro", time: "4 Weeks" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[var(--color-migenta)]">
                                    <CheckCircle2 className="text-[var(--color-migenta)] w-5 h-5 shrink-0" />
                                    <div>
                                        <Text weight="bold" className="text-gray-800 text-sm">{item.title}</Text>
                                        <Text size="xs" className="text-gray-500">{item.time}</Text>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Investment Card */}
                        <div className="p-8 rounded-3xl bg-[var(--color-sigma-blue)] text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <Text size="sm" weight="bold" className="uppercase tracking-widest text-[var(--color-migenta)] mb-2">Investment</Text>
                                <div className="flex flex-col mb-6">
                                    <span className="text-gray-400 text-sm font-medium line-through">KES 15,000</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-white">KES 9,990</span>
                                        <span className="text-gray-400 text-sm">/ Full Program</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                        <span className="text-gray-400">Orientation</span>
                                        <span className="font-bold">October 5, 2026</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                        <span className="text-gray-400">Mpesa Till</span>
                                        <span className="font-bold text-[var(--color-migenta)]">4130060</span>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative background element */}
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[var(--color-migenta)] opacity-20 rounded-full blur-3xl"></div>
                        </div>
                    </div>

                    {/* Right Column - Application Form */}
                    <div className="bg-white rounded-3xl p-1 md:p-8 lg:p-10 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">

                        {submitted ? (
                            <ApplicationSuccess />
                        ) : (
                            <>
                                <div className="mb-10">
                                    <Heading level={3} size="2xl" weight="bold" className="text-gray-900 mb-2">Apply Now</Heading>
                                    <div className="h-1.5 w-20 bg-[var(--color-migenta)] rounded-full"></div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Personal Information Group */}
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Full Name *</label>
                                                <input type="text" required placeholder="John Doe" className={inputStyle}
                                                    value={data.name} onChange={e => setData('name', e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Email *</label>
                                                <input type="email" required placeholder="john@example.com" className={inputStyle}
                                                    value={data.email} onChange={e => setData('email', e.target.value)} />
                                                {errors.email && (
                                                    <Text as="p" size="xs" className="text-red-500 mt-1 ml-1">{errors.email}</Text>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Phone Number *</label>
                                                <input type="tel" required placeholder="+254..." className={inputStyle}
                                                    value={data.phone} onChange={e => setData('phone', e.target.value)} />
                                                {errors.phone && (
                                                    <Text as="p" size="xs" className="text-red-500 mt-1 ml-1">{errors.phone}</Text>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Organization</label>
                                                <input type="text" placeholder="Company/School" className={inputStyle}
                                                    value={data.organization} onChange={e => setData('organization', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1 leading-snug block">
                                            What does your work involve? How will you use these skills?
                                        </label>
                                        <textarea rows={3} placeholder="Tell us a bit about your professional goals..." className={`${inputStyle} resize-none`}
                                            value={data.role_usage} onChange={e => setData('role_usage', e.target.value)} />
                                    </div>

                                    {/* Commitment & Source Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Daily Commitment?</label>
                                            <div className="flex gap-3">
                                                {['Yes', 'No', 'Maybe'].map((opt) => (
                                                    <button key={opt} type="button"
                                                        onClick={() => setData('schedule_commitment', opt)}
                                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 
                                                        ${data.schedule_commitment === opt
                                                                ? 'bg-[var(--color-migenta)] text-white border-[var(--color-migenta)] shadow-md'
                                                                : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2 relative">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Discovery Source</label>
                                            <select className={`${inputStyle} appearance-none pr-10`}
                                                value={data.discovery_source} onChange={e => setData('discovery_source', e.target.value)}>
                                                <option value="" disabled>Select option</option>
                                                {['LinkedIn', 'X', 'Website', 'Referral', 'Other'].map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-3 bottom-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Tools Selection - Compact Grid */}
                                    <div className="space-y-3 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                                        <label className="text-sm font-bold text-gray-700">Tools of Interest</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Excel', 'SQL', 'PowerBi', 'Python'].map((tool) => (
                                                <label key={tool} className="flex items-center gap-3 cursor-pointer group">
                                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                                                        ${data.tools_interest.includes(tool) ? 'bg-[var(--color-migenta)] border-[var(--color-migenta)]' : 'bg-white border-gray-300'}`}>
                                                        {data.tools_interest.includes(tool) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                                    </div>
                                                    <input type="checkbox" className="hidden" checked={data.tools_interest.includes(tool)}
                                                        onChange={() => handleCheckboxChange(tool)} />
                                                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{tool}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <button type="submit" disabled={processing}
                                        className="w-full bg-[var(--color-migenta)] text-white font-bold py-5 rounded-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                        {processing ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApplicationSection;