"use client";

import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollReveal } from "@/components/ScrollReveal";

type Language = "de" | "en" | "vi";

interface LocationPageProps {
    lang: Language;
}

const content = {
    de: {
        title: "Anfahrt & Kontakt",
        subtitle: "So finden Sie zu uns",
        description: "Besuchen Sie uns im Herzen von München-Schwabing. Wir freuen uns auf Sie!",
        addressTitle: "Adresse",
        hoursTitle: "Öffnungszeiten",
        contactTitle: "Kontakt",
        weekdays: "Mo - Fr",
        saturday: "Sa",
        sunday: "So",
        holidays: "Feiertage",
        closed: "Geschlossen",
        getDirections: "Route planen",
        metaTitle: "Anfahrt & Kontakt | NGUYEN Vietnam Restaurant",
        metaDescription: "So finden Sie das Nguyen Vietnam Restaurant in München-Schwabing. Adresse, Öffnungszeiten und Kontaktinformationen."
    },
    en: {
        title: "Location & Contact",
        subtitle: "How to find us",
        description: "Visit us in the heart of Munich-Schwabing. We look forward to welcoming you!",
        addressTitle: "Address",
        hoursTitle: "Opening Hours",
        contactTitle: "Contact",
        weekdays: "Mon - Fri",
        saturday: "Sat",
        sunday: "Sun",
        holidays: "Holidays",
        closed: "Closed",
        getDirections: "Get Directions",
        metaTitle: "Location & Contact | NGUYEN Vietnam Restaurant",
        metaDescription: "How to find Nguyen Vietnam Restaurant in Munich-Schwabing. Address, opening hours, and contact information."
    },
    vi: {
        title: "Địa chỉ & Liên hệ",
        subtitle: "Đường đến nhà hàng",
        description: "Ghé thăm chúng tôi tại trung tâm Munich-Schwabing. Chúng tôi rất mong được đón tiếp quý khách!",
        addressTitle: "Địa chỉ",
        hoursTitle: "Giờ mở cửa",
        contactTitle: "Liên hệ",
        weekdays: "Thứ 2 - Thứ 6",
        saturday: "Thứ 7",
        sunday: "Chủ nhật",
        holidays: "Ngày lễ",
        closed: "Đóng cửa",
        getDirections: "Chỉ đường",
        metaTitle: "Địa chỉ & Liên hệ | NGUYEN Vietnam Restaurant",
        metaDescription: "Đường đến nhà hàng Nguyen Vietnam tại Munich-Schwabing. Địa chỉ, giờ mở cửa và thông tin liên hệ."
    }
};

export function LocationPage({ lang }: LocationPageProps) {
    const t = content[lang];

    return (
        <>
            <NavBar lang={lang} />
            <main className="flex min-h-screen flex-col bg-brand-light">
                {/* Hero Section */}
                <section className="relative flex items-center justify-center overflow-hidden py-20 px-6 bg-brand-dark text-white">
                    <div className="absolute inset-0 bg-brand-dark/90 z-0" />
                    <div className="absolute inset-0 bg-[url('/images/view-2.jpg')] bg-cover bg-center opacity-20 z-0" />

                    <ScrollReveal className="relative z-10 text-center max-w-4xl mx-auto pt-20">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                            {t.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light">
                            {t.subtitle}
                        </p>
                    </ScrollReveal>
                </section>

                <section className="py-20 px-6">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Info Column */}
                            <ScrollReveal className="space-y-12">
                                <div>
                                    <h2 className="text-2xl font-display font-bold text-brand-dark mb-6 border-b border-brand/20 pb-4">
                                        {t.addressTitle}
                                    </h2>
                                    <p className="text-lg text-brand-dark/80 leading-relaxed">
                                        <strong>NGUYEN Vietnam Restaurant</strong><br />
                                        Georgenstraße 67<br />
                                        80799 München<br />
                                        Deutschland
                                    </p>
                                    <div className="mt-6">
                                        <a
                                            href="https://www.google.com/maps/place/nguyen+restaurant+munich/data=!4m2!3m1!1s0x479e75c2bef9cda3:0x815ce024e30267be?sa=X&ved=1t:242&ictx=111"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary inline-flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {t.getDirections}
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-display font-bold text-brand-dark mb-6 border-b border-brand/20 pb-4">
                                        {t.hoursTitle}
                                    </h2>
                                    <div className="space-y-3 text-lg text-brand-dark/80">
                                        <div className="flex justify-between max-w-xs">
                                            <span>{t.weekdays}</span>
                                            <span className="font-medium">12:00 - 22:30</span>
                                        </div>
                                        <div className="flex justify-between max-w-xs">
                                            <span>{t.saturday}</span>
                                            <span className="font-medium">17:30 - 22:30</span>
                                        </div>
                                        <div className="flex justify-between max-w-xs">
                                            <span>{t.sunday}</span>
                                            <span className="font-medium">12:00 - 22:30</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-display font-bold text-brand-dark mb-6 border-b border-brand/20 pb-4">
                                        {t.contactTitle}
                                    </h2>
                                    <div className="space-y-3 text-lg text-brand-dark/80">
                                        <p>
                                            <a href="tel:+498928803451" className="hover:text-brand transition-colors">
                                                +49 89 28803451
                                            </a>
                                        </p>
                                        <p>
                                            <a href="mailto:info@nguyenrestaurant.de" className="hover:text-brand transition-colors">
                                                info@nguyenrestaurant.de
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Map Column */}
                            <ScrollReveal className="h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden shadow-xl border border-brand/10">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.357963576436!2d11.57862507691854!3d48.16000355037596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75c2bef9cda3%3A0x815ce024e30267be!2sNguyen%20Vietnam%20Restaurant!5e0!3m2!1sen!2sde!4v1701354000000!5m2!1sen!2sde"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: '100%' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Nguyen Restaurant Google Maps"
                                />
                            </ScrollReveal>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
