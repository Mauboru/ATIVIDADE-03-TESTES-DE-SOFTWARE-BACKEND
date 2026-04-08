const { Router } = require('express');
const { criar, listar, deletar, buscarPorId, atualizar, buscarPorUsuario } = require('../controllers/emprestimoController');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.delete("/:id", deletar);
router.get("/:id", buscarPorId);
router.get("/getByUser/:usuario_id", buscarPorUsuario);
router.put("/:id", atualizar);

module.exports = router;