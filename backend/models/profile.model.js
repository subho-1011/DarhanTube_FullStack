import mongoose, { Schema, model } from "mongoose";

const profileSchema = new Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        firstName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            trim: true,
        },
        bio: {
            type: String,
            maxlength: 200,
            trim: true,
        },
        profileSchemaUrl: {
            type: String,
            default: "https://via.placeholder.com/150",
        },
        coverPictureUrl: {
            type: String,
        },
        websites: [
            {
                name: String,
                url: String,
            },
        ],
        socials: [
            {
                name: String,
                url: String,
            },
        ],
        city: {
            type: String,
            maxlength: 20,
            trim: true,
        },
        birthday: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
    },
    {
        timestamps: true,
    }
);

const Profile = model("Profile", profileSchema);

export default Profile;
