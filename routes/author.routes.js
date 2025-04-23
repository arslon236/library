const {Router} = require("express")
const { getAuth, getOneAuth, searchAuth, addAuth, updateAuths, deleteAuths } = require("../controllers/author.controller")

const AuthorRouter = Router()
const validateAuthor = require("../middleware/author.middleware")
const checkAdmin = require("../middleware/access.token.middleware")


/**
 * @openapi
 * /get_auth:
 *   get:
 *     summary: Barcha adiblarni olish
 *     description: Ushbu endpoint barcha adiblar ro'yxatini qaytaradi.
 *     tags: [Author] 
 *     responses:
 *       200:
 *         description: adiblar ro'yxati muvaffaqiyatli qaytarildi
 *       404:
 *         description: adiblar topilmadi
 */
AuthorRouter.get("/get_auth", getAuth)






/**
 * @openapi
 * /getOne_auth/{id}:
 *   get:
 *     summary: Bitta adibni olish
 *     description: Berilgan ID bo'yicha bitta adib ma'lumotlarini qaytaradi.
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Adibning ID si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adib ma'lumotlari muvaffaqiyatli qaytarildi
 *       404:
 *         description: Adib topilmadi
 */
AuthorRouter.get("/getOne_auth/:id", getOneAuth)











/**
 * @openapi
 * /search_auths:
 *   get:
 *     summary: Adiblarni qidirish
 *     description: Berilgan so'rov parametri bo'yicha adiblarni qidiradi.
 *     tags: [Author]
 *     parameters:
 *       - in: query
 *         name: fullName
 *         required: true
 *         description: Qidiruvga adiblar nomini kiriting
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       404:
 *         description: Hech qanday adib topilmadi
 */
AuthorRouter.get("/search_auths", searchAuth)



/**
 * @openapi
 * /add_auth:
 *   post:
 *     summary: Yangi adib qo'shish
 *     description: |
 *       Admin tomonidan yangi adib qo'shiladi. Majburiy maydonlar: to'liq ism, tug'ilgan sana, davlat va tavsif.
 *       So'rov /api/add_auth yo'liga yuborilishi va admin autentifikatsiya tokeni talab qilinadi.
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       description: Yangi adib ma'lumotlari
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - dateOfBrith
 *               - country
 *               - bio
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Adibning to'liq ismi (2-100 harf)
 *                 example: "Alisher Navoiy"
 *                 minLength: 2
 *                 maxLength: 100
 *               dateOfBrith:
 *                 type: string
 *                 format: date
 *                 description: Adibning tug'ilgan sanasi
 *                 example: "1441-02-09"
 *               dateOfDeath:
 *                 type: string
 *                 format: date
 *                 description: Adibning vafot sanasi (ixtiyoriy)
 *                 example: "1501-01-03"
 *               country:
 *                 type: string
 *                 description: Adibning davlati (kamida 3 harf)
 *                 example: "O'zbekiston"
 *                 minLength: 3
 *               bio:
 *                 type: string
 *                 description: Adib haqida qisqacha ma'lumot (kamida 3 harf)
 *                 example: "O'rta asr o'zbek adabiyotidagi muhim shaxs."
 *                 minLength: 3
 *     responses:
 *       201:
 *         description: Adib muvaffaqiyatli qo'shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adib muvaffaqiyatli qo'shildi"
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     fullName:
 *                       type: string
 *                       example: "Alisher Navoiy"
 *                     dateOfBrith:
 *                       type: string
 *                       format: date
 *                       example: "1441-02-09"
 *                     dateOfDeath:
 *                       type: string
 *                       format: date
 *                       example: "1501-01-03"
 *                     country:
 *                       type: string
 *                       example: "O'zbekiston"
 *                     bio:
 *                       type: string
 *                       example: "O'rta asr o'zbek adabiyotidagi muhim shaxs."
 *       400:
 *         description: Noto'g'ri yoki yetishmaydigan ma'lumot kiritildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Barcha majburiy maydonlarni to'ldiring"
 *       401:
 *         description: Autentifikatsiya muvaffaqiyatsiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired token"
 *       403:
 *         description: Admin ruxsati yo'q
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faqat adminlar adib qo'sha oladi"
 */
AuthorRouter.post("/add_auth", [checkAdmin, validateAuthor], addAuth)



/**
 * @openapi
 * /update_auth/{id}:
 *   put:
 *     summary: Adib ma'lumotlarini yangilash
 *     description: |
 *       Admin tomonidan berilgan ID bo'yicha adib ma'lumotlari yangilanadi.
 *       So'rov /api/update_auth/{id} yo'liga yuborilishi va admin autentifikatsiya tokeni talab qilinadi.
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan adibning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Yangilanadigan adib ma'lumotlari (kamida bitta maydon kiritilishi kerak)
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Adibning to'liq ismi (2-100 harf, ixtiyoriy)
 *                 example: "Alisher Navoiy"
 *                 minLength: 2
 *                 maxLength: 100
 *               dateOfBrith:
 *                 type: string
 *                 format: date
 *                 description: Adibning tug'ilgan sanasi (ixtiyoriy)
 *                 example: "1441-02-09"
 *               dateOfDeath:
 *                 type: string
 *                 format: date
 *                 description: Adibning vafot sanasi (ixtiyoriy)
 *                 example: "1501-01-03"
 *               country:
 *                 type: string
 *                 description: Adibning davlati (kamida 3 harf, ixtiyoriy)
 *                 example: "O'zbekiston"
 *                 minLength: 3
 *               bio:
 *                 type: string
 *                 description: Adib haqida qisqacha ma'lumot (kamida 3 harf, ixtiyoriy)
 *                 example: "O'rta asr o'zbek adabiyotidagi muhim shaxs."
 *                 minLength: 3
 *     responses:
 *       200:
 *         description: Adib ma'lumotlari muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adib ma'lumotlari muvaffaqiyatli yangilandi"
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     fullName:
 *                       type: string
 *                       example: "Alisher Navoiy"
 *                     dateOfBrith:
 *                       type: string
 *                       format: date
 *                       example: "1441-02-09"
 *                     dateOfDeath:
 *                       type: string
 *                       format: date
 *                       example: "1501-01-03"
 *                     country:
 *                       type: string
 *                       example: "O'zbekiston"
 *                     bio:
 *                       type: string
 *                       example: "O'rta asr o'zbek adabiyotidagi muhim shaxs."
 *       400:
 *         description: Noto'g'ri yoki yetishmaydigan ma'lumot kiritildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kamida bitta yangilanish maydoni kiritilishi kerak"
 *       401:
 *         description: Autentifikatsiya muvaffaqiyatsiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired token"
 *       403:
 *         description: Admin ruxsati yo'q
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faqat adminlar adib ma'lumotlarini yangilay oladi"
 *       404:
 *         description: Adib topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adib topilmadi"
 */
AuthorRouter.put("/update_auth/:id", checkAdmin, updateAuths)



/**
 * @openapi
 * /delete_auth/{id}:
 *   delete:
 *     summary: Adibni o'chirish
 *     description: |
 *       Admin tomonidan berilgan ID bo'yicha adib o'chiriladi.
 *       So'rov /api/delete_auth/{id} yo'liga yuborilishi va admin autentifikatsiya tokeni talab qilinadi.
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan adibning ID si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adib muvaffaqiyatli o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adib muvaffaqiyatli o'chirildi"
 *       401:
 *         description: Autentifikatsiya muvaffaqiyatsiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired token"
 *       403:
 *         description: Admin ruxsati yo'q
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faqat adminlar adibni o'chira oladi"
 *       404:
 *         description: Adib topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adib topilmadi"
 */
AuthorRouter.delete("/delete_auth/:id", checkAdmin, deleteAuths)

module.exports = AuthorRouter

