import React from 'react';
import { Link } from '@inertiajs/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Text from '@/components/Typography/Text';

const AcademyAdvert = () => {
    return (
        <div className="bg-[var(--color-primary)] py-3 px-4 relative overflow-hidden group">
            {/* Animated Background Highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative z-10">
                <div className="flex items-center gap-3">
                    <Text as="p" size="base" weight="bold" className="text-white text-center md:text-left leading-tight">
                        "Data Science Isn't A Skill, It's A <span className="text-[var(--color-migenta)]">Superpower!</span>"
                    </Text>
                </div>

                <div className="h-4 w-px bg-white/20 hidden md:block"></div>

                <Link
                    href="/academy/skillsparks"
                    className="flex items-center gap-2 bg-white text-[var(--color-primary)] px-5 py-2 rounded-full text-sm font-bold hover:bg-[var(--color-migenta)] hover:text-white transition-all duration-300 shadow-xl active:scale-95 group/btn"
                >
                    Enroll for SkillSpark 3.0
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default AcademyAdvert;
