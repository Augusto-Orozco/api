import mongoose from 'mongoose'

export const connectDB = async () => { console.log(process.env.URI)
    try {
        await mongoose.connect(process.env.URI)
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }  
}