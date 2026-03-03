import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";


import ContactSection from "./Partials/ContactSection";

function Index() {
    return (
        <UnauthenticatedLayout>
            <Head>
                <title>Contact Us - Sigma Africa | Get in Touch</title>
                <meta name="description" content="Get in touch with Sigma Africa. We're here to help transform your operations and drive sustainable growth through analytics and digital transformation." />
                <meta property="og:title" content="Contact Sigma Africa" />
                <meta property="og:description" content="Get in touch with Sigma Africa. We're here to help transform your business." />
                <meta property="og:type" content="website" />
            </Head>
            <Header
                heading="Contact Us"
                subheading={
                    <>Sigma <span className="text-[var(--color-migenta)]">Africa</span> Accelerate</>
                }
                description="We transform operations, optimize decisions, and drive sustainable growth through analytics and digital transformation."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            />

            <ContactSection />
        </UnauthenticatedLayout>
    )
}

export default Index

