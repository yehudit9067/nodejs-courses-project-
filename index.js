//טעינת משתני הסביבה
require('dotenv').config();
const express = require('express');
const app = express();

//קליטת הפורט והמפתח הסודי
const PORT = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;

// ייבוא הנתבים (Routes) של כל אחת מהישויות
const coursesRoutes = require('./routes/courses.routes');
const studentsRoutes = require('./routes/students.routes');
const enrollmentsRoutes = require('./routes/enrollments.routes');

//דוגמא לשימוש במפתח הסודי
const myMiddleware = (req, res, next) => {
  const userKey = req.headers['authorization'];
  if (userKey === secretKey) {
    next();
  } else {
    res.status(403).send('גישה נדחתה: מפתח סודי שגוי');
  }
};

app.use(myMiddleware);

app.get('/', (req, res) => {
  res.send('הפרויקט פועל בהצלחה עם משתני סביבה!');
});

app.listen(PORT, () => {
  console.log(`השרת רץ ומוזן בפורט ${PORT}`);
});

// מידלוור חובה לקבלת נתוני JSON בגוף הבקשה (POST/PUT)
app.use(express.json());
// ----------------------------------------------------
// מידלוור אימות ולוגים גלובלי
// ----------------------------------------------------
app.use((req, res, next) => {
    // הדפסת לוג ל-console עבור כל קריאה נכנסת
    console.log(`[Request Log] ${req.method} --> ${req.url}`);

    // הגדרת הערך הסודי המצופה בכותרת
    const EXPECTED_AUTH_KEY = 'mySecretSchoolKey123';
    
    // שליפת הכותרת auth-key (Express ממיר אוטומטית לאותיות קטנות)
    const clientAuthKey = req.get('auth-key');

    // בדיקה האם הכותרת קיימת ותואמת לערך המצופה
    if (!clientAuthKey || clientAuthKey !== EXPECTED_AUTH_KEY) {
        return res.status(401).json({ 
            status: "error", 
            message: "Unauthorized: Missing or invalid auth-key header." 
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