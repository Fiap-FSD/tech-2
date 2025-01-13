const express = require('express');
const Post = require('../models/post.model');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: O ID do post
 *         title:
 *           type: string
 *           description: O título do post
 *         content:
 *           type: string
 *           description: O conteúdo do post
 *         author:
 *           type: string
 *           description: O autor do post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: A data de criação do post
 *       example:
 *         title: Meu Primeiro Post
 *         content: Este é o conteúdo do meu primeiro post.
 *         author: Seu Nome
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API para posts no blog
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retorna a lista de todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', async (req, res) => {
  try {
    console.log("Buscando todos os posts");
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: O post foi criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /posts/buscar:
 *   get:
 *     summary: Busca postagens por palavras-chave
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Resultados da busca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/buscar', async (req, res) => {
  const { q } = req.query;
  try {
    console.log("Buscando postagens por palavra-chave:", q);
    const posts = await Post.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao buscar postagens' });
  }
});


/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retorna uma postagem específica pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da postagem
 *     responses:
 *       200:
 *         description: Detalhes da postagem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Postagem não encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    console.log('Buscando postagem por ID:', req.params.id);
    const post = await Post.findById(req.params.id);
    console.log('Postagem encontrada:', post);
    if (!post) {
      return res.status(404).json({ error: 'Postagem não encontrada' });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error('Erro:', err);
    res.status(400).json({ error: 'Erro ao buscar postagem' });
  }
});




/**
 * @swagger
 * /posts/atualiza/{id}:
 *   put:
 *     summary: Edita uma postagem existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da postagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Postagem atualizada com sucesso
 *       404:
 *         description: Postagem não encontrada
 *       400:
 *         description: Erro na requisição
 */
router.put('/atualiza/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    console.log('Atualizando postagem:', req.params.id);
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Postagem não encontrada' });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar a postagem' });
  }
});


/**
 * @swagger
 * /posts/delete/{id}:
 *   delete:
 *     summary: Exclui uma postagem pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da postagem
 *     responses:
 *       200:
 *         description: Postagem excluída com sucesso
 *       404:
 *         description: Postagem não encontrada
 *       400:
 *         description: Erro na requisição
 */
router.delete('/delete/:id', async (req, res) => {
  try {
    console.log('Excluindo postagem:', req.params.id);
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Postagem não encontrada' });
    }
    res.status(200).json({ message: 'Postagem excluída com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao excluir a postagem' });
  }
});




module.exports = router;
