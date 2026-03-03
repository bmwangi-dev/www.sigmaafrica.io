import WhyStudyWithUs from "./Partials/WhyStudyWithUs";
import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import React, { lazy } from "react";
const Testimonials = lazy(() => import("@/layouts/Testimonials"));
export default function Index() {
    return (
        <UnauthenticatedLayout>
            <Head>
                <title>Sigma Africa - Data-Driven Innovation & Digital Transformation</title>
                <meta name="description" content="Transform industries with data-driven innovation. Partner with Sigma Africa to unlock growth and maximize potential through analytics and digital transformation." />
                <meta property="og:title" content="Sigma Africa - Your Growth Partner" />
                <meta property="og:description" content="Transform industries with data-driven innovation. Partner with Sigma Africa to unlock growth and maximize potential." />
                <meta property="og:type" content="website" />
            </Head>
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
                showStatistics={true}
            >
            </Header>
            <WhyStudyWithUs />
            <Testimonials />
        </UnauthenticatedLayout>

    );
}
