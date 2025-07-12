const apiurl = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', () => {
  fetch(apiurl + '/matriz')
    .then(res => {
      console.log('Status:', res.status);
      return res.text();
    })
    .then(text => {
      console.log('Texto recebido:', text);
      // Tenta converter para JSON somente se o texto não estiver vazio
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
      console.error('Erro ao carregar matrizes:', err);
      mostrarSemDados();
    });
});

function preencherTabela(matrizes) {
  const tbody = document.getElementById('matrizTableBody');
  tbody.innerHTML = '';

  matrizes.forEach(matriz => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${matriz.data_parto || '-'}</td>
      <td>${matriz.laparos || '-'}</td>
      <td>${matriz.laparos_mortos || '-'}</td>
      <td>${matriz.laparos_transferidos || '-'}</td>
      <td>${matriz.peso_total_ninhada || '-'}</td>
      <td>${matriz.nome_reprodutor || '-'}</td>
    `;
    selecionarLinha(tr, matriz.id_matriz, 'ficha_matriz.html');
    tbody.appendChild(tr);
  });
}

function mostrarSemDados() {
  const tbody = document.getElementById('matrizTableBody');
  tbody.innerHTML = `
    <tr><td colspan="6" style="text-align:center;">Nenhum dado encontrado.</td></tr>
  `;
}

function selecionarLinha(tr, id, pagina) {
  tr.style.cursor = 'pointer';
  tr.addEventListener('click', () => {
    window.location.href = `${pagina}?id=${id}`;
  });
}



