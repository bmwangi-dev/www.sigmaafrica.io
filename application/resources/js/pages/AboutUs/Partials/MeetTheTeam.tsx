import React from 'react';
import TeamProfile from '../../../components/TeamProfile';
import '../MeetTheTeam.css';
import type { TeamData } from '../../../types/Team';

interface MeetTheTeamProps {
    teams?: TeamData[];
}

const MeetTheTeam: React.FC<MeetTheTeamProps> = ({ teams = [] }) => (
    <section className="meet-team py-16 px-6 text-center">
        <div className="max-w-7xl mx-auto">
            <h6 className="text-sm text-[var(--color-migenta)] uppercase mb-2 tracking-wide">The Professionals</h6>
            <h2 className="text-4xl font-bold mb-4 text-[var(--color-content)]">Meet The Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
                Our team at Sigma Africa is composed of passionate data scientists, engineers, and industry experts
                dedicated to driving Africa's digital transformation through innovative analytics and data-driven solutions.
            </p>

            {teams.length > 0 ? (
                <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {teams.map((member, idx) => (
                        <TeamProfile
                            key={member.id}
                            member={member}
                            animationDelay={idx * 0.1}
                            className="transform hover:-translate-y-2"
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Team Members Yet</h3>
                        <p className="text-gray-500 text-sm">
                            Team members will appear here once they are added to the database.
                        </p>
                    </div>
                </div>
            )}
        </div>
    </section>
);

export default MeetTheTeam;
