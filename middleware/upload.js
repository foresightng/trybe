const multer = require('multer');

// Configure Multer to use memory storage, which stores the files in memory as Buffer objects
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
}).single('image'); // 'image' is the field name

// Middleware to convert buffer to base64
const convertToBase64 = (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        
        // Convert buffer to base64
        const base64Image = req.file.buffer.toString('base64');
        
        // Attach base64 string to request object
        req.file.base64 = base64Image;

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Export both middlewares as a single middleware
module.exports = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        
        // If upload is successful, convert to base64
        convertToBase64(req, res, next);
    });
};
