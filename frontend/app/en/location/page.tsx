import { LocationPage } from "@/components/LocationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Location & Contact | NGUYEN Vietnam Restaurant",
    description: "How to find Nguyen Vietnam Restaurant in Munich-Schwabing. Address, opening hours, and contact information.",
    alternates: {
        canonical: "https://nguyenrestaurant.de/en/location",
        languages: {
            "de-DE": "https://nguyenrestaurant.de/location",
            en: "https://nguyenrestaurant.de/en/location",
            vi: "https://nguyenrestaurant.de/vi/location",
        }
    }
};

export default function Page() {
    return <LocationPage lang="en" />;
}
