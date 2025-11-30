import { LocationPage } from "@/components/LocationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Địa chỉ & Liên hệ | NGUYEN Vietnam Restaurant",
    description: "Đường đến nhà hàng Nguyen Vietnam tại Munich-Schwabing. Địa chỉ, giờ mở cửa và thông tin liên hệ.",
    alternates: {
        canonical: "https://nguyenrestaurant.de/vi/location",
        languages: {
            "de-DE": "https://nguyenrestaurant.de/location",
            en: "https://nguyenrestaurant.de/en/location",
            vi: "https://nguyenrestaurant.de/vi/location",
        }
    }
};

export default function Page() {
    return <LocationPage lang="vi" />;
}
