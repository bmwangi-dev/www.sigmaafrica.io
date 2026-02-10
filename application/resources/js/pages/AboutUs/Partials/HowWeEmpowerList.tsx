import { ReactElement } from "react";
import Text from "@/components/Typography/Text";
import { BarChart3, TrendingUp, Cpu, Layout, ShieldCheck } from 'lucide-react';

const services = [
    {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Data Analytics & Insights",
        description:
            "We deliver actionable insights by transforming data into meaningful visualizations, dashboards, and reports."
    },
    {
        icon: <Cpu className="w-6 h-6" />,
        title: "Machine Learning & AI Solutions",
        description:
            "Implementing models that enable predictive intelligence to optimize operations and drive competitive advantage."
    },
    {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Business Intelligence & Strategy",
        description:
            "Partnering with organisations to align data strategy with business goals, improve decision-making and stimulate growth."
    },
    {
        icon: <Layout className="w-6 h-6" />,
        title: "Software Engineering & Platform Development",
        description:
            "Building robust, scalable platforms and data pipelines to support real-time and batch workflows."
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: "Data Governance & Security",
        description:
            "Ensuring data privacy, compliance, and protection through strong governance, policies, and secure architectures."
    }
];

function HowWeEmpowerList(): ReactElement {
    return (
        <div className="space-y-6">
            {services.map((s, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                    <div className="p-3 rounded-lg bg-[var(--color-primary-note)] text-[var(--color-migenta)] group-hover:bg-[var(--color-migenta)] group-hover:text-white transition-colors duration-300">
                        {s.icon}
                    </div>

                    <div>
                        <Text as="p" size="lg" weight="semibold" className="text-[var(--color-sigma-blue)] mb-1">
                            {s.title}
                        </Text>
                        <Text as="p" size="base" weight="normal" className="text-gray-600 leading-relaxed">
                            {s.description}
                        </Text>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HowWeEmpowerList;
