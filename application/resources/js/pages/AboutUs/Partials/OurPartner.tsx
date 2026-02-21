import React from "react";
import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";

const partners = [
    { name: "JKUAT", logo: "/jkuat.png" },
    { name: "Technical University of Kenya", logo: "/tuk.png" },
    { name: "University Of Nairobi", logo: "/university-of-nairobi.webp" },
    { name: "Sinapis Group", logo: "/sinapis.png" },
];

const OurPartners: React.FC = () => {
    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto text-center px-6">
                <div className="bg-[var(--color-migenta)] py-4 px-8 rounded-lg mb-12 max-w-2xl mx-auto shadow-md">
                    <Heading level={2} size="3xl" weight="bold" className="text-white text-center">
                        Our Partners
                    </Heading>
                </div>
                <Text size="lg" className="text-gray-600 mb-10">
                    Collaborating for a brighter future.
                </Text>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                            <Heading level={5} size="lg" weight="semibold" className="text-gray-800">
                                {partner.name}
                            </Heading>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurPartners;
