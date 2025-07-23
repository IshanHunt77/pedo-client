import { useRef, useState, useEffect } from "react"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { MessageCircle, X, User, Bot } from "lucide-react"
import axios from "axios"

// Loading indicator component
function LoadingBubble() {
    return (
        <div className="flex items-center gap-2 my-2 animate-pulse">
            <Bot className="w-5 h-5 text-indigo-400" />
            <div className="rounded-2xl bg-indigo-100 border border-indigo-200 px-4 py-2 text-sm text-indigo-700 shadow-sm">
                Searching PDF, generating response...
            </div>
        </div>
    );
}

type Message = {
    role: "user" | "ai";
    content: string;
};

export const AskAi = ({ onBack }: { onBack?: () => void }) => {
    const [conversation, setConversation] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-resize textarea
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 10 * 24)}px`;
        }
    };

    // Scroll to bottom when conversation updates
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation, loading]);

    const getAiResponse = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            role: "user",
            content: input,
        };

        setConversation((prev) => [...prev, userMessage]);
        setInput(""); // clear input
        setLoading(true);

        try {
            const url = process.env.NEXT_PUBLIC_API_URL;
            const res = await axios.post(`${url}/api/query`, {
                query: input,
            });

            const aiMessage: Message = {
                role: "ai",
                content: res.data.answer || "Sorry, I couldn't understand that.",
            };

            setConversation((prev) => [...prev, aiMessage]);
        } catch (e) {
            console.error("Error occurred:", e);
            setConversation((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: "Something went wrong. Please try again later.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="fixed right-0 top-0 h-screen w-full max-w-sm bg-indigo-100 shadow-2xl flex flex-col z-50 rounded-l-2xl border-l border-indigo-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-indigo-100 bg-white rounded-tl-2xl">
                <div className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-indigo-500" />
                    <span className="text-lg font-semibold text-gray-900 tracking-wide">Ask AI</span>
                </div>
                {onBack && (
                    <Button size="icon" variant="ghost" onClick={onBack} aria-label="Close" className="ml-2">
                        <X className="w-5 h-5 text-gray-400 hover:text-indigo-500 transition-colors" />
                    </Button>
                )}
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-indigo-100">
                {conversation.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-full select-none">
                        <div className="bg-white border border-indigo-200 rounded-xl shadow-md px-8 py-10 flex flex-col items-center">
                            <MessageCircle className="w-12 h-12 text-indigo-300 mb-3" />
                            <span className="text-lg font-semibold text-indigo-600 mb-1">Start a conversation with AI</span>
                            <span className="text-sm text-gray-500">Ready when you are!</span>
                        </div>
                    </div>
                )}
                {conversation.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
                        {msg.role === "ai" && (
                            <div className="flex-shrink-0">
                                <Bot className="w-7 h-7 text-indigo-400 bg-white border border-indigo-200 rounded-full p-1 shadow" />
                            </div>
                        )}
                        <div
                            className={`rounded-2xl px-4 py-2 max-w-[75%] text-sm shadow border break-words ${
                                msg.role === "user"
                                    ? "bg-black text-white border-gray-800 shadow-md rounded-br-none"
                                    : "bg-white text-indigo-900 border-indigo-200 shadow-sm rounded-bl-none"
                            }`}
                        >
                            {msg.content}
                        </div>
                        {msg.role === "user" && (
                            <div className="flex-shrink-0">
                                <User className="w-7 h-7 text-white bg-black border border-gray-800 rounded-full p-1 shadow" />
                            </div>
                        )}
                    </div>
                ))}
                {loading && <LoadingBubble />}
                <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="w-full px-5 pb-6 pt-2 bg-white flex items-end gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs px-2 py-1 bg-white text-gray-900 border-none hover:bg-indigo-50 rounded-xl"
                        >
                            model
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="bg-white text-gray-900 border border-indigo-100"
                    >
                        <DropdownMenuItem className="hover:underline decoration-blue-500">Gemini 2.5</DropdownMenuItem>
                        <DropdownMenuItem className="hover:underline decoration-blue-500">Grok Beta</DropdownMenuItem>
                        <DropdownMenuItem className="hover:underline decoration-blue-500">GPT o4</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInput}
                    placeholder="Message AI..."
                    rows={1}
                    className="flex-1 resize-none bg-transparent text-gray-900 border-none focus:ring-0 focus:outline-none px-2 py-1 max-h-[240px] min-h-[24px] text-sm leading-6 overflow-auto"
                    style={{ maxHeight: 24 * 10 }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            getAiResponse();
                        }
                    }}
                />

                <Button
                    size="icon"
                    onClick={getAiResponse}
                    className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl ml-2 shadow-md"
                >
                    <PaperPlaneIcon className="w-5 h-5" />
                </Button>
            </div>
        </aside>
    );
};
