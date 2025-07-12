const apiurl = "http://localhost:3000";
document.addEventListener('DOMContentLoaded', () => {
  fetch(apiurl + '/matriz')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      preencherTabela(data);
    })
    .catch(err => {
      console.error('Erro ao carregar matrizes:', err);
    });
});

function preencherTabela(matrizes) {
  const tbody = document.getElementById('coelhoTableBody');
  tbody.innerHTML = '';

  matrizes.forEach(matriz => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${matriz.data_parto || '-'}</td>
      <td>${matriz.laparos || '-'}</td>
      <td>${matriz.laparos_mortos || '-'}</td>
      <td>${matriz.laparos_transferidos || '-'}</td>
      <td>${matriz.peso_total_ninhada || '-'}</td>
      <td>${matriz.id_controle || '-'}</td>
      <td>${matriz.numero_reprodutor || '-'}</td>
    `;
    selecionarLinha(tr, matriz.id_matriz, 'ficha_matriz.html');
    tbody.appendChild(tr);
  });
}

function selecionarLinha(tr, id, pagina) {
  tr.style.cursor = 'pointer';
  tr.addEventListener('click', () => {
    window.location.href = `${pagina}?id=${id}`;
  });
}
