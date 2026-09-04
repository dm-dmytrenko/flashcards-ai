"use client";

import { useState } from "react";
import { updateCard } from "./actions";

interface ModalProps {
    cardFront: string,
    cardBack: string,
    onClose: () => void;
}

export default function SubModalCard({ cardId, cardFront, cardBack, onClose }: ModalProps) {
    const [newCardFront, setNewCardFront] = useState(cardFront);
    const [newCardBack, setNewCardBack] = useState(cardBack);

    const handleUpdate = async () => {
        try {
            await updateCard(cardId, newCardFront, newCardBack);
            onClose();
        } catch (error) {
            console.error(error);
        };
    }

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl border border-slate-200 relative flex flex-col max-h-[85vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors p-2 text-sm font-bold cursor-pointer"
                    title="Close sub-modal"
                >
                    ✕
                </button>
                <div className="mb-4">
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">Question</label>
                    <input
                        type="text"
                        id="cardFront"
                        value={newCardFront}
                        onChange={(e) => setNewCardFront(e.target.value)}
                        className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-slate-900 focus:border-slate-900 block w-full px-3.5 py-2.5 outline-none transition-all"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">Answer</label>
                    <input
                        type="text"
                        id="cardBack"
                        value={newCardBack}
                        onChange={(e) => setNewCardBack(e.target.value)}
                        className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-slate-900 focus:border-slate-900 block w-full px-3.5 py-2.5 outline-none transition-all"
                    />
                </div>
                <button
                    onClick={handleUpdate}
                    className="text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                    Update
                </button>
            </div>
        </div>
    );
}