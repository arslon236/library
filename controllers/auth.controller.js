const AuthModel = require("../schema/auth.schema")
const emailSenderService = require("../Utils/email.service")
const BaseError = require("../Utils/base.error")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { accessToken, refreshToken } = require("../Utils/token.generator")

const register = async (req, res, next) => {
    const { username, email, password } = req.body
    const foundUser = await AuthModel.findOne({ email: email })
    if (foundUser) {
        return next(BaseError.BadRequest(403, "You already registred! You can login"))
    }
    const hashedPassword = await bcryptjs.hash(password, 10)

    const randomCode = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")
    emailSenderService(email, randomCode)

    const lastTime = new Date()
    const minutes = lastTime.getMinutes()
    lastTime.setMinutes(minutes + 5)


    await AuthModel.create({ username, email, password: hashedPassword, otp: randomCode, lastTime: lastTime })
        res.status(200).json({
            message: `you successfuly registred and verfication code sent to: ${email}`
        })


    setTimeout(async () => {
        const user = await AuthModel.findOne({ email })
        if (user && !user.isVerified) {
            user.otp = "0"
            user.lastTime = 0
            await user.save()
            console.log(`OTP cleared for ${email} after 5 minutes`)
        }
    }, 2 * 60 * 1000)

    res.status(200).json({
        message: `You successfully registered and verification code sent to: ${email}`
    })
}





//////////// emailni tasdiqlash
const verify = async (req, res, next) => {
    const { email, code } = req.body

    if (!email || !code) {
        return res.status(403).json({
            message: "Email and code should be sebt!"
        })
    }
    const foundUser = await AuthModel.findOne({ email: email })
    if (!foundUser) {
        return next(BaseError.BadRequest(403, "User not found!"))
    }

    const now = new Date()
    if (now > foundUser.lastTime) {
        return next(BaseError.BadRequest(403, "time expred"))
    }
    
    if (code  !== foundUser.otp) {
        return next(BaseError.BadRequest(403, "Verfictaion code wrong"))
    }
    
    foundUser.isVerified = true
    foundUser.otp = "0"
    foundUser.lastTime = 0
    await foundUser.save()  
    res.status(200).json({
        message: "You verified your email!"
    })
}



/////////// login
const login = async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Email va parol bo‘sh bo‘lmasligi kerak
    if (!email || !password) {
        return next(BaseError.BadRequest(400, "Email va parol to‘ldirilishi kerak"));
    }

    // 2. Foydalanuvchini topish
    const user = await AuthModel.findOne({ email });
    if (!user) {
        return next(BaseError.BadRequest(404, "Foydalanuvchi topilmadi"));
    }

    const isMatch = await bcryptjs.compare(password, user.password);



    if(isMatch && user.isVerified){
    const payload = {email: user.email, id: user.id, role: user.role} 
    const access = accessToken(payload) 
    const refresh = refreshToken(payload)   

        res.cookie("accessToken", access, {httpOnly: true, maxAge: 20 * 60 * 1000})
        res.cookie("refreshToken", refresh, {httpOnly: true, maxAge: 10 * 24 *60 * 60 * 1000})
    res.status(200).json({
        message: "Muvaffaqiyatli login qilindi",
        token: access
    })
    }
}
////////// refresh
const refresh = (req, res) => {
    try {
      const user = req.user; // tokenMiddleware dan keladi
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      res.status(200).json({
        message: "Token refreshed successfully",
        accessToken
      });
    } catch (error) {
      res.status(400).json({ message: "Server error", errors: [error.message] });
    }
  };


///////////////// logout
const logout = (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
        message: "Logout muvaffaqiyatli bajarildi"
    });
};





///////// change password
const changePassword = async (req, res, next) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;

        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            return next(BaseError.BadRequest(400, "Barcha maydonlarni toldiring"));
        }

        if (newPassword !== confirmPassword) {
            return next(BaseError.BadRequest(400, "Yangi parollar mos emas"));
        }

        const user = await AuthModel.findOne({ email });
        if (!user) {
            return next(BaseError.BadRequest(404, "Foydalanuvchi topilmadi"));
        }

        const isMatch = await bcryptjs.compare(oldPassword, user.password);
        if (!isMatch) {
            return next(BaseError.BadRequest(401, "Eski parol notogri"));
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Parol muvaffaqiyatli ozgartirildi" });

    } catch (err) {
        next(BaseError.InternalServer(500, "Serverda xatolik"));
    }
};




module.exports = {
    register,
    verify,
    login, 
    changePassword,
    logout,
    refresh
}
