import StudyWithUsImage from '../../../../../public/images/study_with_us.png'
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import PrimaryButton from '@/components/Typography/PrimaryButton';
import { BookOpen, Users, Laptop, Award, PhoneCall } from 'lucide-react';

import { Link } from '@inertiajs/react';

const WhyStudyWithUs = () => {
    const benefits = [
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: 'Market driven skills',
            description:
                'We maximize your relevance and value in the job market by focusing on skills and knowledge that are in high demand. You’ll gain practical, hands-on experience in the tools and techniques companies actively seek.',
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: 'Personalised training',
            description:
                'We tailor the learning experience to your unique needs and goals, helping you master essential skills more effectively by focusing on areas where you need the most development.',
        },
        {
            icon: <Laptop className="w-6 h-6" />,
            title: 'Practical approach',
            description:
                'We emphasize hands-on learning, where you apply concepts directly to real-world scenarios. This method enhances your problem-solving skills and ensures you’re job-ready.',
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: 'Certified Trainers',
            description:
                'Our certified trainers are experts who meet industry standards and bring proven skills to the table, providing high-quality instruction and practical insights.',
        },
    ];

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
                        <div className="mb-10 text-center lg:text-left">
                            <Text as="p" size="sm" weight="semibold" className="text-[var(--color-migenta)] uppercase tracking-widest mb-3">
                                Why Choose Us
                            </Text>
                            <Heading level={2} size="4xl" weight="bold" className="text-[var(--color-sigma-blue)]">
                                Why Study With Us?
                            </Heading>
                        </div>

                        <div className="space-y-8">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-4 group">
                                    <div className="p-3 rounded-xl bg-[var(--color-primary-note)] text-[var(--color-migenta)] group-hover:bg-[var(--color-migenta)] group-hover:text-white transition-all duration-300">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <Heading level={3} size="xl" weight="semibold" className="text-[var(--color-sigma-blue)] mb-2">
                                            {benefit.title}
                                        </Heading>
                                        <Text as="p" size="base" className="text-gray-600 leading-relaxed">
                                            {benefit.description}
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-6 w-full lg:sticky lg:top-24">
                        <div className="relative group">
                            <div className="overflow-hidden rounded-2xl shadow-xl">
                                <img
                                    src={StudyWithUsImage}
                                    alt="Learning at Sigma Africa"
                                    className="w-full h-[350px] lg:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[var(--color-migenta)] rounded-2xl -z-10 opacity-20 transform rotate-12"></div>
                        </div>

                        <div className="bg-[var(--color-primary)] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <PhoneCall className="w-6 h-6 text-[var(--color-migenta)]" />
                                    <Heading level={4} size="xl" weight="semibold">Get in Touch With Us</Heading>
                                </div>
                                <Text as="p" size="base" weight="normal" className="text-gray-300 mb-6">
                                    Ready to take your skills to the next level? Reach out to us today and let’s get started!
                                </Text>
                                <Link href="/services#consult" className="w-full">
                                    <PrimaryButton className="w-full bg-[var(--color-migenta)] hover:bg-opacity-90 text-white px-6 py-3 rounded-xl font-bold transition-all">
                                        Inquire Now
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyStudyWithUs;
