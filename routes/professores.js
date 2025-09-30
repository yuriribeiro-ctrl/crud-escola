const express = require('express');
const router = express.Router();

let professores = [
  {
    id: 1,
    nome: 'Gustavo',
    email: 'gustavo@email.com',
    cpf: '444.444.444-44',
    curso: 'ADS',
    disciplina: 'Backend'
  },
  {
    id: 2,
    nome: 'Roger',
    email: 'roger@email.com',
    cpf: '555.555.555-55',
    curso: 'ADS',
    disciplina: 'Estrutura de Dados'
  }
];

router.get('/', (req, res) => res.json(professores));

router.get('/:id', (req, res) => {
  const professor = professores.find(p => p.id === Number(req.params.id));
  professor
    ? res.json(professor)
    : res.status(404).json({ erro: 'Professor não encontrado' });
});

router.post('/', (req, res) => {
  const novo = { id: Date.now(), ...req.body };
  professores.push(novo);
  res.status(201).json(novo);
});

router.put('/:id', (req, res) => {
  const idx = professores.findIndex(p => p.id === Number(req.params.id));
  if (idx < 0)
    return res.status(404).json({ erro: 'Professor não encontrado' });
  professores[idx] = { ...professores[idx], ...req.body };
  res.json(professores[idx]);
});

router.delete('/:id', (req, res) => {
  professores = professores.filter(p => p.id !== Number(req.params.id));
  res.status(204).end();
});

module.exports = router;