const { Multas } = require('../models');

const criarMulta = async (emprestimo_id, quitado, tipo, valor, obs) => {
    const multa = await Multas.create({ emprestimo_id, quitado, tipo, valor, obs });
    return multa.toJSON(); 
};

const atualizarMulta = async (emprestimo_id, quitado, tipo, valor, obs, id) => {
  const multa = await Multas.findByPk(id);
  if (!multa) throw new Error('Multa não encontrada');

  if (emprestimo_id) multa.emprestimo_id = emprestimo_id;
  if (quitado) multa.quitado = quitado;
  if (tipo) multa.tipo = tipo;
  if (valor) multa.valor = valor;
  if (obs) multa.obs = obs;

  await multa.save();
  return multa;
};

const quitarMulta = async (id) => {
    const multa = await Multas.findByPk(id);
    if (!multa) throw new Error('Multa não encontrada');
    if (multa && multa.quitado) throw new Error('Multa já foi quitada!');

    multa.quitado = true;
    multa.updatedAt = Date.now();
    await multa.save();
    return multa;
}

const listarMultas = async () => {
  const multas = await Multas.findAll();
  return multas;
};

const deletarMulta = async (id) => {
  return await Multas.destroy({ where: { id }});
}

const pegarPorId = async (id) => {
  const multa = await Multas.findByPk(id);
  return multa;
}

const pegarPorIdEmprestimo = async (emprestimo_id) => {
  const multa = await Multas.findAll({ where: { emprestimo_id: emprestimo_id }});
  return multa;
}

module.exports = { criarMulta, listarMultas, pegarPorId, pegarPorIdEmprestimo, atualizarMulta, quitarMulta, deletarMulta };