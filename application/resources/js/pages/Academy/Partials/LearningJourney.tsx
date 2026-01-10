import React from 'react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import { Brain, Shield, Flag, BookOpen, Code, ChartBar } from 'lucide-react';

interface CourseModule {
    title: string;
    description: string;
    icon: React.ReactNode;
    featured?: boolean;
}

const LearningJourney: React.FC = () => {
    const modules: CourseModule[] = [
        {
            title: 'Your Learning Journey',
            description: 'Gain practical, in-demand data science skills designed to tackle real-world challenges.',
            icon: <Brain className="w-8 h-8 text-[var(--color-migenta)]" />,
            featured: true,
        },
        {
            title: 'Data Science Fundamentals',
            description: 'Build a strong foundation in statistics, Python programming, and data manipulation principles.',
            icon: <BookOpen className="w-8 h-8 text-[var(--color-migenta)]" />,
        },
        {
            title: 'Machine Learning & AI',
            description: 'Master supervised and unsupervised learning, neural networks, and deep learning techniques.',
            icon: <Brain className="w-8 h-8 text-[var(--color-migenta)]" />,
        },
        {
            title: 'Data Visualization',
            description: 'Learn to communicate insights effectively through compelling visualizations and dashboards.',
            icon: <ChartBar className="w-8 h-8 text-[var(--color-migenta)]" />,
        },
        {
            title: 'Advanced Analytics',
            description: 'Master advanced techniques, Big Data tools, and cloud-based analytics platforms.',
            icon: <Code className="w-8 h-8 text-[var(--color-migenta)]" />,
        },
        {
            title: 'Capstone Projects',
            description: 'Gain skills to produce impactful real-world projects and build your professional portfolio.',
            icon: <Flag className="w-8 h-8 text-[var(--color-migenta)]" />,
        },
    ];

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <Heading
                    level={2}
                    size="4xl"
                    weight="bold"
                    className="text-center mb-4"
                >
                    Transform Your Career Today
                </Heading>
                <Text
                    as="p"
                    size="lg"
                    weight="normal"
                    className="text-center mb-12 max-w-3xl mx-auto"
                >
                    Looking to become a sought-after data science professional? You've found the perfect launchpad! At Sigma Africa, we offer cutting-edge, hands-on training, expert mentorship, and real-world experience to supercharge your journey in data science.
                </Text>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, index) => (
                        <div
                            key={index}
                            className={`${module.featured
                                ? 'bg-[var(--color-migenta)] text-white'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                                } p-8 rounded-lg transition-all duration-300 ${!module.featured && 'border-2 border-transparent hover:border-[var(--color-migenta)]'
                                }`}
                        >
                            <div className="mb-4">{module.icon}</div>
                            <Heading
                                level={3}
                                size="xl"
                                weight="bold"
                                className="mb-3"
                            >
                                {module.title}
                            </Heading>
                            <Text as="p" size="base" weight="normal" className={module.featured ? 'text-white' : 'text-gray-300'}>
                                {module.description}
                            </Text>
                            {!module.featured && (
                                <div className="mt-4 pt-4 border-t border-[var(--color-migenta)] w-16"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearningJourney;
