import { useState } from "react";

export default function Bookingform(){
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
        checkin: (form.checkin as HTMLInputElement).value.trim(),
        checkout: (form.checkout as HTMLInputElement).value.trim(),
        guestnum: (form.guestnum as HTMLInputElement).value.trim(),
    };
    try {
        const res = await fetch("/api/contact/hoteltheme/booking", {
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
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date
            </label>
            <input
              type="date"
              name="checkin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="checkout" className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date
            </label>
            <input
              type="date"
              name="checkout"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Guests
            </label>
            <input
              type="number"
              name="guestnum"
              min={1}
              defaultValue={1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={status.type === "loading"}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors cursor-pointer"
            >
              Book Now
            </button>
            <div className="w-full text-center">
                {status.type !== "idle" && status.type !== "loading" && (
                    <p
                        className={`mt-2 ${status.type === "success" ? "text-green-600" : "text-red-600"}`}
                    >
                        {status.msg}
                    </p>
                )}
            </div>
          </div>
        </form>
    )
}