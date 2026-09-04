"use client";

import { useState } from "react";

interface ModalProps {
    cardFront: string,
    cardBack: string,
    onClose: () => void;
}

export default function SubModalCard({ cardFront, cardBack, onClose }: ModalProps) {

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
                <div>
                    {cardFront}
                </div>
                <div>
                    {cardBack}
                </div>
            </div>
        </div>
    );
}