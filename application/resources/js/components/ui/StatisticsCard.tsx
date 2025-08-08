import Heading from "../Typography/Heading";
import Text from "../Typography/Text";
const StatisticsCard = () => {
    const statistics = [
        {
            icon: "fas fa-user-graduate",
            number: "300+",
            label: "Students"
        },
        {
            icon: "fas fa-chart-pie",
            number: "8+",
            label: "Data Science Tools"
        },
        {
            icon: "fas fa-briefcase",
            number: "80%",
            label: "Job Absorption"
        },
        {
            icon: "fa-solid fa-chart-line",
            number: "3+",
            label: "Business Support"
        }
    ];

    return (
        <section className="py-6 sm:py-10">
            <div className="container mx-auto px-4 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                    {statistics.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white hover:bg-[var(--color-migenta)] transition-colors duration-300 shadow-md hover:shadow-lg rounded-lg p-3 sm:p-6 text-center transform hover:scale-105"
                        >
                            <i className={`${stat.icon} text-2xl sm:text-4xl text-[var(--color-primary)] mb-2 sm:mb-4`} />
                            <Heading level={3} size="xl" weight="bold" className="text-gray-800">{stat.number}</Heading>
                            <Text as="p" size="sm" weight="medium" className="text-[var(--color-sigma-blue)]">{stat.label}</Text>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatisticsCard;
