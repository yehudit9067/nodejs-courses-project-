const http = require('http');

// מערך הקורסים באנגלית
const courses = [
    { id: 1, name: "Mobile App Development", description: "Learn to build mobile applications from scratch" },
    { id: 2, name: "Introduction to Computer Science", description: "Fundamentals of programming and algorithmic thinking" },
    { id: 3, name: "Web Development with Node.js", description: "Advanced and fast back-end development" }
];

const PORT = 3000;

// יצירת השרת
const server = http.createServer((req, res) => {
    // הגדרת כותרת תגובה שתומכת ב-JSON
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    
    // שליחת מערך הקורסים כטקסט JSON לדפדפן
    res.end(JSON.stringify(courses, null, 2));
});

// הפעלת השרת וטעינה של chalk
server.listen(PORT, async () => {
    // טעינה דינמית של chalk שתואמת ל-CommonJS
    const { default: chalk } = await import('chalk');

    console.log(chalk.blue.bold(`\n[Server] Running at: http://localhost:${PORT}`));
    
    // הדפסת רשימת הקורסים בצורה צבעונית בטרמינל
    console.log(chalk.magenta.underline("\n=== Course List ==="));
    
    courses.forEach(course => {
        console.log(
            chalk.cyan(`ID: ${course.id}`) + ' | ' +
            chalk.yellow.bold(`Name: ${course.name}`) + ' | ' +
            chalk.white(`Description: ${course.description}`)
        );
    });
    console.log(chalk.magenta("===================\n"));
});