const url =`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`

const uploadOnCloudinary = async(image) => {

    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "ecomm-product")

    const res = await fetch(url, {
        method: "POST",
        body: formData
    })

    return res.json()
}

export default uploadOnCloudinary