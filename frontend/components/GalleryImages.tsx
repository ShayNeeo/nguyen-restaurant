"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";

export type GalleryImage = {
    src: string;
    alt: string;
    style: CSSProperties;
    zIndex: number;
};

export function GalleryImages({ images }: { images: GalleryImage[] }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            // Use 1024px (lg) as the breakpoint for the carousel view
            // This ensures tablets also get the touch-friendly carousel
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div className="relative w-full py-8">
                <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-brand-light/80 to-brand-accent/30 blur-3xl opacity-50" />

                {/* Mobile/Tablet Carousel View */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-8 scrollbar-hide -mx-4 sm:mx-0 items-center">
                    {images.map((image, index) => (
                        <div
                            key={`${image.src}-${index}`}
                            className="snap-center shrink-0 w-[80vw] sm:w-[50vw] relative rounded-[32px] overflow-hidden shadow-lg border border-brand-light/40 bg-brand-light/30 backdrop-blur-sm transition-transform duration-300"
                            style={{
                                aspectRatio: image.style.aspectRatio || '4/5',
                                // Add a slight rotation to alternating items for a playful look
                                transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)'
                            }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 80vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                        </div>
                    ))}
                    {/* Spacer for end of list */}
                    <div className="w-4 shrink-0" />
                </div>
            </div>
        );
    }

    // Desktop Scattered View
    return (
        <div className="relative h-[640px]">
            <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-brand-light/80 to-brand-accent/30 blur-3xl" />
            {images.map((image, index) => (
                <div
                    key={`${image.src}-${index}`}
                    className="group absolute overflow-hidden rounded-[36px] border border-brand-light/40 bg-brand-light/30 shadow-2xl backdrop-blur-sm transition-transform duration-700 ease-out hover:-translate-y-2 hover:rotate-[1deg]"
                    style={{
                        ...image.style,
                        zIndex: image.zIndex,
                    }}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="30vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
            ))}
        </div>
    );
}
