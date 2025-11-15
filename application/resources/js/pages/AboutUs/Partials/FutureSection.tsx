import React from "react";
import Link from "@/components/Typography/Link";

const FutureSection: React.FC = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-[#8cc5e5] to-[#22405d] text-white rounded-2xl w-full">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left max-w-2xl">
                    <h2 className="text-4xl font-bold mb-6">
                        Be Part Of The <span className="text-[#fea300]">Future</span>
                    </h2>

                    <h3 className="text-2xl font-semibold mb-8">
                        Take The Next Step In Your{" "}
                        <span className="text-[#fea300]">Data Science</span> Journey!
                    </h3>

                    <p className="text-lg mb-10 leading-relaxed">
                        Sigma Africa is more than a community—It's a movement shaping
                        Africa's data science landscape. Whether you're a student,
                        professional, or organization, there's a place for you in our
                        network.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">

                    <Link href="/community">
                        <button className="bg-[#fea300] hover:bg-[#e59400] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:cursor-pointer hover:shadow-xl">
                            Become A Member
                        </button>
                    </Link>

                    <Link href="/academy">
                        <button className="bg-transparent border-2 border-white hover:bg-white hover:text-[#06659b] text-white font-semibold py-3 px-8 rounded-lg transition-all hover:cursor-pointer duration-300">
                            Join Our Academy
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default FutureSection;
