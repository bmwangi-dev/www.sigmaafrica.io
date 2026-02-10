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
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    <div className="relative">
                        <div className="overflow-hidden rounded-2xl shadow-xl">
                            <img
                                src={imageSrc}
                                alt="About Sigma Africa"
                                className="w-full h-[400px] object-cover"
                            />
                        </div>
                        {/* Decorative element consistent with other pages */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[var(--color-migenta)] rounded-2xl -z-10 opacity-20 transform rotate-12"></div>
                    </div>

                    <div>
                        <Text as="p" size="xl" weight="semibold" className="text-[var(--color-migenta)] mb-2">
                            {smallTitle}
                        </Text>
                        <Heading level={2} size="4xl" weight="bold" className="text-[var(--color-sigma-blue)] mb-6 leading-tight">
                            {bigTitle}
                        </Heading>
                        <div className="space-y-4">
                            <Text as="p" size="lg" weight="medium" className="text-gray-700 leading-relaxed">
                                {description}
                            </Text>
                            <Text as="p" size="base" weight="normal" className="text-gray-600 leading-relaxed">
                                {paragraph}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
