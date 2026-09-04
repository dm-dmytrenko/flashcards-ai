import { getDeckById } from "@/app/actions";
import StudyCard from "./StudyCard";
import Link from "next/link";

export default async function StudyDeckPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const deck = await getDeckById(id);

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col justify-between p-6">
            <div>
                <Link
                    href="/"
                    className="inline-flex items-center text-md font-medium text-slate-600 hover:text-slate-950 transition-colors"
                >
                    ← Back
                </Link>
            </div>

            <div className="flex items-center justify-center flex-1">
                <StudyCard cards={deck?.cards || []} />
            </div>
        </main>
    );
}