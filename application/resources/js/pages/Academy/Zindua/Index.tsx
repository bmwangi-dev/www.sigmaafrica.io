import { Head, Link } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";
import PrimaryButton from "@/components/Typography/PrimaryButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Code, Layout, Server, Database, Globe } from "lucide-react";

function Index() {
    const modules = [
        {
            title: "Frontend Development",
            description: "Master modern UI/UX principles and frameworks like React and Next.js to build stunning user interfaces.",
            icon: <Layout className="w-8 h-8 text-[var(--color-primary)]" />
        },
        {
            title: "Backend Systems",
            description: "Build robust and scalable server-side applications using Node.js, Express, and Laravel.",
            icon: <Server className="w-8 h-8 text-[var(--color-primary)]" />
        },
        {
            title: "Database Management",
            description: "Learn to design and manage complex data structures with SQL and NoSQL databases.",
            icon: <Database className="w-8 h-8 text-[var(--color-primary)]" />
        },
        {
            title: "Fullstack Integration",
            description: "Connect frontend and backend seamlessly to create complete, production-ready web applications.",
            icon: <Globe className="w-8 h-8 text-[var(--color-primary)]" />
        }
    ];

    return (
        <UnauthenticatedLayout>
            <Head title="Zindua - Software Development Program" />
            <Header
                heading={
                    <>
                        Sigma Africa <span className="text-[var(--color-migenta)]">Zindua</span>
                    </>
                }
                subheading="Comprehensive Software Development Training"
                description="Zindua is our premier software development program designed to turn aspiring creators into world-class engineers. Join a community of innovators and build the future of tech."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            >
                <Breadcrumbs
                    variant="header"
                    items={[
                        { label: 'Academy', href: '/academy' },
                        { label: 'Zindua' }
                    ]}
                />
                <div className="mt-8 flex justify-center">
                    <Link href="/academy/zindua/apply">
                        <PrimaryButton className="bg-[var(--color-migenta)] text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform">
                            Apply for Zindua
                        </PrimaryButton>
                    </Link>
                </div>
            </Header>

            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <Heading level={2} size="4xl" weight="bold" className="text-[var(--color-sigma-blue)] mb-4">
                            What You'll <span className="text-[var(--color-primary)]">Learn</span>
                        </Heading>
                        <Text as="p" size="lg" className="text-gray-600 max-w-2xl mx-auto">
                            Our curriculum is designed to give you a complete understanding of the modern software development lifecycle.
                        </Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {modules.map((module, index) => (
                            <div key={index} className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="mb-6">{module.icon}</div>
                                <Heading level={3} size="xl" weight="bold" className="text-[var(--color-sigma-blue)] mb-3">
                                    {module.title}
                                </Heading>
                                <Text as="p" size="base" className="text-gray-600">
                                    {module.description}
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-[var(--color-primary)] text-white text-center">
                <div className="container mx-auto px-4">
                    <Heading level={2} size="4xl" weight="bold" className="mb-6">
                        Ready to Build the <span className="text-[var(--color-migenta)]">Future?</span>
                    </Heading>
                    <Text as="p" size="xl" className="text-gray-300 mb-10 max-w-2xl mx-auto">
                        Enroll in Zindua today and start your journey to becoming a professional software engineer.
                    </Text>
                    <Link href="/academy/zindua/apply">
                        <PrimaryButton className="bg-[var(--color-migenta)] text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-opacity-90 transition-all">
                            Apply for Zindua
                        </PrimaryButton>
                    </Link>
                </div>
            </section>

        </UnauthenticatedLayout>
    );
}

export default Index
