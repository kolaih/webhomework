const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

router.post('/', (req, res) => {
  const { nome, descricao, cor, peso, tipo, preco, dataCadastro } = req.body;
  if (!nome && !descricao && !cor && !peso && !tipo && !preco) {
        res.status(422).json({error: 'Informar o nome, descricao, cor, peso, tipo e preco é obrigatório!'})

  }
  const produto = {
    nome, descricao, cor, peso, tipo, preco, dataCadastro
  };
  try {
    Produto.create(produto);
    res.status(201).json({message: 'Produto cadastrado com sucesso!'})
  } catch (error) {
    res.status(500).json({ error: error });
  }
})

router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find(); // busca todos os documentos da coleção
    return res.json(produtos);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
})
router.get('/buscar/:termo', async (req, res) => {
  try {
    const { termo } = req.params;
    let produto;

    // Verifica se é um ID válido do MongoDB (24 caracteres hexadecimais)
    if (/^[0-9a-fA-F]{24}$/.test(termo)) {
      produto = await Produto.findById(termo);
    } else {
      produto = await Produto.findOne({ nome: termo });
    }

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.json(produto);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

router.delete('/produto/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const produto = await Produto.findByIdAndDelete(_id);

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar produto' });
  }
})

router.put('/produto/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const dadosAtualizados = req.body;

    const produto = await Produto.findByIdAndUpdate(_id, dadosAtualizados, {
      new: true,            // retorna o documento atualizado
      runValidators: true,  // valida os dados conforme o schema
    });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.json(produto);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});
module.exports = router;