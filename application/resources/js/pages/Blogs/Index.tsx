import { Head } from "@inertiajs/react";
import { Header } from "@/components/ui/Header";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function Index() {
    const blogs = [
        {
            category: "Career Insights",
            title: <>Top <span className="text-[var(--color-migenta)]">5 Skills</span> to Master by <span className="text-[var(--color-migenta)]">2025</span></>,
            description: "As industries evolve, these five skills will keep you ahead of the curve. Master them to secure your future in the tech landscape.",
            image: "/academy-student.png",
            link: "#"
        },
        {
            category: "Data Science",
            title: <>The Future of <span className="text-[var(--color-migenta)]">Big Data</span> in <span className="text-[var(--color-migenta)]">Africa</span></>,
            description: "Explore how data analytics is transforming businesses and governance across the continent. Join the revolution today.",
            image: "/datascience.png",
            link: "#"
        },
        {
            category: "Artificial Intelligence",
            title: <>Demystifying <span className="text-[var(--color-migenta)]">AI</span> for <span className="text-[var(--color-migenta)]">Beginners</span></>,
            description: "Artificial Intelligence is not just for experts. Learn the basics and how you can apply AI tools in your daily work.",
            image: "/ai.jpeg",
            link: "#"
        }
    ];

    return (
        <UnauthenticatedLayout>
            <Head title="Blogs" />
            <Header
                heading="Our Blogs"
                subheading={
                    <>Sigma <span className="text-[var(--color-migenta)]">Africa</span> Insights</>
                }
                description="Stay updated with the latest trends, stories, and insights from the world of technology and data."
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            />

            <div className="min-h-screen py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogs.map((blog, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col">
                                {/* Image Section */}
                                <div className="h-64 overflow-hidden relative bg-[var(--color-sigma-blue)]">
                                    <div className="absolute inset-0 bg-teal-400 opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
                                    <img
                                        src={blog.image}
                                        alt="Blog Thumbnail"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="text-sm text-gray-500 mb-3 font-medium uppercase tracking-wider">
                                        {blog.category}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900 leading-tight">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                                        {blog.description}
                                    </p>
                                    <div>
                                        <Link
                                            href={blog.link}
                                            className="inline-block px-6 py-2.5 rounded-lg border-2 border-[var(--color-migenta)] text-[var(--color-migenta)] font-bold hover:bg-[var(--color-migenta)] hover:text-white transition-all duration-300"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </UnauthenticatedLayout>
    );
}

