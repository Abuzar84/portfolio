import React from 'react';
import Image from 'next/image';
import { skills } from '../app/data/portfolio';

const Skills = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <section ref={ref} className="py-16 bg-gray-50 text-center">
            <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
            <div className="flex justify-center items-center flex-wrap gap-5 max-w-4xl mx-auto">
                {skills.map((skill) => (
                    <div key={skill.id} className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                        {skill.image ? (
                            <Image
                                src={skill.image}
                                alt={`${skill.name} Logo`}
                                width={skill.width}
                                height={skill.height}
                                className={skill.className}
                            />
                        ) : (
                            <span className={skill.className}>{skill.icon}</span>
                        )}
                        <span className="text-sm font-semibold">{skill.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
});

Skills.displayName = 'Skills';

export default Skills;
