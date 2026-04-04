import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import ApplicationSection from "./Partials/Application";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

function Apply() {
    return (
        <UnauthenticatedLayout>
            <Head title="Apply - Zindua Software Development Program" />
            <Header
                heading={
                    <>
                        Apply for <span className="text-[var(--color-primary)]">Zindua</span>
                    </>
                }
                subheading="Start your journey to becoming a world-class engineer"
                description="Fill out the form below to apply for our comprehensive software development program."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            >
                <Breadcrumbs
                    variant="header"
                    items={[
                        { label: 'Academy', href: '/academy' },
                        { label: 'Zindua', href: '/academy/zindua' },
                        { label: 'Apply' }
                    ]}
                />
            </Header>

            <ApplicationSection />

        </UnauthenticatedLayout>
    )
}

export default Apply
