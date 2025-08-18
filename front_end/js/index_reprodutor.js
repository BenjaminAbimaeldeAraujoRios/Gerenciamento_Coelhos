const apiurl = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const coelhoId = params.get('id') || params.get('coelho_id') || null;
  const fetchUrl = apiurl + '/reprodutor' + (coelhoId ? `?coelho_id=${coelhoId}` : '');
  
  console.log('Carregando reprodutores - URL:', fetchUrl);
  console.log('coelhoId extraído:', coelhoId);
  
  fetch(fetchUrl)
    .then(res => {
      console.log('Resposta recebida - status:', res.status);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log('Dados recebidos:', data);
      console.log('É array?', Array.isArray(data));
      console.log('Quantidade:', data ? data.length : 0);
      
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
      <td>${rep.numero_matriz || '-'}</td>
    `;
    
    selecionarLinha(tr, rep.id_reprodutor, 'ficha_reprodutor.html'); 
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