import React, { useState } from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { socialLinks } from '../app/data/portfolio';

const Contact = React.forwardRef<HTMLDivElement>((props, ref) => {
    const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; msg: string }>({
        type: "idle",
        msg: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus({ type: "loading", msg: "Sending…" });

        const form = e.currentTarget;
        const data = {
            email: (form.email as HTMLInputElement).value.trim(),
            message: (form.message as HTMLTextAreaElement).value.trim(),
        };

        try {
            const res = await fetch("/api/contact/portfolio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (res.ok) {
                setStatus({ type: "success", msg: "Thanks! I'll get back soon." });
                form.reset();
            } else {
                setStatus({ type: "error", msg: json.error ?? "Something went wrong" });
            }
        } catch (err) {
            setStatus({ type: "error", msg: `Network error – try again later ${err}` });
        }
    };

    return (
        <section ref={ref} className="py-16 bg-gradient-to-b from-gray-100 to-gray-200 text-center">
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mb-6">
                <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full p-3 rounded border border-gray-300 focus:border-blue-600 outline-none"
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={5}
                    className="w-full p-3 rounded border border-gray-300 focus:border-blue-600 outline-none resize-none"
                />
                <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:opacity-70 transition cursor-pointer"
                >
                    {status.type === "loading" ? "Sending…" : "Send Message"}
                </button>

                {status.type !== "idle" && status.type !== "loading" && (
                    <p
                        className={`mt-2 ${status.type === "success" ? "text-green-600" : "text-red-600"}`}
                    >
                        {status.msg}
                    </p>
                )}
            </form>

            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600">
                {socialLinks.map((link) => (
                    <a key={link.id} href={link.link} aria-label={link.name} className={link.className || "hover:text-black"}>
                        {link.image ? (
                            <Image src={link.image} alt={`${link.name} Logo`} width={link.width} />
                        ) : (
                            <Mail className="text-white" />
                        )}
                    </a>
                ))}
            </div>
        </section>
    );
});

Contact.displayName = 'Contact';

export default Contact;
