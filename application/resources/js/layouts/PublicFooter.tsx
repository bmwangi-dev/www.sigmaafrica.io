import { Mail, Phone, Globe } from 'lucide-react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import PrimaryButton from '@/components/Typography/PrimaryButton';

export default function PublicFooter() {
    return (
        <footer className="bg-[var(--color-primary)] text-white py-4 text-sm px-4 md:px-4 rounded-t-3xl">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div>
                        <Heading level={2} size="xl" weight="bold" className="mb-2">
                            Sigma <Text as="span" size="xl" weight="bold" className="text-[var(--color-migenta)]">Africa</Text> Accelerate
                        </Heading>
                        <Text as="p" size="sm" weight="normal">
                            A Nairobi-based data analysis company specializing in data science,
                            consultancy, research, and web development.
                        </Text>
                    </div>

                    <div className="hidden md:block">
                        <Heading level={3} size="xl" weight="bold" className="font-bold text-base mb-2">Latest News</Heading>
                        <Text as="p" size="sm" weight="normal" className="mb-4">Subscribe to get the latest news delivered to your inbox.</Text>
                        <form className="flex flex-col sm:flex-row items-stretch gap-2 bg-[var(--color-secondary)] p-2 rounded-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                aria-label="Email"
                                className="px-3 text-[var(--color-content)] sm:w-auto flex-grow"
                            />
                            <PrimaryButton type="submit" className="bg-[var(--color-content)]">
                                Subscribe
                            </PrimaryButton>
                        </form>
                    </div>

                    <div>
                        <Heading level={3} size="xl" weight="bold" className="font-bold text-base mb-2">Contact Us</Heading>
                        <div className="space-y-2">
                            <Text as="p" size="sm" weight="normal" className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[var(--color-migenta)]" /> +254746910922
                            </Text>
                            <Text as="p" size="sm" weight="normal" className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[var(--color-migenta)]" /> sigmanalytics09@gmail.com
                            </Text>
                            <Text as="p" size="sm" weight="normal" className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-[var(--color-migenta)]" /> www.sigma.io
                            </Text>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <Heading level={3} size="xl" weight="bold" className="font-bold text-base mb-2">Useful Links</Heading>
                        <ul className="space-y-1">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/about.html" className="hover:underline">About Us</a></li>
                            <li><a href="/community.html" className="hover:underline">Community</a></li>
                            <li><a href="/blogs.html" className="hover:underline">Blogs</a></li>
                            <li><a href="/contact.html" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <Heading level={3} size="xl" weight="bold" className="font-bold text-base mb-2">Our Services</Heading>
                        <ul className="space-y-1">
                            <li><a href="/datascience.html" className="hover:underline">Data Science</a></li>
                            <li><a href="#" className="hover:underline">Academic & Market Research</a></li>
                            <li><a href="#" className="hover:underline">Business Consultancy</a></li>
                            <li><a href="#" className="hover:underline">Software Development</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-5 text-center text-xs">
                &copy;2025 Sigma <span className="text-[var(--color-migenta)]">Africa</span> Accelerate
            </div>
        </footer>
    );
}
