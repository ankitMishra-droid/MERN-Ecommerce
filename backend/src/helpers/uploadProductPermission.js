import { User } from "../models/UserModel.js";

const uploadProductPermission = async(userId) => {

    const user = await User.findById(userId)

    if(user)

    if(user.role !== "ADMIN" || user.role !== "EMPLOYEE"){
        return false
    }

    return false
}

export default uploadProductPermission