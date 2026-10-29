const { readJson, writeJson } = require('../utils/fileStore');

const FILE_NAME = 'courses.json';

module.exports = {
    getAll: async () => {
        return await readJson(FILE_NAME);
    },

    getById: async (id) => {
        const courses = await readJson(FILE_NAME);
        return courses.find(c => c.id === id);
    },

    create: async (name, duration) => {
        const courses = await readJson(FILE_NAME);
        // מייצר ID ייחודי לפי ה-ID המקסימלי הקיים (עמיד למחיקות)
        const nextId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
        const newCourse = { id: nextId, name, duration };
        courses.push(newCourse);
        await writeJson(FILE_NAME, courses);
        return newCourse;
    },

    update: async (id, name, duration) => {
        const courses = await readJson(FILE_NAME);
        const course = courses.find(c => c.id === id);
        if (!course) return null;

        // עדכון רק של השדות שנשלחו (מונע דריסה על ידי undefined)
        if (name !== undefined) course.name = name;
        if (duration !== undefined) course.duration = duration;

        await writeJson(FILE_NAME, courses);
        return course;
    },

    remove: async (id) => {
        const courses = await readJson(FILE_NAME);
        const index = courses.findIndex(c => c.id === id);
        if (index === -1) return false;

        courses.splice(index, 1);
        await writeJson(FILE_NAME, courses);
        return true;
    }
};
