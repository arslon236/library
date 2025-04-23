
const path = require('path');

// Faylni yuklash funksiyasi
const uploadFile = async (req, res) => {
  try {
    // Agar fayl yuklanmagan bo'lsa, xato qaytarish
    if (!req.file) {
      return res.status(400).json({ message: 'Fayl yuklanmadi!' });
    }

    // Fayl muvaffaqiyatli yuklangan bo'lsa, ma'lumot qaytarish
    res.status(200).json({
      message: 'Fayl muvaffaqiyatli yuklandi!',
      file: {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error('Fayl yuklashda xato:', error);
    res.status(500).json({ message: 'Server xatosi!' });
  }
};

module.exports = {
  uploadFile,
};