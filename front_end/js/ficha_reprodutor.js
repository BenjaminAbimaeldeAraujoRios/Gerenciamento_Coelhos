const apiurl = 'http://localhost:3000';
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const coelhoId = params.get('coelho_id') || null;

if (!id) { alert('Nenhum ID'); window.history.back(); }

window.onload = async () => {
  try{
    const res = await fetch(`${apiurl}/reprodutor/${id}`);
    if (!res.ok) throw new Error('Erro');
    const data = await res.json();
    const rep = Array.isArray(data)? data[0] : data;
    document.getElementById('data_acasalamento').value = rep.data_acasalamento ? rep.data_acasalamento.slice(0,10) : '';
    document.getElementById('numero_laparos').value = rep.numero_laparos || '';
    document.getElementById('peso_total_ninhada').value = rep.peso_total_ninhada || '';
    document.getElementById('nome_matriz').value = rep.nome_matriz || '';
  }catch(err){console.error(err); alert('Erro ao carregar');}
}

function editar(){
  // include coelho_id so the edit form keeps the parent link
  window.location.href = `adicionar_reprodutor.html?id=${id}${coelhoId ? `&coelho_id=${coelhoId}` : ''}`;
}

async function excluir(){
  if(!confirm('Confirma?')) return;
  try{
    const res = await fetch(`${apiurl}/reprodutor/${id}`, {method:'DELETE'});
    if(res.ok) window.location.href = `index_reprodutor.html${coelhoId ? `?coelho_id=${coelhoId}` : ''}`;
    else alert('Erro');
  }catch(err){console.error(err); alert('Erro');}
}

function voltar(){
  // keep the coelho filter when returning
  if (coelhoId) window.location.href = `index_reprodutor.html?coelho_id=${coelhoId}`;
  else window.history.back();
}
