module.exports = (array, by) => [...array].sort((a, b) => b[by] - a[by]);
