import React from 'react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface FormSuccessProps {
    title?: string;
    message?: string;
    steps?: string[];
}

const FormSuccess: React.FC<FormSuccessProps> = ({
    title = "Message Received!",
    message = "Thank you for reaching out to us. We have received your details and will get back to you shortly.",
    steps = [
        "Our team will review your message.",
        "A representative will contact you via email or phone."
    ]
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center h-full min-h-[400px] animate-in fade-in duration-500 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-[var(--color-migenta)]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[var(--color-migenta)]" />
            </div>

            <Heading level={2} size="3xl" weight="bold" className="text-[var(--color-sigma-blue)] mb-4">
                {title}
            </Heading>

            <Text as="p" size="lg" className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                {message}
            </Text>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 max-w-md w-full mb-8 text-left">
                <Heading level={4} size="sm" weight="bold" className="text-[var(--color-sigma-blue)] mb-3 uppercase tracking-wider">
                    What Happens Next?
                </Heading>
                <div className="space-y-3">
                    {steps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-[var(--color-sigma-blue)] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                {index + 1}
                            </div>
                            <Text size="sm" className="text-gray-600">
                                {step}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>

            <a href="/" className="inline-flex items-center gap-2 text-[var(--color-migenta)] font-bold hover:gap-3 transition-all">
                Back to Home <ArrowRight className="w-4 h-4" />
            </a>
        </div>
    );
};

export default FormSuccess;
