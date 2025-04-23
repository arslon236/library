    const Joi = require("joi")
    const currentYear = new Date().getFullYear()


    const AuthValidation = (data) => {
        try {
            
            const AuthorValidationSchema = Joi.object({
                username: Joi.string().min(2).max(50).required().messages({
                    "string.base": "username ismi string korinishida berilishi kerak",
                    "string.empty": "username ismi bo'sh bolmasligi kerak",
                    "any.required": "username ismi talab qilinadi va username ismi berilishi lozim",
                    "string.min": "username ismi kamida ikkita belgindan iborat bolishi kerak",
                    "string.max": "username ismi kopi bilan 50 ta  belgidan iborat bolishi kerak"
                }),
                email: Joi.string().min(2).max(50).required().messages({
                    "string.base": "username ismi string korinishida berilishi kerak",
                    "string.empty": "username ismi bo'sh bolmasligi kerak",
                    "any.required": "username ismi talab qilinadi va username ismi berilishi lozim",
                    "string.min": "username ismi kamida ikkita belgindan iborat bolishi kerak",
                    "string.max": "username ismi kopi bilan 50 ta  belgidan iborat bolishi kerak"
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

    module.exports = AuthValidation