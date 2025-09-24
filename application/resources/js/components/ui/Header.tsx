import { ReactNode } from "react";
import Heading from "../Typography/Heading";
import Text from "../Typography/Text";
import StatisticsCard from "./StatisticsCard";

interface HeaderProps {
    heading?: string | ReactNode;
    subheading?: string | ReactNode;
    description?: string;
    className?: React.CSSProperties;
    containerClass?: string;
    headingClass?: string;
    subheadingClass?: string;
    descriptionClass?: string;
    children?: ReactNode;
    backgroundGradient?: string;
    textColor?: string;
    showStatistics?: boolean;
    statisticsClassName?: string;
    style?: React.CSSProperties;
}


export const Header = ({
    heading = '',
    subheading = '',
    description = '',
    className = {},
    containerClass = "container mx-auto px-4 sm:px-6 lg:px-8 text-center w-full",
    headingClass = "text-3xl sm:text-4xl md:text-5xl font-bold",
    subheadingClass = 'text-lg sm:text-xl mt-2',
    descriptionClass = "text-sm sm:text-base mt-2",
    children = null,
    backgroundGradient = "linear-gradient(90deg, #0a2540, #06659b)",
    textColor = "text-white",
    showStatistics = false,
    statisticsClassName = "mt-4 sm:mt-12 md:mt-4 lg:mt-2 px-4"
}: HeaderProps) => {
    const defaultStyles = {
        background: backgroundGradient,
        ...className
    };

    return (
        <section
            className={`relative hero pt-4 ${textColor}`}
            style={defaultStyles}
        >
            <div
                className={`${containerClass} ${showStatistics ? "" : "pb-8"}`}
            >
                <Heading
                    level={1}
                    size="3xl"
                    weight="bold"
                    className={headingClass}
                >
                    {heading}
                </Heading>

                {subheading && (
                    <Heading
                        level={2}
                        size="lg"
                        weight="semibold"
                        className={subheadingClass}
                    >
                        {subheading}
                    </Heading>
                )}

                {description && (
                    <Text
                        as="p"
                        size="lg"
                        weight="thin"
                        className={descriptionClass}
                    >
                        {description}
                    </Text>
                )}

                {children}
            </div>

            {showStatistics && (
                <div className={statisticsClassName}>
                    <StatisticsCard
                        variant="detailed"
                        stats={[
                            { title: "Students", value: "300+", icon: <i className="fas fa-user-graduate text-3xl text-[var(--color-primary)]" /> },
                            { title: "Data Science Tools", value: "8+", icon: <i className="fas fa-chart-pie text-3xl text-[var(--color-primary)]" /> },
                            { title: "Job Absorption", value: "80%", icon: <i className="fas fa-briefcase text-3xl text-[var(--color-primary)]" /> },
                            { title: "Business Support", value: "3+", icon: <i className="fa-solid fa-chart-line text-3xl text-[var(--color-primary)]" /> },
                        ]}
                    />
                </div>
            )}
        </section>

    );
};
