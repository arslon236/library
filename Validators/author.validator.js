    const Joi = require("joi")
    const currentYear = new Date().getFullYear()


    const AuthorValidation = (data) => {
        try {
            
            const AuthorValidationSchema = Joi.object({
                fullName: Joi.string().min(2).max(50).required().messages({
                    "string.base": "Mualif ismi string korinishida berilishi kerak",
                    "string.empty": "Mualif ismi bo'sh bolmasligi kerak",
                    "any.required": "Mualif ismi talab qilinadi va Mualif ismi berilishi lozim",
                    "string.min": "Mualif ismi kamida ikkita belgindan iborat bolishi kerak",
                    "string.max": "Mualif ismi kopi bilan 50 ta  belgidan iborat bolishi kerak"
                }),
                dateOfBrith: Joi.date().required().messages({
                    "date.base": "Mualif tugulgan kuni raqam korinishida berilishi kerak",
                    "date.empty": "Mualif tugulgan kuni bo'sh bolmasligi kerak",
                    "any.required": "Mualif tugulgan kuni berilishi shart",
                }),
                dateOfDeath: Joi.date().messages({
                    "date.base": "Mualif vafot etgan kuni raqam korinishida berilishi kerak",
                }),
                country: Joi.string().min(2).max(50).required().messages({
                    "string.base": "Mualif davlati string korinishida berilishi kerak",
                    "string.empty": "Mualif davlati bo'sh bolmasligi kerak",
                    "any.required": "Mualif davlati talab qilinadi va Mualif berilishi lozim",
                    "string.min": "Mualif davlati kamida ikkita belgindan iborat bolishi kerak",
                    "string.max": "Mualif davlati kopi bilan 50 ta  belgidan iborat bolishi kerak"
                }),
                bio:Joi.string().min(20).max(5000).required().messages({
                    "string.base": "Mualif tavsifi string korinishida berilishi kerak",
                    "string.empty": "Mualif tavsifi bo'sh bolmasligi kerak",
                    "any.required": "Mualif tavsifi talab qilinadi va Mualif berilishi lozim",
                    "string.min": "Mualif tavsifi kamida 20 ta belgindan iborat bolishi kerak",
                    "string.max": "Mualif tavsifi kopi bilan 5000 ta  belgidan iborat bolishi kerak"
                })
                

            })

            return AuthorValidationSchema.validate(data)

        } catch (error) {
           throw new Error(error) 
        }
    }  

    module.exports = AuthorValidation