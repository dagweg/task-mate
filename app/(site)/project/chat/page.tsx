"use client";

import React, { useState } from "react";

function Chat() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const send = () => {
        const text = input.trim();
        if (!text) return;
        setMessages((m) => [...m, text]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-white rounded-xl border border-gray-200">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.length === 0 ? (
                    <div className="text-sm text-gray-500">No messages yet.</div>
                ) : (
                    messages.map((m, i) => (
                        <div key={i} className="text-sm bg-gray-100 p-2 rounded-md w-fit">
                            {m}
                        </div>
                    ))
                )}
            </div>
            <div className="p-3 border-t border-gray-200 flex gap-2">
                <input
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Type a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                />
                <button
                    className="px-3 py-2 text-sm bg-slate-900 text-white rounded-md"
                    onClick={send}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;