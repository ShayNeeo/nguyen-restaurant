import { LocationPage } from "@/components/LocationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Anfahrt & Kontakt | NGUYEN Vietnam Restaurant",
    description: "So finden Sie das Nguyen Vietnam Restaurant in München-Schwabing. Adresse, Öffnungszeiten und Kontaktinformationen.",
    alternates: {
        canonical: "https://nguyenrestaurant.de/location",
        languages: {
            "de-DE": "https://nguyenrestaurant.de/location",
            en: "https://nguyenrestaurant.de/en/location",
            vi: "https://nguyenrestaurant.de/vi/location",
        }
    }
};

export default function Page() {
    return <LocationPage lang="de" />;
}
