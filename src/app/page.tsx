import { getDecks, createDeck } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Layers, Plus } from "lucide-react";

export default async function HomePage() {
  const decks = await getDecks();

  return (
    <main className="min-h-screen bg-slate-50/50 p-8 md:p-12 text-slate-900">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Flashcard Decks</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your decks and review schedules.
            </p>
          </div>
        </header>

        <Card className="rounded-2xl border-slate-200/80 shadow-sm bg-white">
          <CardContent className="p-6">
            <form action={createDeck} className="flex gap-3">
              <Input
                name="title"
                placeholder="Enter deck title (e.g. Spanish Vocabulary)..."
                required
                className="rounded-xl bg-slate-50 border-slate-200 text-base py-5 focus-visible:ring-slate-400"
              />
              <Button type="submit" size="lg" className="rounded-xl px-6 gap-2 font-medium">
                <Plus className="h-4 w-4" /> Create Deck
              </Button>
            </form>
          </CardContent>
        </Card>

        {decks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 space-y-3">
            <Layers className="h-10 w-10 text-slate-300 mx-auto" />
            <p className="text-slate-500 text-sm">No decks created yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <Card
                key={deck.id}
                className="rounded-2xl border-slate-200/80 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
              >
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl font-semibold line-clamp-2">
                      {deck.title}
                    </CardTitle>
                    <Badge variant="secondary" className="rounded-lg px-2.5 py-1 text-xs">
                      {deck._count.cards} cards
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex gap-2">
                  <Button variant="outline" className="w-full rounded-xl text-xs font-medium">
                    Manage Cards
                  </Button>
                  <Button className="w-full rounded-xl text-xs font-medium">
                    Study Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}