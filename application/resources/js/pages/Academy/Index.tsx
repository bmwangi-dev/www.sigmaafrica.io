import { Head, Link } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, ArrowRight } from "lucide-react";
import PrimaryButton from "@/components/Typography/PrimaryButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

function Index() {
    const programs = [
        {
            title: "SkillSpark",
            subtitle: "Data Science & AI",
            description: "Master data science, machine learning, and analytics through hands-on training, expert mentorship, and real-world projects. Designed to transform beginners into job-ready data professionals.",
            icon: <Brain className="w-12 h-12 text-[var(--color-migenta)]" />,
            link: "/academy/skillsparks",
            color: "var(--color-migenta)"
        },
        {
            title: "Zindua",
            subtitle: "Software Development",
            description: "Build the future with code. A comprehensive software development program covering modern frameworks, full-stack technologies, and collaborative engineering practices.",
            icon: <Code className="w-12 h-12 text-[var(--color-primary)]" />,
            link: "/academy/zindua",
            color: "var(--color-primary)"
        }
    ];

    return (
        <UnauthenticatedLayout>
            <Head>
                <title>Academy - Sigma Africa | Our Programs</title>
                <meta name="description" content="Explore Sigma Africa's educational programs in Data Science and Software Development. Empowering Africa's rising generation of tech leaders." />
            </Head>
            <Header
                heading={
                    <>
                        Sigma Africa <span className="text-[var(--color-migenta)]">Academy</span>
                    </>
                }
                subheading="Empowering Africa's Rising Generation of Tech Leaders"
                description="We offer industry-leading programs designed to equip you with the skills needed to thrive in the modern digital economy."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            >
            </Header>

            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <Heading level={2} size="4xl" weight="bold" className="text-[var(--color-sigma-blue)] mb-4">
                            Our <span className="text-[var(--color-migenta)]">Programs</span>
                        </Heading>
                        <Text as="p" size="lg" className="text-gray-600 max-w-2xl mx-auto">
                            Choose your path and start your journey towards a rewarding career in technology.
                        </Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {programs.map((program, index) => (
                            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-none overflow-hidden bg-white">
                                <CardHeader className="p-8 pb-4">
                                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                        {program.icon}
                                    </div>
                                    <CardTitle className="text-3xl font-bold text-[var(--color-sigma-blue)] mb-2">
                                        {program.title}
                                    </CardTitle>
                                    <Text as="span" size="sm" weight="bold" className="uppercase tracking-wider text-gray-400">
                                        {program.subtitle}
                                    </Text>
                                </CardHeader>
                                <CardContent className="p-8 pt-0">
                                    <CardDescription className="text-gray-600 text-lg mb-8 leading-relaxed">
                                        {program.description}
                                    </CardDescription>
                                    <Link href={program.link}>
                                        <PrimaryButton
                                            className="w-full flex items-center justify-center gap-2 py-4 text-lg"
                                            style={{ backgroundColor: program.color }}
                                        >
                                            Explore Program <ArrowRight className="w-5 h-5" />
                                        </PrimaryButton>
                                    </Link>
                                </CardContent>
                                <div
                                    className="h-2 w-full mt-auto"
                                    style={{ backgroundColor: program.color }}
                                />
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </UnauthenticatedLayout>
    );
}

export default Index


