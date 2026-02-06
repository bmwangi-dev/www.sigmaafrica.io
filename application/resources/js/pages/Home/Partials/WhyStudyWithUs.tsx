import StudyWithUsImage from '../../../../../public/ai.jpeg'
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import PrimaryButton from '@/components/Typography/PrimaryButton';
const WhyStudyWithUs = () => {
    const benefits = [
        {
            icon: '📝',
            title: 'Market driven skills',
            description:
                'We maximize your relevance and value in the job market by focusing on skills and knowledge that are in high demand. You’ll gain practical, hands-on experience in the tools and techniques companies actively seek, giving you a competitive edge, faster career advancement, and increased job satisfaction by working on projects that truly matter.',
        },
        {
            icon: '🧑‍🏫',
            title: 'Personalised training',
            description:
                'We tailor the learning experience to your unique needs and goals, helping you master essential skills more effectively. By focusing on areas where you need the most development, you’ll progress faster, gain confidence, and be better equipped to tackle real-world challenges.',
        },
        {
            icon: '💻',
            title: 'Practical approach',
            description:
                'We emphasize hands-on learning, where you apply concepts directly to real-world scenarios. This method enhances your problem-solving skills, builds confidence, and ensures you’re job-ready with skills that go beyond theory. By working through real challenges, you’ll gain valuable experience and be better prepared for the demands of your industry.',
        },
        {
            icon: '👨‍🔧',
            title: 'Certified Trainers',
            description:
                'Our certified trainers are experts who meet industry standards and bring proven skills to the table. Their credentials and experience mean you’ll receive high-quality instruction, practical insights, and guidance that aligns with best practices.',
        },
    ];

    return (
        <section className="px-4 sm:pt-4 mt-4">
            <div className="container mx-auto flex flex-col lg:flex-row gap-8 gap-y-8 items-start">
                <div className="bg-white rounded-xl shadow-md p-8 flex-1">
                    <Heading level={2} size="3xl" weight="bold" className="bg-[var(--color-migenta)] text-white py-4 px-8 rounded-lg text-center max-w-2xl mx-auto mb-6">WHY STUDY WITH US?</Heading>
                    <div className="space-y-6">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className="text-2xl hidden sm:block">{benefit.icon}</div>
                                <div>
                                    <Heading level={3} size="lg" weight="semibold" className="text-[var(--color-sigma-blue)]">{benefit.title}</Heading>
                                    <Text as="p" size="base" weight="normal" className="text-gray-700 mt-1">{benefit.description}</Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col h-full">
                    <img
                        src={StudyWithUsImage}
                        alt="Smiling student"
                        className="rounded-xl w-full object-cover flex-grow max-h-96 sm:max-h-full"
                    />

                    <div className="bg-[var(--color-primary)] text-white mt-2 p-6 rounded-xl flex flex-col justify-center items-start flex-grow">
                        <Heading level={4} size="xl" weight="semibold" className="mb-2">Get in Touch With Us</Heading>
                        <Text as="p" size="base" weight="normal" className="mb-4">
                            Ready to take your skills to the next level? Reach out to us today and let’s get started!
                        </Text>
                        <PrimaryButton disabled={true} className="bg-white text-[var(--color-primary)] px-4 py-2 rounded-md font-semibold opacity-50 cursor-not-allowed">
                            Contact Us (Closed)
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyStudyWithUs;
