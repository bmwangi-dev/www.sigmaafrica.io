import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import Heading from "@/components/Typography/Heading";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
export default function Index() {
    return (
        <UnauthenticatedLayout>
            <Head title="Home" />
            <Header
                heading={
                    <>
                        Sigma <span className="text-[var(--color-migenta)]">Africa</span> Accelerate
                    </>
                }
                subheading="Accelerate Your Future"
                description="We transform operations, optimize decisions, and drive sustainable growth through analytics and digital transformation."
                className={{ background: 'linear-gradient(90deg, #0a2540, #06659b)' }}
                textColor="text-white"
                showStatistics={false}
            >
            </Header>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center w-full py-8">
                <Heading level={1} size="3xl" weight="light">Welcome to About US page</Heading>
            </div>
        </UnauthenticatedLayout>

    );
}
