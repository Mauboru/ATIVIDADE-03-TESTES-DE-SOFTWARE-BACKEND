const { Router } = require("express");
const livroRoutes = require("./livroRoutes");
const usuarioRoutes = require("./usuarioRoutes");

const router = Router();
router.use("/livros", livroRoutes);
router.use("/usuarios", usuarioRoutes);

module.exports = router;