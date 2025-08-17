const apiurl = 'http://localhost:3000';
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const coelhoId = params.get('coelho_id') || null;

if (!id) {
  alert('Nenhum ID fornecido.');
  window.history.back();
}

window.onload = async () => {
  try {
    const res = await fetch(`${apiurl}/matriz/${id}`);
    if (!res.ok) throw new Error('Erro ao buscar matriz: ' + res.status);
    const data = await res.json();
    const matriz = Array.isArray(data) ? data[0] : data;

    document.getElementById('data_parto').value = matriz.data_parto ? matriz.data_parto.slice(0,10) : '';
    document.getElementById('laparos').value = matriz.laparos || '';
    document.getElementById('laparos_mortos').value = matriz.laparos_mortos || '';
    document.getElementById('laparos_transferidos').value = matriz.laparos_transferidos || '';
    document.getElementById('peso_total_ninhada').value = matriz.peso_total_ninhada || '';
    document.getElementById('numero_reprodutor').value = matriz.numero_reprodutor || '';

  } catch (err) {
    alert('Erro ao carregar dados.');
    console.error(err);
  }
};

function editar(){
  window.location.href = `adicionar_matriz.html?id=${id}${coelhoId ? `&coelho_id=${coelhoId}` : ''}`;
}

async function excluir(){
  if (!confirm('Confirmar exclusão?')) return;
  try{
    const res = await fetch(`${apiurl}/matriz/${id}`, { method: 'DELETE' });
    if (res.ok) window.location.href = `index_matriz.html${coelhoId ? `?coelho_id=${coelhoId}` : ''}`;
    else alert('Erro ao excluir.');
  }catch(err){
    console.error(err);
    alert('Erro ao conectar com servidor.');
  }
}

function voltar(){
  if (coelhoId) window.location.href = `index_matriz.html?coelho_id=${coelhoId}`;
  else window.history.back();
}
