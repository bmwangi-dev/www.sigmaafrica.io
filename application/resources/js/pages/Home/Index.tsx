import Heading from "@/components/Typography/Heading";
import Text from "@/components/Typography/Text";
import { Head } from "@inertiajs/react";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
export default function Index() {
    return (
        <UnauthenticatedLayout>
            <Head title="Home" />
            <section className="flex flex-col justify-center items-center text-center px-4 bg-[var(--color-background)] text-[var(--color-content)]">
                <Heading level={1} size="4xl" weight="bold" className="mt-6 text-[var(--color-migenta)]">
                    Welcome to Sigma Africa
                </Heading>
                <Text as="p" size="lg" weight="normal" className="mt-4 max-w-xl">
                    Empowering Africa’s next generation through technology, education, and innovation.
                </Text>
            </section>
        </UnauthenticatedLayout>

    );
}
