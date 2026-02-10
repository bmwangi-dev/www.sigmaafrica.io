import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";
import Link from "@/components/Typography/Link";

const FutureSection: React.FC = () => {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="p-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-sigma-blue)] text-white rounded-3xl shadow-2xl relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="text-center lg:text-left max-w-2xl">
                            <Heading level={2} size="4xl" weight="bold" className="text-white mb-6">
                                Be Part Of The <span className="text-[var(--color-migenta)]">Future</span>
                            </Heading>

                            <Heading level={3} size="2xl" weight="semibold" className="text-gray-200 mb-8">
                                Take The Next Step In Your{" "}
                                <span className="text-[var(--color-migenta)]">Data Science</span> Journey!
                            </Heading>

                            <Text size="lg" className="text-gray-300 leading-relaxed mb-0">
                                Sigma Africa is more than a community—It's a movement shaping
                                Africa's data science landscape. Join us today.
                            </Text>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                            <Link href="/community" className="bg-[var(--color-migenta)] hover:bg-[var(--color-migenta)]/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl text-center">
                                Become A Member
                            </Link>

                            <Link href="/academy" className="bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white font-bold py-4 px-8 rounded-xl transition-all text-center">
                                Join Our Academy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FutureSection;
