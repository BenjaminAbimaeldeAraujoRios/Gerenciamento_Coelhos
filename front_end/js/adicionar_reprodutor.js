const apiurl = 'http://localhost:3000';
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let coelhoId = params.get('coelho_id');

window.onload = async () => {
  if (id) {
    // editar
    try {
      const res = await fetch(`${apiurl}/reprodutor/${id}`);
      const data = await res.json();
      const reprodutor = Array.isArray(data) ? data[0] : data;
      // ensure we know the parent coelho when editing so PATCH includes id_coelho
      if (!coelhoId && reprodutor && reprodutor.id_coelho) coelhoId = reprodutor.id_coelho;
      
      document.getElementById('data_acasalamento').value = reprodutor.data_acasalamento ? reprodutor.data_acasalamento.slice(0,10) : '';
      document.getElementById('numero_laparos').value = reprodutor.numero_laparos || '';
      document.getElementById('peso_total_ninhada').value = reprodutor.peso_total_ninhada || '';
      document.getElementById('numero_matriz').value = reprodutor.numero_matriz || '';
    } catch(err) { 
      console.error(err);
      alert('Erro ao carregar dados');
    }
  }
}

async function salvar() {
  const payload = {
    id_coelho: coelhoId ? parseInt(coelhoId) : (document.getElementById('id_coelho') ? parseInt(document.getElementById('id_coelho').value) || undefined : undefined),
    data_acasalamento: document.getElementById('data_acasalamento').value,
    numero_laparos: parseInt(document.getElementById('numero_laparos').value) || 0,
    peso_total_ninhada: document.getElementById('peso_total_ninhada').value,
    numero_matriz: parseInt(document.getElementById('numero_matriz').value) || null
  };

  try {
    const targetCoelho = payload.id_coelho || (coelhoId ? parseInt(coelhoId, 10) : null);
    if (id) {
      const res = await fetch(`${apiurl}/reprodutor/${id}`, { 
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify(payload) 
      });
      if (res.ok) {
        window.location.href = `index_reprodutor.html${targetCoelho ? `?coelho_id=${targetCoelho}` : ''}`;
      } else {
        alert('Erro ao atualizar');
      }
    } else {
      const res = await fetch(`${apiurl}/reprodutor`, { 
        method: 'POST', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify(payload) 
      });
      if (res.ok) {
        window.location.href = `index_reprodutor.html${targetCoelho ? `?coelho_id=${targetCoelho}` : ''}`;
      } else {
        alert('Erro ao adicionar');
      }
    }
  } catch(err) { 
    console.error(err); 
    alert('Erro de conexão'); 
  }
}
