const apiurl = 'http://localhost:3000';
const params = new URLSearchParams(window.location.search);
const id = params.get('id_reprodutor') || params.get('id'); // aceita ambos id_reprodutor ou id
const coelhoId = params.get('coelho_id') || null;

if (!id) {
  alert('ID do reprodutor não fornecido.');
  window.history.back();
}

window.onload = async () => {
  try {
    // Carregar dados do reprodutor
    const res = await fetch(`${apiurl}/reprodutor/${id}`);
    if (!res.ok) throw new Error('Erro ao carregar reprodutor');
    const data = await res.json();
    const rep = Array.isArray(data) ? data[0] : data;

    // Preencher dados do reprodutor
    document.getElementById('data_acasalamento').value = rep.data_acasalamento ? rep.data_acasalamento.slice(0,10) : '';
    document.getElementById('numero_laparos').value = rep.numero_laparos || '';
    document.getElementById('peso_total_ninhada').value = rep.peso_total_ninhada || '';
    document.getElementById('numero_matriz').value = rep.numero_matriz || '';

    document.getElementById('numero_matriz').value = rep.numero_matriz || '';
  } catch(err) {
    console.error(err); 
    alert('Erro ao carregar dados');
  }
}

function editar(){
  // include coelho_id so the edit form keeps the parent link
  window.location.href = `adicionar_reprodutor.html?id=${id}${coelhoId ? `&coelho_id=${coelhoId}` : ''}`;
}

async function excluir(){
  if(!confirm('Confirmar exclusão?')) return;

  if (!id) {
    console.error('ID ausente na exclusão, id=', id);
    alert('ID do reprodutor não encontrado.');
    return;
  }

  try {
    console.log('Tentando excluir reprodutor id=', id);
    const url = `${apiurl}/reprodutor/${encodeURIComponent(id)}`;
    console.log('DELETE', url);
    
    const res = await fetch(url, { 
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    // Tentar ler o corpo da resposta para mais detalhes
    let errorDetail = '';
    try {
      const text = await res.text();
      if (text) errorDetail = ': ' + text;
    } catch(e) {}
    
    console.log('Status da exclusão:', res.status, errorDetail);
    
    if (res.ok) {
      alert('Registro de reprodutor excluído com sucesso.');
      window.location.href = `index_reprodutor.html${coelhoId ? `?coelho_id=${coelhoId}` : ''}`;
    } else {
      alert(`Erro ao excluir reprodutor (status ${res.status})${errorDetail}`);
    }
  } catch (err) {
    console.error('Erro na exclusão:', err);
    alert('Erro ao conectar com servidor: ' + (err.message || err));
  }
}

function voltar(){
  // keep the coelho filter when returning
  if (coelhoId) window.location.href = `index_reprodutor.html?coelho_id=${coelhoId}`;
  else window.history.back();
}
