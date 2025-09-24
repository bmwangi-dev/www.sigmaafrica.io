import { ReactElement } from "react";
import Text from "@/components/Typography/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faLock, faLaptopCode } from "@fortawesome/free-solid-svg-icons";

const services = [
    {
        icon: <FontAwesomeIcon icon={faChartLine} />,
        title: "Data Analytics & Insights",
        description:
            "We deliver actionable insights by transforming data into meaningful visualizations, dashboards, and reports."
    },
    {
        icon: <FontAwesomeIcon icon={faLaptopCode} />,
        title: "Machine Learning & AI Solutions",
        description:
            "Implementing models that enable predictive intelligence to optimize operations and drive competitive advantage."
    },
    {
        icon: "📈",
        title: "Business Intelligence & Strategy",
        description:
            "Partnering with organisations to align data strategy with business goals, improve decision-making and stimulate growth."
    },
    {
        icon: "🖥️",
        title: "Software Engineering & Platform Development",
        description:
            "Building robust, scalable platforms and data pipelines to support real-time and batch workflows."
    },
    {
        icon: <FontAwesomeIcon icon={faLock} />,
        title: "Data Governance & Security",
        description:
            "Ensuring data privacy, compliance, and protection through strong governance, policies, and secure architectures."
    }
];

function HowWeEmpowerList(): ReactElement {
    return (
        <div className="space-y-4">
            {services.map((s, idx) => (
                <div key={idx} className="flex items-start space-x-2 border-b pb-2">
                    <div className="text-2xl text-[var(--color-migenta)]">
                        {s.icon}
                    </div>

                    <div>
                        <Text as="p" size="xl" weight="semibold" className="mb-1">
                            {s.title}
                        </Text>
                        <Text as="p" size="base" weight="normal" className="text-content">
                            {s.description}
                        </Text>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HowWeEmpowerList;
