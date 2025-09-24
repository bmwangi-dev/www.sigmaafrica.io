import React from "react";

const partners = [
    { name: "JKUAT", logo: "/jkuat.png" },
    { name: "Technical University of Kenya", logo: "/tuk.png" },
    { name: "Sinapis Group", logo: "/sinapis.png" },
];

const OurPartners: React.FC = () => {
    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto text-center px-6">
                {/* Heading */}
                <h2 className="text-3xl font-bold mb-4">
                    <span className="text-[#06659b]">Our</span>{" "}
                    <span className="text-[#fea300]">Partners</span>
                </h2>
                <p className="text-lg text-gray-600 mb-10">
                    Collaborating for a brighter future.
                </p>

                {/* Partner Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {partners.map((partner, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-sm rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="mb-4"
                                style={{
                                    maxHeight: "100px",
                                    objectFit: "contain",
                                    width: "auto",
                                    height: "100px",
                                }}
                            />
                            <h5 className="text-lg font-semibold text-gray-800">
                                {partner.name}
                            </h5>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurPartners;
