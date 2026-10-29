const fs = require('fs').promises;
const path = require('path');

// תיקיית הנתונים — נתיב מוחלט, לא תלוי בתיקייה שממנה מריצים
const DATA_DIR = path.join(__dirname, '..', 'data');

// קריאת קובץ JSON; אם הקובץ לא קיים מחזיר מערך ריק
async function readJson(fileName) {
    const filePath = path.join(DATA_DIR, fileName);
    try {
        const raw = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
}

// כתיבת מערך JSON לקובץ (דורס)
async function writeJson(fileName, data) {
    const filePath = path.join(DATA_DIR, fileName);
    const content = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, content, 'utf-8');
}

module.exports = { readJson, writeJson };
