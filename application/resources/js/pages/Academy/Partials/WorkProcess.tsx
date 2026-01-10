import React from 'react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import { FileCheck, UserCheck, GraduationCap } from 'lucide-react';

interface WorkProcessProps {
    images?: string[];
}

const WorkProcess: React.FC<WorkProcessProps> = ({ images = [] }) => {
    const steps = [
        {
            number: 1,
            title: 'Apply Online',
            description: 'Fill out the quick application form on our website to get started.',
            icon: <FileCheck className="w-8 h-8 text-[var(--color-migenta)]" />,
        },
        {
            number: 2,
            title: 'Secure Your Spot',
            description: 'Complete the enrollment process and gain access to our expert-led training.',
            icon: <UserCheck className="w-8 h-8 text-[var(--color-migenta)]" />,
        },
        {
            number: 3,
            title: 'Start Learning',
            description: 'Dive into hands-on data science training, mentorship, and real-world challenges!',
            icon: <GraduationCap className="w-8 h-8 text-[var(--color-migenta)]" />,
        },
    ];

    return (
        <section className="py-16 px-4 relative overflow-hidden">
            {/* Decorative curved lines */}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Process Steps */}
                    <div className="">
                        <Heading level={2} size="4xl" weight="bold" className="mb-4">
                            Our Work Process
                        </Heading>
                        <Text as="p" size="base" weight="normal" className="mb-8">
                            Joining Sigma Africa Academy is quick and easy! Follow these three simple steps to gain hands-on skills and expert mentorship.
                        </Text>

                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <div key={index} className="relative flex gap-4">
                                    {/* Vertical Line */}
                                    {index < steps.length - 1 && (
                                        <div className="absolute left-4 top-12 bottom-0 w-0.5 border-l-2 border-dashed border-gray-600"></div>
                                    )}

                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center relative z-10">
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <Heading level={3} size="xl" weight="bold" className="mb-2">
                                            Step {step.number}: {step.title}
                                        </Heading>
                                        <Text as="p" size="base" weight="normal" className="">
                                            {step.description}
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Images Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Large image spanning 2 rows */}
                        <div className="col-span-2 rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={images[0] || '/placeholder-group.jpg'}
                                alt="Academy group photo"
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>

                        {/* Two smaller images */}
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={images[1] || '/placeholder-classroom.jpg'}
                                alt="Academy classroom"
                                className="w-full h-40 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={images[2] || '/placeholder-students.jpg'}
                                alt="Academy students"
                                className="w-full h-40 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-[var(--color-migenta)] text-white py-6 px-8 rounded-lg mt-12 text-center">
                    <Text as="p" size="xl" weight="semibold">
                        Don't Wait For The Future To Find You—Create It. Step Into The Dynamic World Of Data Science Today.
                    </Text>
                </div>
            </div>
        </section>
    );
};

export default WorkProcess;
