import { ReactNode } from "react";
import Heading from "../Typography/Heading";
import Text from "../Typography/Text";
import StatisticsCard from "./StatisticsCard";

interface HeaderProps {
    heading?: string | ReactNode;
    subheading?: string;
    description?: string;
    className?: React.CSSProperties;
    containerClass?: string;
    headingClass?: string;
    subheadingClass?: string;
    descriptionClass?: string;
    children?: ReactNode;
    backgroundGradient?: string;
    textColor?: string;
}

export const Header = ({
    heading = "Your Heading Here",
    subheading = '',
    description = '',
    className = {},
    containerClass = "container mx-auto px-4 sm:px-6 lg:px-8 text-center w-full",
    headingClass = "text-3xl sm:text-4xl md:text-5xl font-bold",
    subheadingClass = 'text-lg sm:text-xl mt-2',
    descriptionClass = "text-sm sm:text-base mt-2",
    children = null,
    backgroundGradient = "linear-gradient(90deg, #0a2540, #06659b)",
    textColor = "text-white"
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
            <div className={containerClass}>
                <Heading level={1} size="3xl" weight="bold" className={headingClass}>
                    {heading}
                </Heading>

                {subheading && (
                    <Heading level={2} size="lg" weight="semibold" className={subheadingClass}>
                        {subheading}
                    </Heading>
                )}

                {description && (
                    <Text as="p" size="lg" weight="thin" className={descriptionClass}>
                        {description}
                    </Text>
                )}

                {children}
            </div>

            <div className="mt-4 sm:mt-12 md:mt-4 lg:mt-2 px-4">
                <StatisticsCard />
            </div>
        </section>
    );
};
