import { Head, Link } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

import PrimaryButton from "@/components/Typography/PrimaryButton";
import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";
import LearningJourney from "../Partials/LearningJourney";
import WhyChooseUs from "../Partials/WhyChooseUs";
import WorkProcess from "../Partials/WorkProcess";
import FAQSection from "../Partials/FAQSection";

import studentImage from "../../../../../public/images/academy_student.webp";
import groupImage from "../../../../../public/images/academy_group.webp";
import trainersImage from "../../../../../public/images/academy_trainers.webp";

interface IndexProps {
    activeCohort?: {
        cohort_number: string;
        // Add other properties if needed
    };
}

function Index({ activeCohort }: IndexProps) {
    return (
        <UnauthenticatedLayout>
            <Head title="SkillSpark - Data Science Bootcamp" />
            <Header
                heading={
                    <>
                        Sigma Africa <span className="text-[var(--color-migenta)]">SkillSpark</span>
                    </>
                }
                subheading="9-Week Intensive Data Science Bootcamp"
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            >
                <Breadcrumbs
                    variant="header"
                    items={[
                        { label: 'Academy', href: '/academy' },
                        { label: 'SkillSpark' }
                    ]}
                />
                <div className="mt-8 flex justify-center">
                    <Link href="/academy/skillsparks/apply">
                        <PrimaryButton className="bg-[var(--color-migenta)] text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform">
                            Apply for SkillSpark
                        </PrimaryButton>
                    </Link>
                </div>
            </Header>

            <LearningJourney />

            <WhyChooseUs imageSrc={studentImage} />

            <WorkProcess images={[groupImage, studentImage, trainersImage]} />

            <section className="py-20 bg-[var(--color-primary)] text-white text-center">
                <div className="container mx-auto px-4">
                    <Heading level={2} size="4xl" weight="bold" className="mb-6">
                        Ready to Start Your <span className="text-[var(--color-migenta)]">Data Journey?</span>
                    </Heading>
                    <Text as="p" size="xl" className="text-gray-300 mb-10 max-w-2xl mx-auto">
                        Join our next cohort and gain the skills to become a data-driven professional in just 9 weeks.
                    </Text>
                    <Link href="/academy/skillsparks/apply">
                        <PrimaryButton className="bg-[var(--color-migenta)] text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-opacity-90 transition-all">
                            Apply Now
                        </PrimaryButton>
                    </Link>
                </div>
            </section>

            <FAQSection imageSrc={trainersImage} />

        </UnauthenticatedLayout>
    )
}

export default Index