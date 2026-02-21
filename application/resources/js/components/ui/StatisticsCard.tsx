import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "../Typography/Heading";
import Text from "../Typography/Text";

interface StatItem {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
}

interface StatisticsCardProps {
    stats: StatItem[];
    variant?: "simple" | "detailed";
    gridCols?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
    stats,
    variant = "simple",
    gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
}) => {
    return (
        <section className="py-6 sm:py-10">
            <div className="container mx-auto px-4 w-full">
                <div className={`grid ${gridCols} gap-4 sm:gap-6`}>
                    {stats.map((stat, idx) => {
                        if (variant === "detailed") {
                            return (
                                <div
                                    key={idx}
                                    className="bg-white hover:bg-[var(--color-migenta)] transition-colors duration-300 shadow-md hover:shadow-lg rounded-lg p-4 sm:p-6 text-center transform hover:scale-105"
                                >
                                    {stat.icon && <div className="text-3xl mb-3">{stat.icon}</div>}
                                    <Heading level={3} size="xl" weight="bold" className="text-gray-800">
                                        {stat.value}
                                    </Heading>
                                    <Text as="p" size="sm" weight="medium" className="text-[var(--color-sigma-blue)]">
                                        {stat.title}
                                    </Text>
                                </div>
                            );
                        }

                        return (
                            <Card
                                key={idx}
                                className="bg-white shadow-md rounded-xl border border-gray-100 p-4 text-center hover:bg-[var(--color-migenta)] hover:shadow-lg transition-transform transform hover:scale-105"
                            >
                                <CardHeader className="pb-2">
                                    <Text size="sm" weight="semibold" className="text-[var(--color-sigma-blue)]">
                                        {stat.title}
                                    </Text>
                                </CardHeader>
                                <CardContent>
                                    <Heading level={2} size="3xl" weight="bold" className="text-[var(--color-primary)]">
                                        {stat.value}
                                    </Heading>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatisticsCard;
