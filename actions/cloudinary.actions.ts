import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const updateImage = async (image: string) => {
    try {
        const imageUpdated = await cloudinary.uploader.upload(image, {
            folder: process.env.CLOUDINARY_FOLDER
        })
        return imageUpdated
    } catch (error) {
        console.log(error)
    }
}

export const deleteImage = async (id: string) => {
    try {
        const imageDeleted = await cloudinary.uploader.destroy(id)
        return imageDeleted
    } catch (error) {
        console.log(error)
    }
}