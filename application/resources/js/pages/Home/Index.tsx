import WhyStudyWithUs from "./Partials/WhyStudyWithUs";
import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
export default function Index() {
    return (
        <UnauthenticatedLayout>
            <Head title="Home" />
            <Header
                heading={
                    <>
                        Welcome to <span className="text-[var(--color-migenta)]">Sigma</span> Africa
                    </>
                }
                subheading="Your Growth Partner"
                description="Transform industries with data-driven innovation. Partner with us to unlock growth and maximize potential."
                className={{ background: 'linear-gradient(90deg, #0a2540, #06659b)' }}
                textColor="text-white"
            >
            </Header>
            <WhyStudyWithUs />
        </UnauthenticatedLayout>

    );
}
