const express = require("express");
const server = express();
server.use(express.json());

const cursos = ["Node JS", "JavaScript", "PHP", "Python", "React", "Vue"];

//query params = ?nome=NodeJS => p/ manipular infs que existem nas rotas da requisição
//Route params = /curso/2 => parametros que nos ajudam a manipular rotas
//Request body = { nome: 'Node JS', tipo: 'Backend'}

//criando meu select
server.get("/cursos", (req, res) => {
  return res.json(cursos);
});

//middleware global
server.use((req, res, next) => {
  console.log(`URL CHAMADA: ${req.url}`);
  return next();
});

//middleware local especifico para tratar do insert de novos cursos
function checkCurso(req, res, next) {
  if (!req.body.novo_curso) {
    return res.status(400).json({ error: "Nome do curso é obrigatorio" });
  }
  return next();
}

//permitindo inserir dados via api
server.post("/curso", checkCurso, (req, res) => {
  const { novo_curso } = req.body;
  console.log(novo_curso);
  cursos.push(novo_curso);

  return res.json(cursos);
});
//permitindo update de um curso
server.put("/curso/:index", (req, res) => {
  const { index } = req.params;
  const { curso } = req.body;

  cursos[index] = curso;

  return res.json(cursos);
});

//criando o delete de um curso
server.delete("/curso/:index", (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json({ message: "Curso deletado com sucesso!" });
});

server.get("/curso/:index", (req, res) => {
  const { index } = req.params;
  return res.json(cursos[index]);
  // const nome = req.query.nome;
  // const id = req.params.id;

  // return res.json({ curso: `${id}`, nome: `${nome}` });
});

server.listen(3000);
