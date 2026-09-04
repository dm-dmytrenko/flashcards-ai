import { getDeckById, getDecks } from "@/app/actions"
import StudyCard from "./StudyCard";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function StudyDeckPage({ params }: PageProps) {
    const { id } = await params;

    const deck = await getDeckById(id);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <StudyCard cards={deck.cards} />
        </div>
    )

}