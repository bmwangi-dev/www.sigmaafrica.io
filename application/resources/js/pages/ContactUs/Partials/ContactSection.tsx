import React from 'react';
import { useForm } from '@inertiajs/react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import PrimaryButton from '@/components/Typography/PrimaryButton';
import { Phone, Mail, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import FormSuccess from '@/components/ui/FormSuccess';
import { toast } from 'react-toastify';

const ContactSection = () => {
    const [submitted, setSubmitted] = React.useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
                setSubmitted(true);
                toast.success('Message sent successfully!');
            },
        });
    };

    return (
        <section className="py-16 px-4 ">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column - Contact Info */}
                    <div>
                        <Heading level={2} size="4xl" weight="bold" className="mb-6">
                            Get In Touch With <br />
                            <span className="text-[var(--color-migenta)]">Sigma Africa</span>
                        </Heading>

                        <Text as="p" size="base" weight="normal" className="mb-10 leading-relaxed">
                            We're here to connect, collaborate, and support you on your data journey.
                            Whether you have inquiries about our events, training programs, partnerships, or
                            community initiatives, we'd love to hear from you!
                        </Text>

                        <div className="space-y-8">
                            {/* Phone */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-migenta)] flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <Text as="p" size="sm" weight="bold" className="uppercase tracking-wider mb-1">Our Phone</Text>
                                    <Text as="p" size="lg" weight="bold">+254(7) 33 910 922</Text>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-migenta)] flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <Text as="p" size="sm" weight="bold" className="uppercase tracking-wider mb-1">Email</Text>
                                    <Text as="p" size="lg" weight="bold">sigmanalytics09@gmail.com</Text>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-12">
                            <Heading level={4} size="xl" weight="bold" className="mb-4">Social Media</Heading>
                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/company/sigma_africa/" target='_blank' rel="noopener noreferrer" className="w-10 h-10 rounded bg-[var(--color-migenta)] flex items-center justify-center">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="https://x.com/sigma_africa" target='_blank' rel="noopener noreferrer" className="w-10 h-10 rounded bg-[var(--color-migenta)] flex items-center justify-center">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" target='_blank' rel="noopener noreferrer" className="w-10 h-10 rounded bg-[var(--color-migenta)] flex items-center justify-center">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="https://www.instagram.com/sigmaaccelerate/" target='_blank' rel="noopener noreferrer" className="w-10 h-10 rounded bg-[var(--color-migenta)] flex items-center justify-center">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 min-h-[500px] flex flex-col justify-center">
                        {submitted ? (
                            <FormSuccess
                                title="Message Received!"
                                message="Thank you for reaching out to Sigma Africa. We have received your details and will get back to you shortly."
                                steps={[
                                    "Our team will review your inquiry.",
                                    "We'll reach out via email or phone to discuss further.",
                                    "We'll explore how we can best support your data goals."
                                ]}
                            />
                        ) : (
                            <>
                                <Heading level={3} size="3xl" weight="bold" className="mb-8">Fill Up The Form</Heading>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Name"
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none focus:bg-white transition-all"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                            />
                                            {errors.name && <Text size="xs" className="text-red-500 mt-1">{errors.name}</Text>}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none focus:bg-white transition-all"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                            />
                                            {errors.email && <Text size="xs" className="text-red-500 mt-1">{errors.email}</Text>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Phone Number */}
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-bold mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                placeholder="Your Number"
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none focus:bg-white transition-all"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                            />
                                            {errors.phone && <Text size="xs" className="text-red-500 mt-1">{errors.phone}</Text>}
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-bold mb-2">Subject</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                placeholder="Your Subject"
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none focus:bg-white transition-all"
                                                value={data.subject}
                                                onChange={e => setData('subject', e.target.value)}
                                            />
                                            {errors.subject && <Text size="xs" className="text-red-500 mt-1">{errors.subject}</Text>}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-bold mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            placeholder="Message"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-gray-50 text-gray-900 border-none ring-2 ring-[var(--color-migenta)] outline-none focus:bg-white transition-all resize-none"
                                            value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                        ></textarea>
                                        {errors.message && <Text size="xs" className="text-red-500 mt-1">{errors.message}</Text>}
                                    </div>

                                    {/* Submit Button */}
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[var(--color-migenta)] text-white font-bold py-4 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                                    >
                                        {processing ? 'Submitting...' : 'Submit Now'}
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

export default ContactSection;
