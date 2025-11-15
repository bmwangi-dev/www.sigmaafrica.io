import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";


function Index() {
    return (
        <UnauthenticatedLayout>
            <Head title="Blogs" />
            <Header
                heading="Our Blogs"
                subheading={
                    <>Sigma <span className="text-[var(--color-migenta)]">Africa</span> Accelerate</>
                }
                description="We transform operations, optimize decisions, and drive sustainable growth through analytics and digital transformation."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            />
        </UnauthenticatedLayout>
    )
}

export default Index

