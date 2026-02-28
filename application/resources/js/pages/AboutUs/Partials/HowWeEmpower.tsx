import React from "react";
import Text from "@/components/Typography/Text";
import Heading from "@/components/Typography/Heading";
import HowWeEmpowerList from "./HowWeEmpowerList";

interface HowWeEmpowerProps {
    imageSrc: string;
    bigTitle: string;
}

const HowWeEmpower: React.FC<HowWeEmpowerProps> = ({
    imageSrc, bigTitle,
}) => {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <Heading
                            level={2}
                            size="4xl"
                            weight="bold"
                            className="text-[var(--color-sigma-blue)] mb-8 leading-tight"
                        >
                            {bigTitle}
                        </Heading>
                        <HowWeEmpowerList />
                    </div>

                    <div className="relative">
                        <div className="overflow-hidden rounded-2xl shadow-xl">
                            <img loading="lazy"
                                src={imageSrc}
                                alt="Empowering Data-Driven Growth"
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-[var(--color-migenta)] rounded-2xl -z-10 opacity-20 transform -rotate-12"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowWeEmpower;
