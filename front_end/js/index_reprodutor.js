const apiurl = "http://localhost:3000";
document.addEventListener('DOMContentLoaded', () => {
  fetch(apiurl + '/reprodutor')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      preencherTabela(data);
    })
    .catch(err => {
      console.error('Erro ao carregar reprodutores:', err);
    });
});

function preencherTabela(reprodutores) {
  const tbody = document.getElementById('coelhoTableBody');
  tbody.innerHTML = '';

  reprodutores.forEach(rep => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${rep.data_acasalamento || '-'}</td>
      <td>${rep.numero_matriz || '-'}</td>
      <td>${rep.numero_laparos || '-'}</td>
    `;
    selecionarLinha(tr, rep.id_reprodutor, 'ficha_reprodutor.html');
    tbody.appendChild(tr);
  });
}

function selecionarLinha(tr, id, pagina) {
  tr.style.cursor = 'pointer';
  tr.addEventListener('click', () => {
    window.location.href = `${pagina}?id=${id}`;
  });
}
