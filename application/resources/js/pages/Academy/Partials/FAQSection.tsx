import React, { useState } from 'react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import { ChevronDown, MessageCircle, HelpCircle, GraduationCap, Users } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-100 last:border-none">
            <button
                onClick={onClick}
                className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
            >
                <Heading
                    level={4}
                    size="lg"
                    weight="bold"
                    className={`transition-colors duration-300 ${isOpen ? 'text-[var(--color-migenta)]' : 'text-gray-800 group-hover:text-[var(--color-migenta)]'}`}
                >
                    {question}
                </Heading>
                <div className={`p-2 rounded-lg transition-all duration-300 ${isOpen ? 'bg-[var(--color-migenta)] text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <Text as="p" size="base" weight="normal" className="text-gray-600 leading-relaxed pr-8">
                    {answer}
                </Text>
            </div>
        </div>
    );
};

interface FAQSectionProps {
    imageSrc?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ imageSrc }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "Who is this program suitable for?",
            answer: "Our programs are designed for ambitious individuals at various stages—from students looking to break into data science to professionals seeking to level up their analytical skills. No prior coding experience is required for our introductory tracks."
        },
        {
            question: "What tools and technologies will I learn?",
            answer: "Depending on your track, you will master industry-standard tools including Advanced Excel, SQL, Power BI, Python, and cloud-based data warehouses. Our focus is on practical, job-ready skills."
        },
        {
            question: "Is there mentorship provided during the course?",
            answer: "Yes! Every student is assigned to a cohort with dedicated mentorship. You'll have access to weekly office hours, project reviews, and career coaching to ensure you clinical success."
        },
        {
            question: "Does Sigma Africa provide job placement support?",
            answer: "While we don't guarantee placement, we provide comprehensive career support including portfolio building, resume reviews, and LinkedIn optimization. Our alumni have successfully secured roles at leading tech companies and startups."
        },
        {
            question: "How are the classes delivered?",
            answer: "We offer a flexible hybrid model. Most of our workshops are conducted online through interactive live sessions, supplemented by physical meetups and networking events in Nairobi."
        }
    ];

    const statistics = [
        { icon: <GraduationCap className="w-6 h-6" />, value: '300+', label: 'Total Alumni' },
        { icon: <Users className="w-6 h-6" />, value: '10+', label: 'Mentors' },
        { icon: <MessageCircle className="w-6 h-6" />, value: '24/7', label: 'Support' },
    ];

    return (
        <section className="mt-4 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column - Context & Stats */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-2">
                            <HelpCircle className="w-5 h-5 text-[var(--color-migenta)]" />
                            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Common Questions</span>
                        </div>

                        <div>
                            <Heading level={2} size="5xl" weight="bold" className="text-[var(--color-sigma-blue)] leading-tight mb-4">
                                Frequently Asked <br />
                                <span className="text-[var(--color-migenta)]">Questions</span>
                            </Heading>
                            <Text as="p" size="xl" className="text-gray-600 max-w-lg">
                                Everything you need to know about our data science programs, curriculum, and community.
                            </Text>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {statistics.map((stat, index) => (
                                <div key={index} className="p-6 rounded-2xl bg-white shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--color-migenta)]/10 flex items-center justify-center text-[var(--color-migenta)] mb-4">
                                        {stat.icon}
                                    </div>
                                    <Heading level={3} size="2xl" weight="bold" className="text-[var(--color-sigma-blue)] mb-1">
                                        {stat.value}
                                    </Heading>
                                    <Text size="sm" weight="medium" className="text-gray-600">
                                        {stat.label}
                                    </Text>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 p-6 rounded-2xl bg-[var(--color-primary)] text-white flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <Heading level={4} size="lg" weight="bold">Still have questions?</Heading>
                                <Text size="sm" className="opacity-80">Can't find the answer you're looking for?</Text>
                            </div>
                            <a
                                href="/contact"
                                className="px-6 py-3 bg-[var(--color-migenta)] text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-black/10 text-center"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Accordion */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-gray-200/30 border border-gray-50">
                        <div className="space-y-2">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQSection;
