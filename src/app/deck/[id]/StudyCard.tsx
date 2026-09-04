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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const cardsNumber = cards.length;

    const currentCard = cards[currentIndex];

    const handleNext = () => {
        setIsFlipped(false);
        if (currentIndex < cardsNumber - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setIsFinished(true);
        }
    };
    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    if (cardsNumber === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                No flashcards found in this deck.
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
                        Card {currentIndex + 1} of {cardsNumber}
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
                        onClick={handlePrev}
                        className="flex-1 px-5 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex-1 px-5 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}