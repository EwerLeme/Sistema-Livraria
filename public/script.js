var cards = document.querySelector('.cards')

function getlivros() {
  cards.innerHTML = ''

  fetch(`/listar-livros`)
  .then(response => response.json())
  .then(data => {
      var dados = data.dados
  
      console.log(dados)
      dados.map((dado) => {
          cards.innerHTML += `
          <div class="card">
            <img src="${dado.urlImagem}" alt="Capa do Livro">
            <h3>${dado.titulo}</h3>
            <p>Autor: ${dado.autor}</p>
            <p>Editora: ${dado.editora}</p>
            <p>Ano de Publicação:${dado.anoPublicacao}</p>
            <p>Quantidade Disponível: ${dado.qtdDisponivel}</p>
          </div>
         `
      })
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}

getlivros()