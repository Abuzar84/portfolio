import { useState } from "react";

export default function  Contactform() {
    // Form state
    const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; msg: string }>({
        type: "idle",
        msg: "",
    });
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus({ type: "loading", msg: "Sending…" });
        const form = e.currentTarget;
        const data = {
        uname: (form.username as HTMLInputElement).value.trim(),
        email: (form.email as HTMLInputElement).value.trim(),
        message: (form.message as HTMLTextAreaElement).value.trim(),
    };
    try {
        const res = await fetch("/api/contact/hoteltheme", {
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
    return(
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
                type="text"
                name="username"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
                placeholder="Your name"
            />
            </div>
            <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
                    placeholder="Your email"
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
                  placeholder="Your message"
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
                Send Message
            </button>
            <span>
                {status.msg}
            </span>
        </form>
    );
}