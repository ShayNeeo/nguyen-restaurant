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
    // We ignore the passed 'style' prop for positioning to ensure responsive design
    // and instead use a structured grid/masonry layout.

    return (
        <div className="w-full">
            {/* Mobile/Tablet: Horizontal Carousel with Snap */}
            <div className="lg:hidden">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide px-4 -mx-4">
                    {images.map((image, index) => (
                        <div
                            key={`${image.src}-${index}`}
                            className="snap-center shrink-0 w-[85vw] sm:w-[60vw] relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 85vw, 60vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            <p className="absolute bottom-4 left-4 right-4 text-white font-medium text-sm line-clamp-2">
                                {image.alt}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop: Masonry-style Grid */}
            <div className="hidden lg:block relative">
                 <div className="absolute inset-0 bg-brand-accent/5 rounded-[40px] blur-3xl -z-10" />
                 
                <div className="columns-3 gap-6 space-y-6">
                    {images.map((image, index) => (
                        <div
                            key={`${image.src}-${index}`}
                            className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-brand-light"
                        >
                            <div className="relative w-full" style={{ aspectRatio: image.style.aspectRatio || '3/4' }}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="33vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                            </div>
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-brand-dark font-medium text-sm">
                                        {image.alt}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}