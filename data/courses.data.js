let courses = [
    { id: 1, name: "Node.js Basics", duration: "40 hours" },
    { id: 2, name: "React Essentials", duration: "50 hours" }
];

module.exports = {
    getAll: () => courses,
    getById: (id) => courses.find(c => c.id === id),
    create: (name, duration) => {
        const newCourse = {
            id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
            name,
            duration
        };
        courses.push(newCourse);
        return newCourse;
    },
    update: (id, name, duration) => {
        const course = courses.find(c => c.id === id);
        if (course) {
            course.name = name;
            course.duration = duration;
        }
        return course;
    },
    remove: (id) => {
        const index = courses.findIndex(c => c.id === id);
        if (index !== -1) {
            courses.splice(index, 1);
            return true;
        }
        return false;
    }
};