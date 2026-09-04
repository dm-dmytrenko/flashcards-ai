import { getDeckById, getDecks } from "@/app/actions"

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function StudyDeckPage({ params }: PageProps) {
    const { id } = await params;

    const deck = await getDeckById(id);

    return <div>Study deck</div>
}