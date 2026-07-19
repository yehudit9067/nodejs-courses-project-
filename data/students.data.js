let students = [
    { id: 1, name: "Israel Israeli", email: "israel@example.com" },
    { id: 2, name: "Sarah Levi", email: "sarah@example.com" }
];

module.exports = {
    getAll: () => students,
    getById: (id) => students.find(s => s.id === id),
    exists: (id) => students.some(s => s.id === id),
    create: (name, email) => {
        const newStudent = {
            id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
            name,
            email
        };
        students.push(newStudent);
        return newStudent;
    },
    update: (id, name, email) => {
    const student = students.find(s => s.id === id);
    if (!student) return null; // הגנה: החזרת null ברור אם הסטודנט לא קיים

    // עדכון רק של השדות שנשלחו (מונע דריסה על ידי undefined)
    if (name !== undefined) student.name = name;
    if (email !== undefined) student.email = email;

    return student;
},
    remove: (id) => {
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students.splice(index, 1);
            return true;
        }
        return false;
    }
};