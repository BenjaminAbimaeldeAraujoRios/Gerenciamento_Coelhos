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
    console.log("Coelho:", coelho);

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

  } catch (err) {
    alert("Erro ao carregar dados do coelho.");
    console.error(err);
  }
};


async function deletarCoelho() {
  if (!confirm("Deseja realmente excluir esta ficha?")) return;

  try {
    const res = await fetch(`${apiurl}/coelho/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      alert("Coelho deletado com sucesso!");
      window.location.href = 'index.html';
    } else {
      alert("Erro ao deletar coelho.");
    }
  } catch (err) {
    alert("Erro ao conectar com o servidor.");
    console.error(err);
  }
}