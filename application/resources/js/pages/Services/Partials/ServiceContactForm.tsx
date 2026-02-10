import React, { useState, FormEvent } from 'react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import PrimaryButton from '@/components/Typography/PrimaryButton';
import { router } from '@inertiajs/react';
import sigmaLogo from '../../../../../public/sigmaicon.png';

interface ServiceContactFormProps {
    imageSrc?: string;
}

const ServiceContactForm: React.FC<ServiceContactFormProps> = ({ imageSrc }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);

        router.post('/contact', formData, {
            onSuccess: () => {
                setFormData({ name: '', phone: '', email: '', service: '', message: '' });
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    const statistics = [
        { value: '5+', label: 'Successful Projects' },
        { value: '10+', label: 'Consulted Businesses' },
        { value: '100%', label: 'Project Delivery Rate' },
    ];

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-8 -left-8 bg-[var(--color-primary-note)] rounded-full w-24 h-24 flex items-center justify-center shadow-lg z-10">
                            <div className="text-center">
                                <img src={sigmaLogo} alt="Sigma Logo" className="w-16 h-16 object-contain" />
                            </div>
                        </div>

                        <div className="rounded-lg overflow-hidden shadow-2xl mb-8">
                            <img
                                src={imageSrc || '/service-consultancy.webp'}
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
                                <div key={index} className="text-left">
                                    <Heading
                                        level={3}
                                        size="3xl"
                                        weight="bold"
                                        className="text-[var(--color-migenta)] mb-1"
                                    >
                                        {stat.value}
                                    </Heading>
                                    <Text as="p" size="sm" weight="normal" className="">
                                        {stat.label}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="">
                        <Heading level={2} size="4xl" weight="bold" className="mb-2">
                            Ready To Scale?
                        </Heading>
                        <Heading level={3} size="4xl" weight="bold" className="mb-4 text-[var(--color-migenta)]">
                            Consult With Our Experts
                        </Heading>
                        <Text as="p" size="base" weight="normal" className="mb-8">
                            Take the first step towards data-driven success. Reach out to discuss your project or business needs today.
                        </Text>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block mb-2">
                                        <Text as="p" size="sm" weight="semibold">
                                            Full Name
                                        </Text>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block mb-2">
                                        <Text as="p" size="sm" weight="semibold">
                                            Phone Number
                                        </Text>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2">
                                        <Text as="p" size="sm" weight="semibold">
                                            Business Email
                                        </Text>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="service" className="block mb-2">
                                        <Text as="p" size="sm" weight="semibold">
                                            Service of Interest
                                        </Text>
                                    </label>
                                    <select
                                        id="service"
                                        value={formData.service}
                                        onChange={(e) =>
                                            setFormData({ ...formData, service: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none h-[48px]"
                                        required
                                    >
                                        <option value="" disabled>Select a service</option>
                                        {services.map((service, index) => (
                                            <option key={index} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block mb-2">
                                    <Text as="p" size="sm" weight="semibold">
                                        Brief Project Description
                                    </Text>
                                </label>
                                <textarea
                                    id="message"
                                    placeholder="Tell us about your project or consultation needs..."
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none resize-none"
                                    required
                                />
                            </div>

                            <PrimaryButton
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[var(--color-migenta)] text-white px-8 py-4 rounded-md font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceContactForm;
