import React from 'react';

const About = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <section ref={ref} className="py-16 bg-white text-center">
            <h2 className="text-4xl sm:text-3xl font-extrabold mb-4">
                Hi, I&apos;m Abuzar Wahdatullah Sayyed
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-8">
                I&apos;m a web developer focused on building accessible, responsive, and
                performant websites. I enjoy turning ideas into real products — from
                simple landing pages to full-stack applications.
            </p>
        </section>
    );
});

About.displayName = 'About';

export default About;
