import { create } from "zustand";

import toast from "react-hot-toast";
import { axiosInstance } from "../lib/api.axios";


export const useChatState = create((set, get) => ({
    message: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,



    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get("/messages/users")
            set({ users: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })

        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ message: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, message } = get()

        try {
            const res = axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({ message: [...message, res.data] })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))



