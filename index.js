require('dotenv').config();
const express = require('express');
const path = require('path')
const User = require('./models/user')
const livro = require('./models/livro')
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.get("/cadastroUser", (req, res) => {
    res.sendFile(__dirname + '/views/cadastroUser.html');
});
app.get("/home", (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});
app.get("/cadastroLivro", (req, res) => {
    res.sendFile(__dirname + '/views/cadastroLivro.html');
});

// app.get("/listar-alunos", async (req, res) => {
//     await aluno.findAll({
//         order:[['id', 'DESC']]
//     })
//     .then((alunos) => {
//         return res.json({
//             erro: false,
//             dados: alunos
//         })
//         }).catch(() => {
//             return res.status(400).json({
//                 erro: true,
//                 mensagem: 'erro: Aluno não cadastrado com sucesso'
//             })
//         })
// });
  
app.post("/login", async (req, res) => {
    const { email, senha } = req.body;
  
    // Verifique se o usuário existe no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ erro: true, mensagem: 'Email ou senha inválidos.' });
    }
  
    // Verifique se a senha está correta
    const senhaCorreta = user.senha == senha
    if (!senhaCorreta) {
      return res.status(401).json({ erro: true, mensagem: 'Email ou senha inválidos.' });
    }
  
    // Gere um token de autenticação
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
    // Redirecione o usuário para outra tela com o token como parâmetro na URL
    res.redirect(`/home?token=${token}`);
  });
  
  

app.post("/cadastrar-user", async (req, res) => {
    await User.create(req.body)
    .then(() => {
        return res.redirect('/')
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: 'erro: Usuario não cadastrado com sucesso'
            })
        })
});

app.post("/cadastrar-livro", async (req, res) => {
    await livro.create(req.body)
    .then(() => {
        return res.redirect('/home')
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: 'erro: Livro não cadastrado com sucesso'
            })
        })
});

app.get("/listar-livros", async (req, res) => {
    await livro.findAll({
        order:[['id', 'DESC']]
    })
    .then((livros) => {
        return res.json({
            erro: false,
            dados: livros
        })
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: 'erro: Livros não cadastrado com sucesso'
            })
        })
});

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server in listen on port ${port}`))