let todosOsCoelhos = [];
let tipoAtual = 'Matriz';
const apiurl="http://localhost:3000"
document.addEventListener('DOMContentLoaded', () => {
  fetch(apiurl+'/coelhos')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      todosOsCoelhos = data;
      filtrarPorTipo(tipoAtual);
    })
    .catch(err => {
      console.error('Erro ao carregar coelhos:', err);
    });




    
  function ativarBotao(id) {
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById(id);
    if (btn) btn.classList.add('active');
  }

  document.getElementById('matrizesTab').addEventListener('click', () => {
    ativarBotao('matrizesTab');
    tipoAtual = 'Matriz';
    filtrarPorTipo(tipoAtual);
  });

  document.getElementById('reprodutoresTab').addEventListener('click', () => {
    ativarBotao('reprodutoresTab');
    tipoAtual = 'Reprodutor';
    filtrarPorTipo(tipoAtual);
  });

  document.getElementById('laparosTab').addEventListener('click', () => {
    ativarBotao('laparosTab');
    tipoAtual = 'Láparo';
    filtrarPorTipo(tipoAtual);
  });

  document.getElementById('searchInput').addEventListener('input', () => {
    filtrarPorTipo(tipoAtual);
  });
});




function filtrarPorTipo(tipo) {
  const tbody = document.getElementById('coelhoTableBody');
  const busca = document.getElementById('searchInput').value.toLowerCase();
  tbody.innerHTML = '';

  todosOsCoelhos.forEach(coelho => {
    if (
      coelho.tipo_coelho?.toLowerCase() === tipo.toLowerCase() &&
      (
        coelho.nome_coelho?.toLowerCase().includes(busca) ||
        coelho.numero_coelho?.toString().includes(busca) ||
        coelho.raca_coelho?.toLowerCase().includes(busca)
      )
    ) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${coelho.numero_coelho}</td>
        <td>${coelho.nome_coelho}</td>
        <td>${coelho.raca_coelho}</td>
        <td>${coelho.matriz_coelho || '-'}</td>
        <td>${coelho.reprodutor_coelho || '-'}</td>
      `;
      selecionarcoelho(tr, coelho.id_coelho);
      tbody.appendChild(tr);
    }
  });
}





function selecionarcoelho(tr, idCoelho) {
  tr.style.cursor = 'pointer';
  tr.addEventListener('click', () => {
    window.location.href = `ficha.html?id=${idCoelho}`;
  });
}
