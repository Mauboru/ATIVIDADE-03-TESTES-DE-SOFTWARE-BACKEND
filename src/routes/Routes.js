const { Router } = require("express");
const livroRoutes = require("./livroRoutes");
const usuarioRoutes = require("./usuarioRoutes");
const emprestimoRoutes = require("./emprestimoRoutes");
const multaRoutes = require("./multaRoutes");

const router = Router();

router.use("/livros", livroRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/emprestimos", emprestimoRoutes);
router.use("/multas", multaRoutes);

module.exports = router;