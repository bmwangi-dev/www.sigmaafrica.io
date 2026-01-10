import React from 'react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import PrimaryButton from '@/components/Typography/PrimaryButton';
import { Link } from '@inertiajs/react';

interface WhyChooseUsProps {
    imageSrc?: string;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ imageSrc }) => {
    return (
        <section className="py-16 px-4 relative overflow-hidden">
            {/* Decorative curved lines similar to AfricaHackon design */}
            <div className="absolute left-0 top-0 bottom-0 w-32 opacity-20">
                <svg viewBox="0 0 100 800" className="h-full">
                    <path
                        d="M 0 0 Q 50 200 0 400 T 0 800"
                        stroke="var(--color-migenta)"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>
            </div>

            <div className="container mx-auto relative z-10">
                {/* Quote banner */}
                <div className="bg-[var(--color-migenta)] text-white py-4 px-8 rounded-lg mb-12 text-center max-w-2xl mx-auto">
                    <Text as="p" size="xl" weight="semibold">
                        "Data Science Isn't A Skill, It's A Superpower!"
                    </Text>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <div className="relative">
                        <div className="overflow-hidden rounded-lg shadow-2xl">
                            <img
                                src={imageSrc || '/placeholder-student.jpg'}
                                alt="Student learning"
                                className="w-full h-[400px] object-cover"
                                onError={(e) => {
                                    // Fallback if image doesn't exist
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="">
                        <Heading level={2} size="4xl" weight="bold" className="mb-6">
                            Why Choose Us?
                        </Heading>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <span className="text-[var(--color-migenta)] font-bold text-lg">•</span>
                                <div>
                                    <Text as="strong" size="lg" weight="semibold" className="block mb-1">
                                        Expert-Led Training:
                                    </Text>
                                    <Text as="p" size="base" weight="normal" className="">
                                        Learn from seasoned professionals shaping the future of data science.
                                    </Text>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-[var(--color-migenta)] font-bold text-lg">•</span>
                                <div>
                                    <Text as="strong" size="lg" weight="semibold" className="block mb-1">
                                        Real-World Skills:
                                    </Text>
                                    <Text as="p" size="base" weight="normal" className="">
                                        Gain hands-on experience with tools and techniques used by top players in the industry.
                                    </Text>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-[var(--color-migenta)] font-bold text-lg">•</span>
                                <div>
                                    <Text as="strong" size="lg" weight="semibold" className="block mb-1">
                                        Career-Boosting Mentorship:
                                    </Text>
                                    <Text as="p" size="base" weight="normal" className="">
                                        Get personal guidance from the best of the best.
                                    </Text>
                                </div>
                            </div>
                        </div>

                        <Link href="/contact">
                            <PrimaryButton className="bg-[var(--color-migenta)] text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all">
                                Join Cohort 5
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
