import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import AboutSection from "./Partials/AboutSection";
import MeetTheTeam from "./Partials/MeetTheTeam";
import FutureSection from "./Partials/FutureSection";
import HowWeEmpower from "./Partials/HowWeEmpower";
import OurPartners from "./Partials/OurPartner";
import Datascience from "../../../../public/datascience.png";
import howweempower from "../../../../public/howweempower.jpeg";
import { TeamData } from "@/types/Team";

interface AboutUsProps {
    teams: TeamData[];
}

export default function Index({ teams }: AboutUsProps) {
    return (
        <UnauthenticatedLayout>
            <Head title="About Us" />
            <Header
                heading={
                    <>
                        About <span className="text-[var(--color-migenta)]">Us</span>
                    </>
                }
                subheading={
                    <>Sigma <span className="text-[var(--color-migenta)]">Africa</span> Accelerate</>
                }
                description="We transform operations, optimize decisions, and drive sustainable growth through analytics and digital transformation."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-start w-full py-8">
                <AboutSection
                    imageSrc={Datascience}
                    smallTitle="3 Years of Impact"
                    bigTitle="Driving Data Science Excellence in Africa"
                    description="Founded in 2022, Sigma Africa is a leading collective dedicated to shaping Africa’s data-driven future. We build skilled talent, foster innovation, and strengthen the continent’s data ecosystem."
                    paragraph="We empower industries with data-driven insights and transformative solutions—optimizing decisions, streamlining operations, and fueling sustainable growth through analytics and digital innovation."
                />
            </div>

            <div>
                <MeetTheTeam teams={teams} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-start w-full py-8">
                <HowWeEmpower
                    imageSrc={howweempower}
                    bigTitle="How We Empower Data-Driven Growth"
                />
            </div>

            <div>
                <OurPartners />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
                <FutureSection />
            </div>
        </UnauthenticatedLayout>
    );
}
