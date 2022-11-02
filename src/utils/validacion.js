import joi from "joi";

const productTemplate=joi.object({
    title:joi.string().min(5).max(40).required(),
    description:joi.string().min(10).max(100).required(),
    code:joi.string().min(5).max(15).required(),
    thumbnail:joi.string().min(10).max(60).required(),
    price:joi.number().required(),
    stock:joi.number().required(),
    timestamp:joi.string().required()
})

export const JOI_VALIDATION={productTemplate}