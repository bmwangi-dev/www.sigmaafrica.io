import React from "react";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";

interface AboutSectionProps {
    imageSrc: string;
    smallTitle: string;
    bigTitle: string;
    description: string;
    paragraph: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
    imageSrc, smallTitle, bigTitle, description, paragraph,
}) => {
    return (
        <section className="text-content px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">

                <div className="relative">
                    <div
                        className="bg-transparent border-2 border-[var(--color-migenta)] absolute -left-8 top-6"
                        style={{
                            borderRadius: "4rem 10rem 6rem 6rem",
                            padding: "4px",
                            width: "100%",
                            height: "100%",
                            zIndex: 0,
                        }}
                    ></div>
                    <div
                        className="overflow-hidden border-2 border-white relative"
                        style={{
                            borderRadius: "4rem 10rem 6rem 6rem",
                            zIndex: 2,
                        }}
                    >
                        <img
                            src={imageSrc}
                            alt="About Section"
                            className="block w-full object-cover rounded-none"
                        />
                    </div>
                </div>

                <div>
                    <Text as="p" size="xl" weight="semibold" className="text-[var(--color-migenta)] mb-2">{smallTitle}</Text>
                    <Heading level={1} size="3xl" weight="bold" className="md:text-4xl leading-tight mb-4">{bigTitle}</Heading>
                    <Text as="p" size="base" weight="normal" className="text-content mb-4">{description}</Text>
                    <Text as="p" size="base" weight="normal" className="text-content">{paragraph}</Text>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
