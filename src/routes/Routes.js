const { Router } = require("express");
const livroRoutes = require("./livroRoutes");

const router = Router();
router.use("/livros", livroRoutes);

module.exports = router;