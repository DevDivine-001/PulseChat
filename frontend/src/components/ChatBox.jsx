import { useEffect } from "react"
import { useChatState } from "../store/ChatStore"
import MessageInput from "./MessageInput"
import ChatHeader from "./ChatHeader"
import { Loader2 } from "lucide-react"

const ChatBox = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatState()


    useEffect(() => {
        getMessages(selectedUser._id)

    }, [selectedUser._id, getMessages])

    if (isMessagesLoading) return <div className="flex justify-center items-center w-full h-[80vh]"> <Loader2 className="animate-spin size-7" />Loading ...!</div>
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <p>Messages...</p>

            <MessageInput />
        </div>
    )
}

export default ChatBox