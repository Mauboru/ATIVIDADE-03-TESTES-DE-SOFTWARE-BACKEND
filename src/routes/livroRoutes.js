const { Router } = require('express');
const { criar, listar, deletar, buscarPorId, atualizar, listarDisponiveis } = require('../controllers/livroController');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/disponiveis", listarDisponiveis);
router.get("/:id", buscarPorId);
router.put("/:id", atualizar);
router.delete('/:id', deletar);

module.exports = router;