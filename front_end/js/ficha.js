const apiurl = "http://localhost:3000";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("Nenhum ID de coelho fornecido.");
  window.history.back();
}

window.onload = async () => {
  try {
    const res = await fetch(`${apiurl}/coelho/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar coelho: " + res.status);

    const data = await res.json();
    const coelho = Array.isArray(data) ? data[0] : data;

    document.getElementById("numero_coelho").value = coelho.numero_coelho || "";
    document.getElementById("raca_coelho").value = coelho.raca_coelho || "";
    document.getElementById("data_nascimento_coelho").value = coelho.data_nascimento_coelho?.slice(0, 10) || "";
    document.getElementById("peso_nascimento").value = coelho.peso_nascimento || "";
    document.getElementById("data_desmame").value = coelho.data_desmame?.slice(0, 10) || "";
    document.getElementById("peso_atual").value = coelho.peso_atual || "";
    document.getElementById("nome_coelho").value = coelho.nome_coelho || "";
    document.getElementById("sexo_coelho").value = coelho.sexo_coelho || "";
    document.getElementById("tipo_coelho").value = coelho.tipo_coelho || "";
    document.getElementById("matriz_coelho").value = coelho.matriz_coelho || "";
    document.getElementById("reprodutor_coelho").value = coelho.reprodutor_coelho || "";
  document.getElementById("observacoes_coelho").value = coelho.observacoes_coelho || "";
  document.getElementById("situacao_coelho").value = coelho.situacao_coelho || coelho.situacao || "";
  document.getElementById("transferido_coelho").value = coelho.transferido_coelho || "";

  esconderbotaolaparo();

  } catch (err) {
    alert("Erro ao carregar dados do coelho.");
    console.error(err);
  }
};

function esconderbotaolaparo() {
  const tipo = document.getElementById("tipo_coelho")?.value || '';
  // normaliza para comparar sem acento e sem maiúsculas
  const normalizado = tipo
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
  if (normalizado === 'laparo') {
    const botao = document.getElementById('botaocruzas');
    if (botao) botao.style.display = 'none';
  }
}
