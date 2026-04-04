import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import ApplicationSection from "./Partials/Application";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

function Apply() {
    return (
        <UnauthenticatedLayout>
            <Head title="Apply - SkillSpark Data Science Bootcamp" />
            <Header
                heading={
                    <>
                        Apply for <span className="text-[var(--color-migenta)]">SkillSpark</span>
                    </>
                }
                subheading="Take the first step towards your data science career"
                description="Fill out the form below to apply for the next cohort of our intensive data science bootcamp."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            >
                <Breadcrumbs
                    variant="header"
                    items={[
                        { label: 'Academy', href: '/academy' },
                        { label: 'SkillSpark', href: '/academy/skillsparks' },
                        { label: 'Apply' }
                    ]}
                />
            </Header>

            <ApplicationSection />

        </UnauthenticatedLayout>
    )
}

export default Apply
