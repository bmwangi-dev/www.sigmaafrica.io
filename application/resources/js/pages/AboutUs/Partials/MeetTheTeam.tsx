import React from 'react';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';
import TeamProfile from '../../../components/TeamProfile';
import type { TeamData } from '../../../types/Team';

interface MeetTheTeamProps {
    teams?: TeamData[];
}

const MeetTheTeam: React.FC<MeetTheTeamProps> = ({ teams = [] }) => (
    <section className="py-16 px-4">
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <Text as="p" size="sm" weight="semibold" className="text-[var(--color-migenta)] uppercase tracking-widest mb-3">
                    The Professionals
                </Text>
                <Heading level={2} size="4xl" weight="bold" className="text-[var(--color-sigma-blue)] mb-6">
                    Meet Our Expert Team
                </Heading>
                <Text as="p" size="lg" className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Our team at Sigma Africa is composed of passionate data scientists, engineers, and industry experts
                    dedicated to driving Africa's digital transformation.
                </Text>
            </div>

            {teams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {teams.map((member, idx) => (
                        <TeamProfile
                            key={member.id}
                            member={member}
                            animationDelay={idx * 0.1}
                            className="transform hover:-translate-y-2 transition-transform duration-300"
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <Heading level={3} size="xl" weight="bold" className="text-gray-700 mb-2">No Team Members Yet</Heading>
                        <Text as="p" size="sm" className="text-gray-500">
                            Team members will appear here once they are added to the database.
                        </Text>
                    </div>
                </div>
            )}
        </div>
    </section>
);

export default MeetTheTeam;
