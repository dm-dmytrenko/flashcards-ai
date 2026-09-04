"use client"

import { useState } from "react";

interface FlashCard {
    id: string,
    front: string,
    back: string
}

interface StudyCardsProp {
    cards: FlashCard[]
}

export default function StudyCard({ cards }: StudyCardsProp) {
    const [queue, setQueue] = useState(cards);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const currentCard = queue[0];
    const totalCards = cards.length;
    const remainingTotalCards = totalCards - queue.length;

    const handleCorrect = () => {
        setIsFlipped(false);

        const nextQueue = queue.slice(1);
        setQueue(nextQueue);

        if (nextQueue.length === 0) {
            setIsFinished(true);
        }
    };

    const handleWrong = () => {
        setIsFlipped(false);
        const nextQueue = [...queue.slice(1), queue[0]];
        setQueue(nextQueue);
    };

    if (queue.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                Good job, you've finished everything!
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center w-full">
            <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full max-w-2xl h-[420px] bg-white border border-slate-200 rounded-3xl shadow-md p-8 flex flex-col justify-between text-center cursor-pointer hover:border-slate-300 transition-all select-none"
            >
                <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Completed {remainingTotalCards} cards out of {totalCards}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                        {isFlipped ? "Answer" : "Question"}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center my-auto">
                    <p className="text-3xl font-medium text-slate-900 px-4">
                        {isFlipped ? currentCard.back : currentCard.front}
                    </p>
                    <span className="text-xs text-slate-400 mt-6">
                        Click to flip
                    </span>
                </div>

                <div className="flex gap-4 justify-center w-full" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={handleWrong}
                        className="flex-1 px-5 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                        Wrong
                    </button>
                    <button
                        onClick={handleCorrect}
                        className="flex-1 px-5 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                        Correct
                    </button>
                </div>
            </div>
        </div>
    );
}