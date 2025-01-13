import { useChatState } from "../store/ChatStore"
import NoChatSelected from "../components/NoChatSelected"
import ChatBox from "../components/ChatBox"
import Sidebar from "../components/Sidebar"

const Homepage = () => {
    const { selectedUser } = useChatState()
    return (
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-10 px-4">

                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar />
                        {!selectedUser ? <NoChatSelected /> : <ChatBox />}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Homepage