const apiurl = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const coelhoId = params.get('id') || params.get('coelho_id') || null;
  const fetchUrl = apiurl + '/reprodutor' + (coelhoId ? `?coelho_id=${coelhoId}` : '');
  console.log('Fetching reprodutores from', fetchUrl);
  fetch(fetchUrl)
    .then(res => {
      console.log('Status da resposta do reprodutor:', res.status);
      // Verifica se a resposta HTTP foi bem-sucedida (status 2xx)
      if (!res.ok) {
        // Se não for OK, tenta ler o corpo da resposta como texto e joga um erro
        return res.text().then(text => {
          throw new Error(`HTTP error! status: ${res.status}, response: ${text}`);
        });
      }
      return res.json(); // Se OK, tenta parsear a resposta como JSON
    })
    .then(data => {
      console.log('Dados de reprodutores recebidos:', data);
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
      <td>${rep.data_acasalamento ? new Date(rep.data_acasalamento).toLocaleDateString('pt-BR') : '-'}</td>
      <td>${rep.numero_laparos || '-'}</td>
      <td>${rep.peso_total_ninhada || '-'}</td> 
      <td>${rep.nome_matriz || '-'}</td> 
    `;
  // Assegure-se de que 'id_reprodutor' exista no objeto retornado pelo seu modelo Reprodutor
  const coelhoParam = params.get('coelho_id') ? `?coelho_id=${params.get('coelho_id')}` : '';
  selecionarLinha(tr, rep.id_reprodutor, 'ficha_reprodutor.html' + coelhoParam); 
    tbody.appendChild(tr);
  });
}

function mostrarSemDados() {
  const tbody = document.getElementById('reprodutorTableBody');
  // Colspan deve corresponder ao número de colunas no seu thead (4 colunas)
  tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum dado encontrado.</td></tr>`;
}

function selecionarLinha(tr, id, pagina) {
  tr.style.cursor = 'pointer';
  tr.addEventListener('click', () => {
    window.location.href = `${pagina}?id=${id}`;
  });
}

// Add button behavior (if present on the page)
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const coelhoId = params.get('id') || params.get('coelho_id') || null;
  const btn = document.getElementById('btnAdicionar');
  if (btn) {
    btn.addEventListener('click', () => {
  const target = 'adicionar_reprodutor.html' + (coelhoId ? `?coelho_id=${coelhoId}` : '');
      window.location.href = target;
    });
  }
});