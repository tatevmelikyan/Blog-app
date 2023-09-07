import Joi from "joi";

const validator = (schema) => (payload) => 
schema.validateAsync(payload, {abortEarly: false});


const signupSchema = Joi.object({
    firstName: Joi.string().max(50).pattern(new RegExp(/^[A-Za-z]+$/)).required(),
    lastName: Joi.string().max(50).pattern(new RegExp(/^[A-Za-z]+$/)).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
})

const userNameSchema = Joi.object({
    firstName: Joi.string().max(50).pattern(new RegExp(/^[A-Za-z]+$/)).required(),
    lastName: Joi.string().max(50).pattern(new RegExp(/^[A-Za-z]+$/)).required(),
})

const userContactInfoSchema = Joi.object({
    email: Joi.string().email().required(),
})

const userPasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('newPassword'))
})

const postSchema = Joi.object({
    title: Joi.string().max(255).required(),
    content: Joi.string().required()
})


export const validateSignupPayload = validator(signupSchema)
export const validateUserNamePayload = validator(userNameSchema)
export const validateUserContactInfoPayload = validator(userContactInfoSchema)
export const validateUserPasswordPayload = validator(userPasswordSchema)

export const validatePostPayload = validator(postSchema)