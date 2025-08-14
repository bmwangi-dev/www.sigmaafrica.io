import React, { useRef, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import TestimonialVideo from '../../../public/testimonial1.mp4';

interface Testimonial {
    video: string;
    quote: string;
    title: string;
    name: string;
    role: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        video: '/images/testimonial1.mp4',
        quote:
            'Your courses have positively impacted me. I finally solved the problem of developing dashboards using PowerBI after advanced Excel classes.',
        title: 'Positive Impact',
        name: 'Nelly Kamau',
        role: 'Alumni',
        image: '/images/header/student.png',
    },
    {
        video: '/images/testimonial1.mp4',
        quote:
            "Today's online class was amazing. Concepts were well explained, and the instructor was patient with our problems.",
        title: 'Concepts Well Explained',
        name: 'Marion Jepchumba',
        role: 'Alumni',
        image: '/images/header/student.png',
    },
    {
        video: '/images/testimonial1.mp4',
        quote:
            'The topics are well explained, and the pace is fine. Thank you, team instructors.',
        title: 'Topics Well Explained',
        name: 'Peter Machira',
        role: 'Alumni',
        image: '/images/header/student.png',
    },
];

const Testimonials: React.FC = () => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderInstanceRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1 },
        mode: 'snap',
        drag: false,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
    });

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <Heading
                    level={2}
                    size="4xl"
                    weight="bold"
                    className="text-center mb-10 text-[var(--color-sigma-blue)]"
                >
                    What <span className="text-[var(--color-migenta)]">They</span> Say
                </Heading>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="w-full h-full">
                        <video
                            className="w-full h-full object-cover rounded-2xl"
                            controls
                        >
                            <source src={TestimonialVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div className="relative">
                        <div className="relative overflow-hidden">
                            <button
                                onClick={() => instanceRef.current?.prev()}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[var(--color-accent)] hover:bg-[var(--color-migenta)] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                                aria-label="Previous testimonial"
                            >
                                <i className="fas fa-chevron-left text-sm group-hover:text-white"></i>
                            </button>

                            <button
                                onClick={() => instanceRef.current?.next()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[var(--color-accent)] hover:bg-[var(--color-migenta)] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                                aria-label="Next testimonial"
                            >
                                <i className="fas fa-chevron-right text-sm group-hover:text-white"></i>
                            </button>

                            <div ref={sliderInstanceRef} className="keen-slider">
                                {testimonials.map((testimonial, index) => (
                                    <div className="keen-slider__slide px-6" key={index}>
                                        <div className="bg-white shadow-lg hover:shadow-xl rounded-2xl p-8 h-full transition-shadow duration-300 border border-gray-100">
                                            <div className="mb-4">
                                                <i className="fas fa-quote-left text-3xl text-[var(--color-primary)] opacity-80"></i>
                                            </div>

                                            <Heading
                                                level={5}
                                                size="xl"
                                                weight="bold"
                                                className="mb-3 text-gray-800"
                                            >
                                                {testimonial.title}
                                            </Heading>

                                            <Text
                                                size="base"
                                                className="mb-6 text-gray-600 leading-relaxed italic"
                                            >
                                                "{testimonial.quote}"
                                            </Text>

                                            <div className="flex items-center pt-4 border-t border-gray-100">
                                                <div className="relative">
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&color=fff&size=128&bold=true`}
                                                        alt={testimonial.name}
                                                        className="w-14 h-14 rounded-full mr-4 border-2 border-[var(--color-primary)] object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <Text weight="bold" className="text-gray-800 text-lg">
                                                        {testimonial.name}
                                                    </Text>
                                                    <Text size="sm" className="text-[var(--color-primary)] font-medium">
                                                        {testimonial.role}
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center mt-6 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => instanceRef.current?.moveToIdx(index)}
                                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSlide === index
                                        ? 'bg-[var(--color-primary)] scale-110'
                                        : 'bg-gray-300 hover:bg-[var(--color-primary)]'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
