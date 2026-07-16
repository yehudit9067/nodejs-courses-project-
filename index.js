const express = require('express');

// ייבוא קבצי הנתונים המקומיים שיצרת בשלב הקודם
const courses = require('./courses');
const students = require('./students');

const app = express();
const PORT = 3000;

// 1. הגדרת נתיב (Route) לכתובת הבית הראשית: http://localhost:3000
// נתיב זה מחזיר אובייקט JSON פשוט עם מידע קצר ותיאור על השרת
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to the School API",
        description: "This server manages courses and students data."
    });
});

// 2. נתיב הקורסים: http://localhost:3000/courses
app.get('/courses', (req, res) => {
    // החזרת מערך הקורסים שייבאנו מהקובץ courses.js
    res.json(courses);
});

app.get('/students', (req, res) => {
    // החזרת מערך התלמידים שייבאנו מהקובץ students.js
    res.json(students);
});

// הפעלת השרת וטעינת chalk לצורך הדפסה צבעונית בטרמינל
app.listen(PORT, async () => {
    const { default: chalk } = await import('chalk');

    console.log(chalk.blue.bold(`\n[Server] Express server is running at: http://localhost:${PORT}`));
    console.log(chalk.green(`[Server] Press Ctrl+C to stop the server\n`));
});