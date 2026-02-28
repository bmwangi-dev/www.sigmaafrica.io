import React, { useState, FormEvent } from 'react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import PrimaryButton from '@/components/Typography/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import FormSuccess from '@/components/ui/FormSuccess';
import sigmaLogo from '../../../../../public/sigmaicon.webp';

interface ServiceContactFormProps {
    imageSrc?: string;
}

const ServiceContactForm: React.FC<ServiceContactFormProps> = ({ imageSrc }) => {
    const [submitted, setSubmitted] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
    });

    const services = [
        "Website Development",
        "Web App Development",
        "Data Science",
        "Digital Marketing",
        "Academic & Market Research",
        "Data-Centric Business Consultancy"
    ];

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/services/consultation', {
            onSuccess: () => {
                reset();
                setSubmitted(true);
                toast.success('Consultation request submitted successfully!');
            },
        });
    };

    const statistics = [
        { value: '5+', label: 'Successful Projects' },
        { value: '10+', label: 'Consulted Businesses' },
        { value: '100%', label: 'Project Delivery Rate' },
    ];

    return (
        <section id="consult" className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-8 -left-8 bg-[var(--color-primary-note)] rounded-full w-24 h-24 flex items-center justify-center shadow-lg z-10">
                            <div className="text-center">
                                <img loading="lazy" src={sigmaLogo} alt="Sigma Logo" className="w-16 h-16 object-contain" />
                            </div>
                        </div>

                        <div className="rounded-lg overflow-hidden shadow-2xl mb-8">
                            <img loading="lazy"
                                src={imageSrc || '/images/services_team.webp'}
                                alt="Service Consultancy"
                                className="w-full h-96 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {statistics.map((stat, index) => (
                                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-lg border-b-4 border-[var(--color-migenta)]">
                                    <div className="text-2xl font-bold text-[var(--color-sigma-blue)]">{stat.value}</div>
                                    <div className="text-xs text-gray-600 font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 min-h-[500px] flex flex-col justify-center">
                        {submitted ? (
                            <FormSuccess
                                title="Consultation Requested!"
                                message="Thank you for your interest in our services. Our experts will review your request and get back to you shortly."
                                steps={[
                                    "A specialist will review your requirements.",
                                    "We'll schedule a call to discuss your goals.",
                                    "You'll receive a custom proposal and roadmap."
                                ]}
                            />
                        ) : (
                            <>
                                <div className="mb-8">
                                    <Heading level={3} size="4xl" weight="bold" className="mb-4 text-[var(--color-sigma-blue)]">
                                        Consult With Our Experts
                                    </Heading>
                                    <div className="h-1.5 w-20 bg-[var(--color-migenta)] rounded-full"></div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Your Name"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-[var(--color-migenta)] focus:bg-white outline-none transition-all"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Phone</label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Phone Number"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-[var(--color-migenta)] focus:bg-white outline-none transition-all"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="Your Email"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-[var(--color-migenta)] focus:bg-white outline-none transition-all"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Service Required</label>
                                        <select
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-[var(--color-migenta)] focus:bg-white outline-none transition-all"
                                            value={data.service}
                                            onChange={e => setData('service', e.target.value)}
                                        >
                                            <option value="" disabled>Select a service</option>
                                            {services.map((service, index) => (
                                                <option key={index} value={service}>{service}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Tell us more</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Tell us about your project or inquiry..."
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-[var(--color-migenta)] focus:bg-white outline-none transition-all resize-none"
                                            value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                        ></textarea>
                                    </div>

                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[var(--color-migenta)] text-white font-bold py-4 rounded-xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        {processing ? 'Submitting...' : 'Request Consultation'}
                                    </PrimaryButton>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceContactForm;
