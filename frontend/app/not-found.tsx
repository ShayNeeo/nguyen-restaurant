import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-brand-light px-6 text-center text-brand-dark">
            <h1 className="font-display text-9xl font-bold text-brand">404</h1>
            <h2 className="mt-4 text-3xl font-semibold">Seite nicht gefunden</h2>
            <p className="mt-4 max-w-md text-lg text-brand-dark/70">
                Entschuldigung, die gesuchte Seite existiert nicht oder wurde verschoben.
            </p>
            <div className="mt-8 flex gap-4">
                <Link href="/" className="btn-primary">
                    Zur Startseite
                </Link>
                <Link href="/menu" className="btn-light">
                    Speisekarte
                </Link>
            </div>
        </div>
    );
}
