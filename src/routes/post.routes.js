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

module.exports = router;
