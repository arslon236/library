    const Joi = require("joi")
    const currentYear = new Date().getFullYear()


    const BooksValidation = (data) => {
        try {
            
            const BooksValidationSchema = Joi.object({
                title: Joi.string().min(2).max(40).required().messages({
                    "string.base": "Kitob nomi string korinishida berilishi kerak",
                    "string.empty": "Kitob nomi bo'sh bolmasligi kerak",
                    "any.required": "Kitob nomi talab qilinadi va kitob berilishi lozim",
                    "string.min": "kitob nomi kamida ikkita belgindan iborat bolishi kerak",
                    "string.max": "Kitob nomi kopi bilan 40 ta  belgidan iborat bolishi kerak"
                }),
                pages: Joi.number().min(20).max(5000).required().messages({
                    "number.base": "Kitob varqasi raqam korinishida berilishi kerak",
                    "number.empty": "Kitob varaqlari bo'sh bolmasligi kerak",
                    "any.required": "Kitob varaqi berilishi shart",
                    "number.min": "kitob varqalari 20 bet bolishi lozim",
                    "number.max": "Kitob varaqlari kopi bilan 5000 bet bolishi lozim"
                }),
                year: Joi.number().min(1600).max(currentYear).required().messages({
                    "number.base": "Kitob yili raqam korinishida berilishi kerak",
                    "number.empty": "Kitob yili bo'sh bolmasligi kerak",
                    "any.required": "Kitob yili berilishi shart",
                    "number.min": "kitob yili kamida 1600 yil bolishi lozim",
                    "numberx.max": `Kitob yili kopi bilan ${currentYear} yil bolishi lozim`
                }),
                price: Joi.number().min(5).required().messages({
                    "number.base": "Kitob narxi raqam korinishida berilishi kerak",
                    "number.empty": "Kitob narxi bo'sh bolmasligi kerak",
                    "any.required": "Kitob narxi berilishi shart",
                    "number.min": "kitob narxi kamida 5 bolishi lozim",
                }),
                country: Joi.string().min(2).max(100).required().messages({
                    "string.base": "Kitob davlati string korinishida berilishi kerak",
                    "string.empty": "Kitob davlati bo'sh bolmasligi kerak",
                    "any.required": "Kitob davlati talab qilinadi va kitob berilishi lozim",
                    "string.min": "kitob davlati kamida ikkita belgindan iborat bolishi kerak",
                    "string.max": "Kitob davlati kopi bilan 100 ta  belgidan iborat bolishi kerak"
                }),
                author: Joi.string().min(2).max(100).required().messages({
                    "string.base": "Kitob mualifi string korinishida berilishi kerak",
                    "string.empty": "Kitob mualifi bo'sh bolmasligi kerak",
                    "any.required": "Kitob mualifi talab qilinadi va kitob berilishi lozim",
                    "string.min": "kitob mualifi kamida ikkita belgindan iborat bolishi kerak",
                    "string.max": "Kitob mualifi kopi bilan 100 ta  belgidan iborat bolishi kerak"
                }),
                description: Joi.string().min(15).max(5000).required().messages({
                    "string.base": "Kitob tavsifi string korinishida berilishi kerak",
                    "string.empty": "Kitob tavsifi bo'sh bolmasligi kerak",
                    "any.required": "Kitob tavsifi talab qilinadi va kitob berilishi lozim",
                    "string.min": "kitob tavsifi kamida 15ta belgindan iborat bolishi kerak",
                    "string.max": "Kitob tavsifi kopi bilan 5000 ta  belgidan iborat bolishi kerak"
                })
                

            })

            return BooksValidationSchema.validate(data)

        } catch (error) {
           throw new Error(error) 
        }
    }  

    module.exports = BooksValidation