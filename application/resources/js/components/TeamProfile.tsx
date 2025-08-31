import React from 'react';
import { SocialIcon } from '@/components/ui/SocialIcons';
import type { TeamData } from '../types/Team';


interface TeamProfileProps {
    member: TeamData;
    className?: string;
    animationDelay?: number;
}

const TeamProfile: React.FC<TeamProfileProps> = ({
    member,
    className = '',
    animationDelay = 0
}) => {
    const defaultImage = '/images/team/default-avatar.jpg';

    return (
        <div
            className={`team-card fade-in bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${className}`}
            style={{ animationDelay: `${animationDelay}s` }}
        >
            <div className="relative mb-4">
                <img
                    src={member.image_path || defaultImage}
                    alt={member.name}
                    className="mx-auto rounded-full w-32 h-32 object-cover border-4 border-gray-200 hover:border-[var(--color-migenta)] transition-colors duration-300"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = defaultImage;
                    }}
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[var(--color-migenta)] text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {member.department}
                    </span>
                </div>
            </div>

            <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                </h3>

                {member.position && (
                    <p className="text-gray-600 font-medium mb-2">
                        {member.position}
                    </p>
                )}
                {member.socials && member.socials.length > 0 && (
                    <div className="flex justify-center space-x-3 text-lg">
                        {member.socials
                            .filter((social) => social.type.toLowerCase() === "linkedin")
                            .map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-[var(--color-migenta)] transition-colors duration-200 transform hover:scale-110"
                                >
                                    <SocialIcon type={social.type} />
                                </a>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamProfile;
