// **************************************************************************
// Gov.UK public user search - server.js (the main driver to render the site)
// **************************************************************************


const app = require("./app");

const port = process.env.PORT || 3001;
app.listen(port);

console.log("Server running at https://localhost:3001");
