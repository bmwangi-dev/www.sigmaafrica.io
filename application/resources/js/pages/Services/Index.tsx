import { Head } from '@inertiajs/react';
import UnauthenticatedLayout from '@/layouts/UnauthenticatedLayout';
import Heading from '@/components/Typography/Heading';
import ServiceContactForm from '@/pages/Services/Partials/ServiceContactForm';
import Text from '@/components/Typography/Text';
import { CheckCircle2, Globe, Layout, Search, Megaphone, TrendingUp, Briefcase } from 'lucide-react';
import { Header } from '@/components/ui/Header';

import studentImg from '../../../../public/images/services_team.webp';
import dsImg from '../../../../public/images/about_sigma.webp';

export default function Index() {
    const servicesList = [
        "Website Development",
        "Application Development",
        "Data Science",
        "Digital Marketing",
        "Academic & Market Research",
        "Data-Centric Business Consultancy"
    ];

    const serviceCards = [
        {
            icon: Globe,
            title: "Website Development",
            description: "Custom, responsive websites tailored to your brand and business goals, built for optimal user experience and conversion."
        },
        {
            icon: Layout,
            title: "Web App Development",
            description: "Scalable, secure mobile and web applications designed to streamline your operations and engage your audience."
        },
        {
            icon: Search,
            title: "Data Science",
            description: "Leverage advanced analytics and machine learning to extract actionable insights from complex datasets, driving data-informed decision-making and predictive modeling."
        },
        {
            icon: Megaphone,
            title: "Digital Marketing",
            description: "Targeted campaigns across various channels including social media, email, and PPC to boost brand awareness and lead generation."
        },
        {
            icon: TrendingUp,
            title: "Academic & Market Research",
            description: "In-depth research and data analysis to provide actionable insights for academic purposes or market expansion strategies."
        },
        {
            icon: Briefcase,
            title: "Data-Centric Business Consultancy",
            description: "Leverage data-backed strategies and actionable insights to overcome business challenges, optimize operations, and achieve sustainable growth."
        }
    ];

    return (
        <UnauthenticatedLayout>
            <Head title="Services" />

            <Header
                heading="Our Services"
                subheading={
                    <>Sigma <span className="text-[var(--color-migenta)]">Africa</span> Solutions</>
                }
                description="Comprehensive digital and business solutions designed to propel your organization forward."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            />

            <div className="min-h-screen py-10">
                <div className="container mx-auto px-4">

                    <div className="flex flex-col lg:flex-row items-center gap-16 mb-10">

                        <div className="w-full lg:w-1/2 space-y-8">
                            <div>
                                <Heading level={2} size="4xl" weight="bold" className="text-[var(--color-sigma-blue)] mb-2">
                                    360-degree Solution
                                </Heading>
                                <Heading level={2} size="4xl" weight="bold" className="text-[var(--color-sigma-blue)]">
                                    to your Business
                                </Heading>
                            </div>

                            <div className="bg-[var(--color-primary)] p-8 rounded-3xl border border-gray-100 shadow-lg">
                                <ul className="space-y-4">
                                    {servicesList.map((service, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[var(--color-migenta)] flex-shrink-0" />
                                            <Text size="lg" weight="medium" className="text-white">
                                                {service}
                                            </Text>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]">
                            <div className="absolute top-0 right-0 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-xl ring-4 ring-[var(--color-migenta)] z-10">
                                <img src={studentImg} alt="Team collaboration" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-3xl overflow-hidden shadow-xl ring-4 ring-[var(--color-migenta)] z-20">
                                <img src={dsImg} alt="Data Analysis" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[var(--color-migenta)] rounded-2xl -z-10 opacity-20 transform -translate-y-1/2 -rotate-12"></div>
                            <div className="absolute bottom-10 right-10 w-16 h-16 bg-[var(--color-primary)] rounded-full z-30 opacity-80"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {serviceCards.map((card, index) => (
                            <div key={index} className="bg-white text-[var(--color-sigma-blue)] p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[var(--color-migenta)] transition-all duration-300 group">
                                <div className="mb-6">
                                    <card.icon className="w-8 h-8 text-[var(--color-migenta)]" />
                                </div>
                                <Heading level={3} size="xl" weight="bold" className="mb-4 text-[var(--color-sigma-blue)]">
                                    {card.title}
                                </Heading>
                                <Text as="p" size="base" className="text-gray-600 leading-relaxed">
                                    {card.description}
                                </Text>
                                <div className="mt-4 pt-4 border-t border-[var(--color-migenta)] w-16"></div>
                            </div>
                        ))}
                    </div>

                    <ServiceContactForm />

                </div>
            </div>
        </UnauthenticatedLayout>
    );
}
