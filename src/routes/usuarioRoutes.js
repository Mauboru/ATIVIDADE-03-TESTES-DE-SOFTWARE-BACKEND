const { Router } = require('express');
const { criar, listar, buscarPorId, atualizar, deletar } = require('../controllers/usuarioController');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/:id", buscarPorId);
router.put("/:id", atualizar);
router.delete("/:id", deletar);

module.exports = router;