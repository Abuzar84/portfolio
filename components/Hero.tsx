import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MyLogo from '../app/AS.webp'; // Adjusted path
import { projects } from '../app/data/portfolio';

const Hero = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <section ref={ref} className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-16 text-center">
            <h2 className="text-4xl sm:text-3xl font-extrabold mb-4">
                Welcome to My Portfolio
            </h2>
            <h3 className="text-3xl sm:text-2xl font-extrabold mb-8">Website Themes</h3>
            <div className="flex justify-center items-center gap-8 flex-wrap max-w-4xl mx-auto">
                {projects.map((project) => (
                    <div key={project.id} className="flex flex-col items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                        <Link href={project.link}>
                            <Image
                                src={project.image}
                                alt={`${project.title} thumbnail`}
                                title={`My ${project.title}`}
                                className="w-64 h-40 object-cover"
                                width={256}
                                height={160}
                            />
                        </Link>
                        <p className="py-2 text-gray-700">{project.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;
