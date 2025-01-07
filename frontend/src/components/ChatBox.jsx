import { useEffect } from "react"
import { useChatState } from "../store/ChatStore"
import MessageInput from "./MessageInput"
import ChatHeader from "./ChatHeader"
import { Loader2 } from "lucide-react"
import MessageSkeletons from "./Skeletons/MessageSkeletons"

const ChatBox = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatState()


    useEffect(() => {
        getMessages(selectedUser._id)

    }, [selectedUser._id, getMessages])

    if (!isMessagesLoading) return (
        <div className="flex  flex-col flex-1 overflow-auto">
            <div className="flex justify-center items-center">
                <Loader2 className="animate-spin size-7 absolute  mt-64 flex justify-center items-center" />
            </div>
            <ChatHeader />
            <MessageSkeletons />
            <MessageInput />
        </div>
    )
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <p>Messages...</p>

            <MessageInput />
        </div>
    )
}

export default ChatBox