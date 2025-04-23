const {Router} = require("express")
const { getBooks, addBook, updateBooks, getOneBooks, deleteBooks, searchBook } = require("../controllers/books.controller")

const booksRoouter = Router()
const validateBook = require("../middleware/books.middleware")


/**
 * @openapi
 * /get_books:
 *   get:
 *     summary: Barcha kitoblarni olish
 *     description: Ushbu endpoint barcha kitoblar ro'yxatini qaytaradi.
 *     tags: [Kitoblar] 
 *     responses:
 *       200:
 *         description: Kitoblar ro'yxati muvaffaqiyatli qaytarildi
 *       404:
 *         description: Kitoblar topilmadi
 */

booksRoouter.get("/get_books", getBooks)


/**
 * @openapi
 * /getOne_book/{id}:
 *   get:
 *     summary: Bitta kitobni olish
 *     description: Berilgan ID bo'yicha bitta kitob ma'lumotlarini qaytaradi.
 *     tags: [Kitoblar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Kitobning ID si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kitob ma'lumotlari muvaffaqiyatli qaytarildi
 *       404:
 *         description: Kitob topilmadi
 */
booksRoouter.get("/getOne_book/:id", getOneBooks)

/**
 * @openapi
 * /search_books:
 *   get:
 *     summary: Kitoblarni qidirish
 *     description: Berilgan so'rov parametri bo'yicha kitoblarni qidiradi.
 *     tags: [Kitoblar]
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         description: Qidiruvga kitob nomini kiriting
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       404:
 *         description: Hech qanday kitob topilmadi
 */
booksRoouter.get("/search_books", searchBook)   


/**
 * @openapi
 * /add_book:
 *   post:
 *     summary: Yangi kitob qo'shish
 *     description: Mongoose schema asosida yangi kitob ma'lumotlarini bazaga qo'shadi.
 *     tags: [Kitoblar]
 *     requestBody:
 *       required: true
 *       description: Qo'shiladigan kitob ma'lumotlari
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - pages
 *               - year
 *               - price
 *               - country
 *               - author
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: Kitob nomi (kamida 2 harf)
 *                 example: "O'tgan kunlar"
 *               pages:
 *                 type: integer
 *                 description: Kitob varaqlari soni (kamida 25)
 *                 example: 300
 *               year:
 *                 type: integer
 *                 description: Kitob nashr yili
 *                 example: 1926
 *               price:
 *                 type: integer
 *                 description: Kitob narxi (kamida 5000)
 *                 example: 15000
 *               country:
 *                 type: string
 *                 description: Kitob nashr qilingan davlat (kamida 3 harf)
 *                 example: "O'zbekiston"
 *               author:
 *                 type: string
 *                 description: Kitob muallifining ObjectId (author modeliga ref)
 *                 example: "507f1f77bcf86cd799439011"
 *               description:
 *                 type: string
 *                 description: Kitob tavsifi (kamida 3 harf)
 *                 example: "O'zbek adabiyotidagi muhim asar"
 *     responses:
 *       201:
 *         description: Kitob muvaffaqiyatli qo'shildi
 *       400:
 *         description: Noto'g'ri yoki yetishmaydigan ma'lumot kiritildi
 */
booksRoouter.post("/add_book", validateBook, addBook)


/**
 * @openapi
 * /update_book/{id}:
 *   put:
 *     summary: Kitobni yangilash
 *     description: Berilgan ID bo'yicha kitob ma'lumotlarini Mongoose schema asosida yangilaydi.
 *     tags: [Kitoblar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan kitobning ID si
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Yangilanadigan kitob ma'lumotlari
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Kitob nomi (kamida 2 harf)
 *                 example: "O'tgan kunlar"
 *               pages:
 *                 type: integer
 *                 description: Kitob varaqlari soni (kamida 25)
 *                 example: 300
 *               year:
 *                 type: integer
 *                 description: Kitob nashr yili
 *                 example: 1926
 *               price:
 *                 type: integer
 *                 description: Kitob narxi (kamida 5000)
 *                 example: 15000
 *               country:
 *                 type: string
 *                 description: Kitob nashr qilingan davlat (kamida 3 harf)
 *                 example: "O'zbekiston"
 *               author:
 *                 type: string
 *                 description: Kitob muallifining ObjectId (author modeliga ref)
 *                 example: "507f1f77bcf86cd799439011"
 *               description:
 *                 type: string
 *                 description: Kitob tavsifi (kamida 3 harf)
 *                 example: "O'zbek adabiyotidagi muhim asar"
 *     responses:
 *       200:
 *         description: Kitob muvaffaqiyatli yangilandi
 *       400:
 *         description: Noto'g'ri yoki yetishmaydigan ma'lumot kiritildi
 *       404:
 *         description: Kitob topilmadi
 */
booksRoouter.put("/update_book/:id", updateBooks)


/**
 * @openapi
 * /delete_book/{id}:
 *   delete:
 *     summary: Kitobni o'chirish
 *     description: Berilgan ID bo'yicha kitobni bazadan o'chiradi.
 *     tags: [Kitoblar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan kitobning ID si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kitob muvaffaqiyatli o'chirildi
 *       404:
 *         description: Kitob topilmadi
 */
booksRoouter.delete("/delete_book/:id", deleteBooks)

module.exports = booksRoouter

