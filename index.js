//טעינת משתני הסביבה - קובץ ה-.env נמצא בתיקיית services
require('dotenv').config({ path: require('path').join(__dirname, 'services', '.env') });
const express = require('express');
const app = express();

//קליטת הפורט והמפתח הסודי
const PORT = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;

// ייבוא הנתבים (Routes) של כל אחת מהישויות
const coursesRoutes = require('./routes/courses.routes');
const studentsRoutes = require('./routes/students.routes');
const enrollmentsRoutes = require('./routes/enrollments.routes');

// מידלוור חובה לקבלת נתוני JSON בגוף הבקשה (POST/PUT)
app.use(express.json());
// ----------------------------------------------------
// מידלוור אימות ולוגים גלובלי
// ----------------------------------------------------
app.use((req, res, next) => {
    // הדפסת לוג ל-console עבור כל קריאה נכנסת
    console.log(`[Request Log] ${req.method} --> ${req.url}`);

    // בדיקה שהמפתח הסודי אכן הוגדר ב-.env
    if (!secretKey) {
        return res.status(500).json({
            status: "error",
            message: "Server misconfiguration: SECRET_KEY is not set."
        });
    }

    // שליפת הכותרת authorization (Express ממיר אוטומטית לאותיות קטנות)
    const clientAuthKey = req.get('authorization');

    // בדיקה האם הכותרת קיימת ותואמת למפתח הסודי
    if (!clientAuthKey || clientAuthKey !== secretKey) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized: Missing or invalid authorization header."
        });
    }

    // אם האימות הצליח, ממשיכים הלאה
    next();
});
// ----------------------------------------------------

// הגדרת נתיב (Route) בסיסי לכתובת הבית
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to the School API",
        description: "This server manages courses, students, and enrollments data."
    });
});

// חיווט הנתבים השונים לנתיבי הבסיס שלהם (Prefix)
app.use('/courses', coursesRoutes);
app.use('/students', studentsRoutes);
app.use('/enrollments', enrollmentsRoutes);

// הפעלת השרת והאזנה לפורט שהוגדר
app.listen(PORT, async () => {
    const { default: chalk } = await import('chalk');

    console.log(chalk.blue.bold(`\n[Server] Express server is running at: http://localhost:${PORT}`));
    console.log(chalk.green(`[Server] Press Ctrl+C to stop the server\n`));
});