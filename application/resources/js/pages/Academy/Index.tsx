import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import LearningJourney from "./Partials/LearningJourney";
import WhyChooseUs from "./Partials/WhyChooseUs";
import WorkProcess from "./Partials/WorkProcess";
import FAQSection from "./Partials/FAQSection";
import studentImage from "../../../../public/images/academy_student.webp";
import groupImage from "../../../../public/images/academy_group.webp";
import trainersImage from "../../../../public/images/academy_trainers.webp";

function Index() {
    return (
        <UnauthenticatedLayout>
            <Head>
                <title>Sigma Africa Academy - Data Science & Machine Learning Training</title>
                <meta name="description" content="Master data science, machine learning, and analytics through hands-on training, expert mentorship, and real-world projects. Empowering Africa's next generation of data scientists." />
                <meta property="og:title" content="Sigma Africa Academy - Empowering Data Scientists" />
                <meta property="og:description" content="Master data science, machine learning, and analytics through hands-on training and expert mentorship." />
                <meta property="og:type" content="website" />
            </Head>
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


