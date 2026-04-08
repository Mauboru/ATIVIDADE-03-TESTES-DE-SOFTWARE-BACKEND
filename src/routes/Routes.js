const { Router } = require("express");
const livroRoutes = require("./livroRoutes");
const usuarioRoutes = require("./usuarioRoutes");
const emprestimoRoutes = require("./emprestimoRoutes");

const router = Router();

router.use("/livros", livroRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/emprestimos", emprestimoRoutes);

module.exports = router;