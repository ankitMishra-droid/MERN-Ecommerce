import { axiosi } from "../../config/axios";

export const signUp = async(data) => {
    try {
        const res = await axiosi.post("/api/users/register", data)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const login = async(data) => {
    try {
        const res = await axiosi.post("/api/users/login", data)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const forgotPassword = async(password) => {
    try {
        const res = await axiosi.post("/api/users", password)

        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getCuurentUser = async(currentUser) => {
    try {
        const res = await axiosi.get("/api/users/get-current-user", currentUser)
         return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateProfile = async(data) => {
    try {
        const res = await axiosi.patch("/api/users/update-profile", data)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const logoutUser = async() => {
    try {
        const res = await axiosi.post("/api/users/update-profile")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}