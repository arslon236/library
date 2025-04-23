const {Router} = require("express")
const { register, verify, login, changePassword, logout, refresh} = require("../controllers/auth.controller")
const tokenMiddleware = require("../middleware/refresh.token.middleware")


const AuthRouter = Router()


/**
 * @openapi
 * /register:
 *   post:
 *     summary: Foydalanuvchini ro'yxatdan o'tkazish
 *     description: Yangi foydalanuvchini tizimga ro'yxatdan o'tkazadi. Role avtomatik ravishda 'user' sifatida o'rnatiladi.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       description: Ro'yxatdan o'tish uchun foydalanuvchi ma'lumotlari
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Foydalanuvchi nomi
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 description: Foydalanuvchi email manzili
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 description: Foydalanuvchi paroli
 *                 example: "secure123"
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tkazildi
 *       400:
 *         description: Noto'g'ri yoki yetishmaydigan ma'lumot kiritildi
 */
AuthRouter.post("/register", register)

/**
 * @openapi
 * /verify:
 *   post:
 *     summary: Foydalanuvchi tasdiqlash
 *     description: Foydalanuvchi emaili va OTP kodi orqali tasdiqlanadi. Kod to'g'ri bo'lsa, isVerified holati true ga o'rnatiladi.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       description: | 
 *         Tasdiqlash uchun foydalanuvchi emaili va OTP kodi. 
 *         Eslatma: code maydoni schemadagi otp maydoniga mos keladi.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 description: Tasdiqlanadigan foydalanuvchi email manzili
 *                 example: "john@example.com"
 *               code:
 *                 type: string
 *                 description: Foydalanuvchiga yuborilgan bir martalik tasdiqlash kodi
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli tasdiqlandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You verified your email!"
 *       403:
 *         description: Tasdiqlash muvaffaqiyatsiz (noto'g'ri ma'lumot, foydalanuvchi topilmadi, vaqt o'tgan yoki noto'g'ri kod)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum:
 *                     - "Email and code should be sent!"
 *                     - "User not found!"
 *                     - "Time expired"
 *                     - "Verification code wrong"
 *       400:
 *         description: Server xatosi yoki boshqa validatsiya xatolari
 */
AuthRouter.post("/verify", verify)





/**
 * @openapi
 * /login:
 *   post:
 *     summary: Foydalanuvchi tizimga kirish
 *     description: |
 *       Foydalanuvchi emaili va paroli orqali tizimga kiradi.
 *       Muvaffaqiyatli kirishda autentifikatsiya tokeni qaytariladi.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       description: Tizimga kirish uchun foydalanuvchi ma'lumotlari
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Foydalanuvchi email manzili
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 description: Foydalanuvchi paroli
 *                 example: "secure123"
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli tizimga kirdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   description: Autentifikatsiya tokeni
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Noto'g'ri yoki yetishmaydigan ma'lumot kiritildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email and password are required"
 *       401:
 *         description: Noto'g'ri email yoki parol
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 */
AuthRouter.post("/login", login)





/**
 * @openapi
 * /refresh:
 *   post:
 *     summary: Access tokenni yangilash
 *     description: |
 *       Refresh token orqali yangi access token qaytaradi.
 *       Refresh token to'g'ri bo'lishi va muddati tugamagan bo'lishi kerak.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       description: Yangilash uchun refresh token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Foydalanuvchiga berilgan refresh token
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Yangi access token muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token refreshed successfully"
 *                 accessToken:
 *                   type: string
 *                   description: Yangi access token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Yetishmaydigan yoki noto'g'ri ma'lumot kiritildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Refresh token is required"
 *       401:
 *         description: Noto'g'ri yoki muddati tugagan refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired refresh token"
 */
AuthRouter.post("/refresh", tokenMiddleware, refresh)



/**
 * @openapi
 * /change_password:
 *   post:
 *     summary: Foydalanuvchi parolini o'zgartirish
 *     description: |
 *       Foydalanuvchi emaili, joriy paroli va yangi paroli orqali parolni o'zgartiradi.
 *       Yangi parol tasdiqlovchi parol bilan mos kelishi kerak.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       description: Parolni o'zgartirish uchun email va parol ma'lumotlari
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - oldPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 description: Foydalanuvchi email manzili
 *                 example: "john@example.com"
 *               oldPassword:
 *                 type: string
 *                 description: Foydalanuvchining joriy paroli
 *                 example: "oldSecure123"
 *               newPassword:
 *                 type: string
 *                 description: Foydalanuvchining yangi paroli
 *                 example: "newSecure456"
 *               confirmPassword:
 *                 type: string
 *                 description: Yangi parolning tasdiqlovchi nusxasi
 *                 example: "newSecure456"
 *     responses:
 *       200:
 *         description: Parol muvaffaqiyatli o'zgartirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Parol muvaffaqiyatli o‘zgartirildi"
 *       400:
 *         description: Yetishmaydigan ma'lumotlar yoki yangi parollar mos emas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum:
 *                     - "Barcha maydonlarni to‘ldiring"
 *                     - "Yangi parollar mos emas"
 *       401:
 *         description: Joriy parol noto'g'ri
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Eski parol noto‘g‘ri"
 *       404:
 *         description: Foydalanuvchi topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Foydalanuvchi topilmadi"
 *       500:
 *         description: Server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Serverda xatolik"
 */
AuthRouter.post("/change_password", changePassword)



/**
 * @openapi
 * /logout:
 *   post:
 *     summary: Foydalanuvchi tizimdan chiqish
 *     description: |
 *       Autentifikatsiyadan o'tgan foydalanuvchi tizimdan chiqadi.
 *       So'rov /api/logout yo'liga yuborilishi va to'g'ri autentifikatsiya tokeni talab qilinadi.
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       description: Hech qanday ma'lumot talab qilinmaydi, faqat autentifikatsiya tokeni kerak
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: {}
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli tizimdan chiqdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
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
 */
AuthRouter.post("/logout", tokenMiddleware, logout);

module.exports = AuthRouter