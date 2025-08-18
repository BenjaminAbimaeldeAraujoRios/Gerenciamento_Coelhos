const apiurl = 'http://localhost:3000';
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

window.onload = async () => {
  if (id) {
    try {
      const res = await fetch(`${apiurl}/reprodutor/${id}`);
      const data = await res.json();
      const rep = Array.isArray(data) ? data[0] : data;
      
      document.getElementById('data_acasalamento').value = rep.data_acasalamento ? rep.data_acasalamento.slice(0,10) : '';
      document.getElementById('numero_laparos').value = rep.numero_laparos || '';
      document.getElementById('peso_total_ninhada').value = rep.peso_total_ninhada || '';
      document.getElementById('numero_matriz').value = rep.numero_matriz || '';
    } catch(err) { 
      console.error(err);
      alert('Erro ao carregar dados');
    }
  }
}

async function salvar() {
  const payload = {
    id_coelho: parseInt(document.getElementById('numero_matriz').value),
    data_acasalamento: document.getElementById('data_acasalamento').value,
    numero_laparos: parseInt(document.getElementById('numero_laparos').value) || 0,
    peso_total_ninhada: document.getElementById('peso_total_ninhada').value,
    numero_matriz: parseInt(document.getElementById('numero_matriz').value)
  };

  try {
    if (id) {
      const res = await fetch(`${apiurl}/reprodutor/${id}`, { 
        method: 'PATCH', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify(payload) 
      });
      if (res.ok) {
        window.location.href = 'index_reprodutor.html';
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
        window.location.href = 'index_reprodutor.html';
      } else {
        alert('Erro ao adicionar');
      }
    }
  } catch(err) { 
    console.error(err); 
    alert('Erro de conexão'); 
  }
}
