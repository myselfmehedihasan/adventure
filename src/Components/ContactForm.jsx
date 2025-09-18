import { div } from "motion/react-client";
import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://formcarry.com/s/XXXXXXX", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await res.json();

      if (data.code === 200) {
        setSubmitted(true);
        setEmail("");
        setMessage("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  if (submitted) {
    return (
      <div className="p-6 bg-green-100 text-green-800 rounded-lg text-center">
        ✅ We've received your message, thank you for contacting us!
      </div>
    );
  }

  return (
    <div className="my-15">
      <div className="text-center">
        <h1 className="text-4xl font-bold  mb-5">
        If you need, Just drop us a line
      </h1>
      <p className="text-black/50">Who are in extremely love with eco friendly system.</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white  rounded-xl shadow-lg space-y-4"
      >
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none  dark:text-white"
            placeholder="Your email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="mb-2 font-medium">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-32  dark:text-white"
            placeholder="Your message"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
