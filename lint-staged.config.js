
module.exports = {
  "backend/**/*.{ts,js}": ["npm --prefix backend run lint", "npm --prefix backend run format"],
};
