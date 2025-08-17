const apiurl = 'http://localhost:3000';
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let coelhoId = params.get('coelho_id');

window.onload = async () => {
  if (id) {
    // editar
    try{
      const res = await fetch(`${apiurl}/matriz/${id}`);
      const data = await res.json();
  const matriz = Array.isArray(data)? data[0] : data;
  // ensure we know the parent coelho when editing so PATCH includes id_coelho
  if (!coelhoId && matriz && matriz.id_coelho) coelhoId = matriz.id_coelho;
      document.getElementById('data_parto').value = matriz.data_parto ? matriz.data_parto.slice(0,10) : '';
      document.getElementById('laparos').value = matriz.laparos || '';
      document.getElementById('laparos_mortos').value = matriz.laparos_mortos || '';
      document.getElementById('laparos_transferidos').value = matriz.laparos_transferidos || '';
      document.getElementById('peso_total_ninhada').value = matriz.peso_total_ninhada || '';
      document.getElementById('numero_reprodutor').value = matriz.numero_reprodutor || '';
    }catch(err){console.error(err)}
  }
}

async function salvar(){
  const payload = {
  id_coelho: coelhoId ? parseInt(coelhoId) : (document.getElementById('id_coelho') ? parseInt(document.getElementById('id_coelho').value) || undefined : undefined),
    data_parto: document.getElementById('data_parto').value,
    laparos: parseInt(document.getElementById('laparos').value) || 0,
    laparos_mortos: parseInt(document.getElementById('laparos_mortos').value) || 0,
    laparos_transferidos: parseInt(document.getElementById('laparos_transferidos').value) || 0,
    peso_total_ninhada: document.getElementById('peso_total_ninhada').value,
    numero_reprodutor: parseInt(document.getElementById('numero_reprodutor').value) || null
  };

  try{
    const targetCoelho = payload.id_coelho || (coelhoId ? parseInt(coelhoId, 10) : null);
    if (id) {
      const res = await fetch(`${apiurl}/matriz/${id}`, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if (res.ok) window.location.href = `index_matriz.html${targetCoelho ? `?coelho_id=${targetCoelho}` : ''}`;
      else alert('Erro ao atualizar');
    } else {
      const res = await fetch(`${apiurl}/matriz`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if (res.ok) window.location.href = `index_matriz.html${targetCoelho ? `?coelho_id=${targetCoelho}` : ''}`;
      else alert('Erro ao adicionar');
    }
  }catch(err){console.error(err); alert('Erro de conexão');}
}
