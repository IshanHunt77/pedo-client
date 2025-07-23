import { Button } from "./ui/button"
import { Zap } from "lucide-react"

export const Readme = () => {
    const gotoreadme = () => {
        window.open("")
    }

    return (
        <div
            onClick={gotoreadme}
            className="cursor-pointer rounded-xl border border-indigo-200 w-80 mb-8 bg-indigo-50/60 hover:bg-indigo-100 transition-colors duration-200 group shadow-sm"
        >
            <div className="p-4 flex items-center justify-between gap-2">
                <img src="/temp/OIP.jpg" className="w-6 h-6 rounded-md border border-indigo-100" />
                <p className="text-sm text-gray-500 font-medium">Gemini Powered</p>
                <p className="text-sm font-medium text-indigo-600 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400 group-hover:animate-pulse" />
                    Fast Response
                </p>
            </div>
        </div>
    )
}