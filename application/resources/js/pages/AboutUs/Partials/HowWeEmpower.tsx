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
        <section className="text-content px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <Heading
                        level={2}
                        size="3xl"
                        weight="bold"
                        className="bg-[var(--color-migenta)] text-white py-4 px-8 rounded-lg mb-12 text-center max-w-2xl mx-auto md:text-4xl leading-tight"
                    >
                        {bigTitle}
                    </Heading>
                    <HowWeEmpowerList />
                </div>

                <div className="flex justify-center items-center relative w-full max-w-sm mx-auto md:max-w-none">
                    <div
                        className="bg-transparent border-2 border-[var(--color-migenta)] absolute -left-4 top-4 md:-left-8 md:top-6"
                        style={{
                            borderRadius: "3rem 6rem 4rem 4rem",
                            padding: "4px",
                            width: "100%",
                            height: "100%",
                            zIndex: 0,
                        }}
                    ></div>

                    <div
                        className="overflow-hidden border-2 border-white relative w-full aspect-[4/3] md:aspect-auto"
                        style={{
                            borderRadius: "3rem 6rem 4rem 4rem",
                            zIndex: 2,
                        }}
                    >
                        <img
                            src={imageSrc}
                            alt="How We Empower"
                            className="block w-full h-full object-cover rounded-none"
                        />
                    </div>
                </div>


            </div>

        </section>
    );
};

export default HowWeEmpower;
