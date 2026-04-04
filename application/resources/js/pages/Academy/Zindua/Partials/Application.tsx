import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
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
        // Using the same endpoint but maybe the backend handles it or I should add a field
        post('/skill-sparks/apply', {
            onSuccess: () => {
                reset();
                setSubmitted(true);
            },
        });
    };

    const inputStyle = "w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 border-[var(--color-primary)] border-2 ring-0 outline-none focus:bg-white transition-all duration-200";

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column - Program Highlights */}
                    <div className="lg:sticky lg:top-10 space-y-8">
                        <div className="space-y-4">
                            <div className="inline-block px-4 py-1 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm tracking-widest uppercase">
                                Enrollment Open
                            </div>
                            <Heading level={2} size="5xl" weight="bold" className="text-gray-900 leading-tight">
                                Sigma <span className="text-[var(--color-primary)]">Zindua</span>
                            </Heading>
                            <Text as="p" size="xl" className="text-gray-600 max-w-xl">
                                Become a world-class software engineer. Master full-stack development through hands-on projects and expert mentorship.
                            </Text>
                        </div>

                        {/* Curriculum Preview Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Frontend Mastery", time: "React / Next.js" },
                                { title: "Backend Systems", time: "Node.js / Laravel" },
                                { title: "Database Architecture", time: "SQL / NoSQL" },
                                { title: "DevOps & Cloud", time: "Deployment" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[var(--color-primary)]">
                                    <CheckCircle2 className="text-[var(--color-primary)] w-5 h-5 shrink-0" />
                                    <div>
                                        <Text weight="bold" className="text-gray-800 text-sm">{item.title}</Text>
                                        <Text size="xs" className="text-gray-500">{item.time}</Text>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Info Card */}
                        <div className="p-8 rounded-3xl bg-[var(--color-sigma-blue)] text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <Text size="sm" weight="bold" className="uppercase tracking-widest text-[var(--color-primary)] mb-2">Program Details</Text>
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-white">Project-Based Learning</span>
                                    </div>
                                    <Text size="sm" className="text-gray-300">
                                        Build real-world applications and gain the experience needed to launch your career.
                                    </Text>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                        <span className="text-gray-400">Duration</span>
                                        <span className="font-bold">12 Weeks</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                        <span className="text-gray-400">Format</span>
                                        <span className="font-bold">Hybrid / Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[var(--color-primary)] opacity-20 rounded-full blur-3xl"></div>
                        </div>
                    </div>

                    {/* Right Column - Application Form */}
                    <div className="bg-white rounded-3xl p-1 md:p-8 lg:p-10 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">

                        {submitted ? (
                            <ApplicationSuccess />
                        ) : (
                            <>
                                <div className="mb-10">
                                    <Heading level={3} size="2xl" weight="bold" className="text-gray-900 mb-2">Join Zindua</Heading>
                                    <div className="h-1.5 w-20 bg-[var(--color-primary)] rounded-full"></div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
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
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Phone Number *</label>
                                                <input type="tel" required placeholder="+254..." className={inputStyle}
                                                    value={data.phone} onChange={e => setData('phone', e.target.value)} />
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
                                            Why do you want to learn software development?
                                        </label>
                                        <textarea rows={3} placeholder="Tell us about your goals..." className={`${inputStyle} resize-none`}
                                            value={data.role_usage} onChange={e => setData('role_usage', e.target.value)} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Daily Commitment?</label>
                                            <div className="flex gap-3">
                                                {['Yes', 'No', 'Maybe'].map((opt) => (
                                                    <button key={opt} type="button"
                                                        onClick={() => setData('schedule_commitment', opt)}
                                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 
                                                        ${data.schedule_commitment === opt
                                                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
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

                                    <div className="space-y-3 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                                        <label className="text-sm font-bold text-gray-700">Areas of Interest</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Frontend', 'Backend', 'Fullstack', 'Mobile'].map((tool) => (
                                                <label key={tool} className="flex items-center gap-3 cursor-pointer group">
                                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                                                        ${data.tools_interest.includes(tool) ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'bg-white border-gray-300'}`}>
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
                                        className="w-full bg-[var(--color-primary)] text-white font-bold py-5 rounded-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                        {processing ? 'Submitting...' : 'Apply Now'}
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
