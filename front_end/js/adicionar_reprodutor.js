const apiurl = 'http://localhost:3000';
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let coelhoId = params.get('coelho_id') || params.get('id') || null; // prefer explicit coelho_id

window.onload = async () => {
  if (id) {
    try{
      const res = await fetch(`${apiurl}/reprodutor/${id}`);
      const data = await res.json();
      const rep = Array.isArray(data)? data[0] : data;
      document.getElementById('data_acasalamento').value = rep.data_acasalamento ? rep.data_acasalamento.slice(0,10) : '';
      document.getElementById('numero_laparos').value = rep.numero_laparos || '';
      document.getElementById('peso_total_ninhada').value = rep.peso_total_ninhada || '';
      document.getElementById('numero_matriz').value = rep.numero_matriz || '';
      // Ensure we know parent matriz id when editing
      if (!coelhoId && rep && rep.numero_matriz) coelhoId = rep.numero_matriz;
    }catch(err){console.error(err)}
  }
}

async function salvar(){
  const payload = {
    data_acasalamento: document.getElementById('data_acasalamento').value,
    numero_matriz: parseInt(document.getElementById('numero_matriz').value) || (coelhoId ? parseInt(coelhoId) : null),
    numero_laparos: parseInt(document.getElementById('numero_laparos').value) || 0,
    peso_total_ninhada: document.getElementById('peso_total_ninhada').value
  };

  try{
    // compute which coelho_id to return to (prefer payload.numero_matriz, fallback to coelhoId from querystring)
    const targetCoelho = payload.numero_matriz || (coelhoId ? parseInt(coelhoId, 10) : null);
    if (id) {
      const res = await fetch(`${apiurl}/reprodutor/${id}`, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if (res.ok) window.location.href = `index_reprodutor.html${targetCoelho ? `?coelho_id=${targetCoelho}` : ''}`;
      else alert('Erro ao atualizar');
    } else {
      const res = await fetch(`${apiurl}/reprodutor`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if (res.ok) window.location.href = `index_reprodutor.html${targetCoelho ? `?coelho_id=${targetCoelho}` : ''}`;
      else alert('Erro ao adicionar');
    }
  }catch(err){console.error(err); alert('Erro de conexão');}
}
