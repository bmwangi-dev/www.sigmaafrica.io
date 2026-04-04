import React from 'react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const ApplicationSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center h-full min-h-[500px] animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-[var(--color-migenta)]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-[var(--color-migenta)]" />
            </div>

            <Heading level={2} size="3xl" weight="bold" className="text-[var(--color-sigma-blue)] mb-4">
                Application Received!
            </Heading>

            <Text as="p" size="lg" className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Thank you for applying to the Sigma SkillSpark 3.0 program. We have received your details.
            </Text>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 max-w-md w-full mb-8 text-left">
                <Heading level={4} size="sm" weight="bold" className="text-gray-900 mb-3 uppercase tracking-wider">
                    What Happens Next?
                </Heading>
                <div className="space-y-3">
                    <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-sigma-blue)] text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                        <Text size="sm" className="text-gray-600">
                            Our admissions team will review your application.
                        </Text>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-sigma-blue)] text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
                        <Text size="sm" className="text-gray-600">
                            You will receive an email with payment details and the orientation schedule.
                        </Text>
                    </div>
                </div>
            </div>

            <a href="/" className="inline-flex items-center gap-2 text-[var(--color-migenta)] font-bold hover:gap-3 transition-all">
                Back to Home <ArrowRight className="w-4 h-4" />
            </a>
        </div>
    );
};

export default ApplicationSuccess;
