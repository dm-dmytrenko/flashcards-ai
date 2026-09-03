import { getDecks, generateDeckFromPrompt, deleteDeck } from "./actions"
import Form from 'next/form'

export default async function HomePage() {
  const decks = await getDecks()

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Flashcards AI</h1>
          <p className="text-slate-600">Transform any topic into a smart study deck using AI.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <Form action={generateDeckFromPrompt} className="flex flex-col sm:flex-row gap-3">
            <input
              name="title"
              placeholder="What do you want to learn today?"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 placeholder:text-slate-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            >
              Generate Deck
            </button>
          </Form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Your Decks</h2>

          {decks.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No decks yet. Type a topic above to create your first one!</p>
          ) : (
            <div className="space-y-3 sm:grid-cols-2 md:grid-cols-3 gap-4">

              {decks.map((deck) => (
                <div
                  key={deck.id}
                  className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 relative"
                >
                  <form action={deleteDeck}>
                    <input type="hidden" name="id" value={deck.id} />
                    <button
                      type="submit"
                      className="absolute top-3 right-3 text-slate-400 hover:text-red-600 transition-colors px-2 py-1 text-sm font-bold"
                      title="Delete deck"
                    >
                      ✕
                    </button>
                  </form>
                  <h3 className="font-semibold text-slate-900 text-lg line-clamp-2 pr-6">{deck.title}</h3>
                  <p className="text-xs text-slate-400">Created: {new Date(deck.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  )
}