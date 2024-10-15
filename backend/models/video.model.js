import mongoose, { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { genarateUniqueSlug } from "../../utils/genarate-unique-slug.js";

const videoDataSchema = new mongoose.Schema({
    _id: false,
    posterUrl: {
        type: String,
    },
    sources: [
        {
            src: { type: String },
            type: { type: String },
            _id: false,
        },
    ],
});

export const VIDEO_CATEGORY_ENUM = {
    ENTERTAINMENT: "Entertainment",
    NEWS: "News",
    GAMEING: "Gameing",
    MOVIES: "Movies",
    BLOGING: "Bloging",
    REVIEWS: "Reviews",
    TECHNOLOGY: "Technology",
    MUSIC: "Music",
    SERIES: "Series",
    TV_SHOWS: "TV Shows",
    ANIME: "Anime",
    ANIME_MOVIE: "Anime Movie",
    ANIME_SERIES: "Anime Series",
};

export const VIDEO_STATUS_ENUM = ["published", "unpublished", "draft"];

export const VIDEO_QUALITY_ENUM = ["240p", "360p", "480p", "720p"];

export const VIDEO_QUALITY_ENUM_VALUES = Object.values(VIDEO_QUALITY_ENUM);

const videoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            default: "Untitled",
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            trim: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        videoUrls: {
            originalVideoUrl: { type: String, required: true },
            "240p": videoDataSchema,
            "360p": videoDataSchema,
            "480p": videoDataSchema,
            "720p": videoDataSchema,
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
        category: {
            type: String,
            enum: Object.values(VIDEO_CATEGORY_ENUM),
            required: true,
            default: "Entertainment",
        },
        views: {
            type: Number,
            default: 0,
        },
        duration: {
            type: Number,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: Object.values(VIDEO_STATUS_ENUM),
            default: "draft",
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.updatedAt;
                delete ret.isPublic;
                delete ret.owner.role;
                delete ret.owner.email;
                delete ret.owner.isVerified;
                delete ret.owner.updatedAt;
                delete ret.owner.createdAt;
                delete ret.owner.password;
                delete ret.owner.refreshToken;
                delete ret.owner.__v;
                return ret;
            },
        },
    }
);

// videoSchema.methods.toJSON = function () {
//     const videoObject = this.toObject();
//     delete videoObject.__v;
//     delete videoObject.updatedAt;
//     delete videoObject.isPublic;
//     delete videoObject.owner.role;
//     delete videoObject.owner.email;
//     delete videoObject.owner.isVerified;
//     delete videoObject.owner.updatedAt;
//     delete videoObject.owner.createdAt;
//     delete videoObject.owner.password;
//     delete videoObject.owner.refreshToken;
//     delete videoObject.owner.__v;
//     return videoObject;
// };

videoSchema.index({ slug: 1, owner: 1 }, { unique: true });

videoSchema.plugin(mongooseAggregatePaginate);

const Video = model("Video", videoSchema);

export default Video;
