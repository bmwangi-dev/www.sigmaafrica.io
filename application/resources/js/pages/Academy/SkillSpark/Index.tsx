import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";

import { Link } from "@inertiajs/react";
import PrimaryButton from "@/components/Typography/PrimaryButton";
import ApplicationSection from "./Partials/Application";

interface IndexProps {
    activeCohort?: {
        cohort_number: string;
        // Add other properties if needed
    };
}

function Index({ activeCohort }: IndexProps) {
    const handleApplyClick = (e: React.MouseEvent) => {
        if (!activeCohort) {
            e.preventDefault();
            alert("No active cohort is currently open for applications.");
        }
    };

    return (
        <UnauthenticatedLayout>
            <Head title="SkillSpark" />
            <Header
                heading={
                    <>
                        Sigma Africa <span className="text-[var(--color-migenta)]">SkillSpark</span>
                    </>
                }
                subheading="6-Week Intensive Data Science Bootcamp"
                description="SkillSpark is a 6-week intensive data science bootcamp designed to transform beginners into job-ready data professionals. Through hands-on projects, expert mentorship, and real-world case studies, you'll master data analysis, machine learning, and business intelligence."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            />

            <ApplicationSection />

        </UnauthenticatedLayout>
    )
}

export default Index