import React, { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface NewsletterContent {
    tagline: string;
    headline: string;
    description: string;
    placeholder: string;
    buttonText: string;
    buttonLoading: string;
    buttonSuccess: string;
    successMessage: string;
}

const defaultContent: NewsletterContent = {
    tagline: "Exklusive Updates",
    headline: "Bleiben Sie auf dem Laufenden",
    description: "Abonnieren Sie unseren Newsletter für saisonale Highlights, besondere Events und kulinarische Neuigkeiten aus unserer Küche.",
    placeholder: "Ihre E-Mail-Adresse",
    buttonText: "Anmelden",
    buttonLoading: "Senden...",
    buttonSuccess: "Angemeldet!",
    successMessage: "Vielen Dank für Ihre Anmeldung!"
};

export function NewsletterSection({ content = defaultContent }: { content?: NewsletterContent }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    return (
        <section id="newsletter" className="relative py-20 px-6 bg-brand-light overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <ScrollReveal>
                    <div className="space-y-2 mb-8">
                        <span className="text-xs uppercase tracking-[0.2em] text-brand/70 font-semibold">
                            {content.tagline}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">
                            {content.headline}
                        </h2>
                        <p className="text-brand-dark/70 max-w-xl mx-auto mt-4">
                            {content.description}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                required
                                placeholder={content.placeholder}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-6 py-3 rounded-full bg-white border border-brand/10 text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${status === "success"
                                    ? "bg-brand text-white cursor-default"
                                    : "bg-brand text-white hover:bg-brand-dark hover:shadow-lg"
                                    }`}
                            >
                                {status === "loading" ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        {content.buttonLoading}
                                    </span>
                                ) : status === "success" ? (
                                    content.buttonSuccess
                                ) : (
                                    content.buttonText
                                )}
                            </button>
                        </div>
                        {status === "success" && (
                            <p className="absolute -bottom-8 left-0 w-full text-sm text-brand font-medium animate-fade-in">
                                {content.successMessage}
                            </p>
                        )}
                    </form>
                </ScrollReveal>
            </div>
        </section>
    );
}
