const { Router } = require('express');
const { criar, listar, deletar, buscarPorId, atualizar, buscarPorEmprestimo, quitar } = require('../controllers/multasController');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.put("/:id", atualizar);
router.put("/quitar/:id", quitar);
router.delete("/:id", deletar);
router.get("/:id", buscarPorId);
router.get("/getByEmprestimo/:emprestimo_id", buscarPorEmprestimo);

module.exports = router;