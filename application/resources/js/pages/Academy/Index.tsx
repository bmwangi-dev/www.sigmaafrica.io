import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import LearningJourney from "./Partials/LearningJourney";
import WhyChooseUs from "./Partials/WhyChooseUs";
import WorkProcess from "./Partials/WorkProcess";
import FAQSection from "./Partials/FAQSection";
import studentImage from "../../../../public/academy-student.png";
import groupImage from "../../../../public/academy-group.png";
import trainersImage from "../../../../public/academy-trainers.png";

function Index() {
    return (
        <UnauthenticatedLayout>
            <Head title="Academy" />
            <Header
                heading={
                    <>
                        Sigma Africa <span className="text-[var(--color-migenta)]">Academy</span>
                    </>
                }
                subheading="Empowering Africa's Next Generation of Data Scientists"
                description="Master data science, machine learning, and analytics through hands-on training, expert mentorship, and real-world projects."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            />

            <LearningJourney />

            <WhyChooseUs imageSrc={studentImage} />

            <WorkProcess images={[groupImage, studentImage, trainersImage]} />

            <FAQSection imageSrc={trainersImage} />
        </UnauthenticatedLayout>
    );
}

export default Index


