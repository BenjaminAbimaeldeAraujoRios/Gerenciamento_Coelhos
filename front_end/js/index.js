let todosOsCoelhos = [];
const apiurl = "http://localhost:3000";

function normalizeStr(s) {
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

document.addEventListener('DOMContentLoaded', () => {
  fetch(apiurl + '/coelhos')
    .then(res => res.json())
    .then(data => {
      todosOsCoelhos = data;
      aplicarFiltros();
    })
    .catch(() => {});

  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  const statusFilter = document.getElementById('statusFilter');

  if (searchInput) searchInput.addEventListener('input', aplicarFiltros);
  if (typeFilter) typeFilter.addEventListener('change', aplicarFiltros);
  if (statusFilter) statusFilter.addEventListener('change', aplicarFiltros);
});

function aplicarFiltros() {
  const tbody = document.getElementById('coelhoTableBody');
  const busca = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const tipo = document.getElementById('typeFilter')?.value || 'Matriz';
  const status = (document.getElementById('statusFilter')?.value || '').toLowerCase();
  tbody.innerHTML = '';

  todosOsCoelhos.forEach(coelho => {
    const tipoOk = normalizeStr(coelho.tipo_coelho) === normalizeStr(tipo);
    const situacao = (coelho.situacao_coelho || coelho.situacao || '').toLowerCase();
    const statusOk = !status || situacao === status;
    const buscaOk = (
      (coelho.nome_coelho || '').toLowerCase().includes(busca) ||
      (coelho.numero_coelho != null && coelho.numero_coelho.toString().includes(busca)) ||
      (coelho.raca_coelho || '').toLowerCase().includes(busca)
    );

    if (tipoOk && statusOk && buscaOk) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${coelho.numero_coelho ?? '-'}</td>
        <td>${coelho.nome_coelho ?? '-'}</td>
        <td>${coelho.raca_coelho ?? '-'}</td>
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
