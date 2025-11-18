import { Calendar } from "lucide-react"
import { useState } from "react";

export default function Hotellandingbookingform(){
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
        const res = await fetch("/api/contact/hotellandingpage", {
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
        <form className="bg-white p-8 rounded-2xl shadow-xl" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="checkin" className="block text-left mb-2 font-medium">Check-in Date</label>
              <div className="relative">
                <input type="date" name="checkin" id="checkin" className="w-full p-3 pr-10 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="checkout" className="block text-left mb-2 font-medium">Check-out Date</label>
              <div className="relative">
                <input type="date" name="checkout" id="checkout" className="w-full p-3 pr-10 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="guests" className="block text-left mb-2 font-medium">Number of Guests</label>
            <select name="guestnum" id="guests" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
              <option>5+ Guests</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Check Availability
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
        </form>
    )
}