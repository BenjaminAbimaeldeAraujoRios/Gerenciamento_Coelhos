const apiurl = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', () => {
  fetch(apiurl + '/reprodutor')
    .then(res => {
      console.log('Status:', res.status);
      return res.text();
    })
    .then(text => {
      console.log('Texto recebido:', text);

      if (text) {
        return JSON.parse(text);
      } else {
        throw new Error('Resposta vazia do servidor');
      }
    })
    .then(data => {
      console.log('Dados recebidos:', data);
      if (Array.isArray(data) && data.length > 0) {
        preencherTabela(data);
      } else {
        mostrarSemDados();
      }
    })
    .catch(err => {
      console.error('Erro ao carregar reprodutores:', err);
      mostrarSemDados();
    });
});

function preencherTabela(reprodutores) {
  const tbody = document.getElementById('reprodutorTableBody');
  tbody.innerHTML = ''; 

  reprodutores.forEach(rep => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${rep.numero_coelho || '-'}</td>
      <td>${rep.nome_coelho || '-'}</td>
      <td>${rep.raca_coelho || '-'}</td>
      <td>${rep.data_nascimento_coelho ? new Date(rep.data_nascimento_coelho).toLocaleDateString('pt-BR') : '-'}</td>
    `;
    selecionarLinha(tr, rep.id_coelho, 'ficha_reprodutor.html');
    tbody.appendChild(tr);
  });
}

function mostrarSemDados() {
  const tbody = document.getElementById('reprodutorTableBody');
  tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum dado encontrado.</td></tr>`;
}

function selecionarLinha(tr, id, pagina) {
  tr.style.cursor = 'pointer';
  tr.addEventListener('click', () => {
    window.location.href = `${pagina}?id=${id}`;
  });
}
