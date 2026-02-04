import React, { useState, FormEvent } from 'react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import PrimaryButton from '@/components/Typography/PrimaryButton';
import { router } from '@inertiajs/react';

interface ContactEnrollmentProps {
    imageSrc?: string;
}

const ContactEnrollment: React.FC<ContactEnrollmentProps> = ({ imageSrc }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Using Inertia router to submit the form
        router.post('/contact', formData, {
            onSuccess: () => {
                setFormData({ name: '', email: '', message: '' });
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    const statistics = [
        { value: '5+', label: 'Years of Experience' },
        { value: '10+', label: 'Experienced Trainers' },
        { value: '500+', label: 'Trained Professionals' },
    ];

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-8 -left-8 bg-[var(--color-primary-note)] rounded-full w-24 h-24 flex items-center justify-center shadow-lg z-10">
                            <div className="text-center">
                                <Text as="p" size="2xl" weight="bold" className="text-[var(--color-migenta)]">
                                    A+
                                </Text>
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="rounded-lg overflow-hidden shadow-2xl mb-8">
                            <img
                                src={imageSrc || '/placeholder-trainers.jpg'}
                                alt="Academy trainers"
                                className="w-full h-96 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>

                        {/* Statistics Grid */}
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

                    {/* Right side - Contact Form */}
                    <div className="">
                        <Heading level={2} size="4xl" weight="bold" className="mb-2">
                            Have Any Question?
                        </Heading>
                        <Heading level={3} size="4xl" weight="bold" className="mb-4">
                            Feel Free To Contact Us
                        </Heading>
                        <Text as="p" size="base" weight="normal" className="mb-8">
                            We're here to connect, collaborate, and support your data science journey.
                        </Text>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block mb-2">
                                        <Text as="p" size="sm" weight="semibold">
                                            Name
                                        </Text>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2">
                                        <Text as="p" size="sm" weight="semibold">
                                            Email
                                        </Text>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-md bg-white text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block mb-2">
                                    <Text as="p" size="sm" weight="semibold">
                                        Message
                                    </Text>
                                </label>
                                <textarea
                                    id="message"
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
                                {isSubmitting ? 'Submitting...' : 'Submit Now'}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactEnrollment;
