import { Head } from "@inertiajs/react";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";
import { Link } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";

export default function Index() {
    const communities = [
        {
            title: "Community Stories",
            image: "/academy-group.png",
            description: "Discover the inspiring journeys of our community members. From students to professionals, hear how Sigma Africa has transformed their careers and lives. Our community is a melting pot of ideas, experiences, and success stories waiting to be shared.",
            link: "#",
            reverse: false
        },
        {
            title: "Data Science",
            image: "/datascience.png",
            description: "Dive into the world of data. Join a vibrant community of data scientists, analysts, and enthusiasts. Access exclusive workshops, hackathons, and resources designed to sharpen your skills and keep you ahead in the rapidly evolving field of Data Science.",
            link: "#",
            reverse: true
        },
        {
            title: "Zindua", // Software Development
            image: "/academy-student.png",
            description: "Build the future with code. The Zindua community is the home for software developers, engineers, and creators. Collaborate on open-source projects, learn new frameworks, and connect with mentors who can guide you on your path to becoming a world-class developer.",
            link: "#",
            reverse: false
        }
    ];

    return (
        <UnauthenticatedLayout>
            <Head title="Community" />
            <Header
                heading="Community"
                subheading={
                    <>Sigma <span className="text-[var(--color-migenta)]">Africa</span> Accelerate</>
                }
                description="We transform operations, optimize decisions, and drive sustainable growth through analytics and digital transformation."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            />

            <div className="min-h-screen py-20">
                <div className="container mx-auto px-4">

                    <div className="text-center mb-20">
                        <Heading level={1} size="4xl" weight="bold" className="text-[var(--color-sigma-blue)] mb-6">
                            Explore <span className="text-black">Our Communities</span>
                        </Heading>
                        <div className="w-24 h-1 bg-[var(--color-migenta)] mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-24 mb-24">
                        {communities.map((community, index) => (
                            <div
                                key={index}
                                className={`flex flex-col ${community.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
                            >
                                {/* Image Section */}
                                <div className="w-full lg:w-1/2">
                                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                                        <div className="absolute inset-0 bg-[var(--color-sigma-blue)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>
                                        <img
                                            src={community.image}
                                            alt={community.title}
                                            className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="w-full lg:w-1/2 text-center lg:text-left">
                                    <Heading level={3} size="3xl" weight="bold" className="mb-6 bg-[var(--color-migenta)] text-white py-4 px-8 rounded-lg mb-12 text-center max-w-2xl mx-auto">
                                        {community.title}
                                    </Heading>
                                    <Text as="p" size="lg" className="text-gray-600 mb-8 leading-relaxed">
                                        {community.description}
                                    </Text>
                                    <button className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:text-white transition-colors duration-300">
                                        <span className="absolute inset-0 w-full h-full bg-[var(--color-primary)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                                        <span className="relative flex items-center justify-center gap-2 font-bold">
                                            Explore More
                                            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-[var(--color-primary-note)] to-[var(--color-sigma-blue)] rounded-3xl p-12 text-center shadow-inner">
                        <Heading level={2} size="3xl" weight="bold" className="mb-6 text-white">
                            Ready to make an impact?
                        </Heading>
                        <Text as="p" size="xl" className="text-gray-300 mb-10 max-w-2xl mx-auto">
                            Join thousands of others who are shaping the future of technology in Africa.
                        </Text>
                        <Link
                            href="/contact"
                            className="inline-block bg-[var(--color-migenta)] text-white px-12 py-4 rounded-full text-lg font-bold hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            Become a member
                        </Link>
                    </div>
                </div>
            </div>
        </UnauthenticatedLayout>
    );
}


