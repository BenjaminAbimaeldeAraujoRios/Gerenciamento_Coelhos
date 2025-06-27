// Obtém o ID do coelho da URL (ex: ?id=3)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("Nenhum ID de coelho fornecido.");
  window.history.back();
}

// Carrega os dados do coelho ao abrir a página
window.onload = async () => {
  try {
    const res = await fetch(`/coelho/${id}`);
    const coelho = await res.json();

    // Preenche os campos da ficha com os dados
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

// Atualiza os dados
document.querySelector(".update").onclick = async () => {
  const body = {
    nome_coelho: document.getElementById("nome_coelho").value,
    raca_coelho: document.getElementById("raca_coelho").value,
    data_nascimento_coelho: document.getElementById("data_nascimento_coelho").value,
    sexo_coelho: document.getElementById("sexo_coelho").value,
    observacoes_coelho: document.getElementById("observacoes_coelho").value,
    peso_nascimento: document.getElementById("peso_nascimento").value,
    peso_atual: document.getElementById("peso_atual").value,
    tipo_coelho: document.getElementById("tipo_coelho").value,
    data_desmame: document.getElementById("data_desmame").value
  };

  try {
    const res = await fetch(`/coelho/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      alert("Coelho atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar coelho.");
    }
  } catch (err) {
    alert("Erro ao conectar com o servidor.");
    console.error(err);
  }
};

// Deleta a ficha
document.querySelector(".delete").onclick = async () => {
  if (!confirm("Deseja realmente excluir esta ficha?")) return;

  try {
    const res = await fetch(`/coelho/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      alert("Coelho deletado com sucesso!");
      window.location.href = "/coelhos"; // redireciona para lista
    } else {
      alert("Erro ao deletar coelho.");
    }
  } catch (err) {
    alert("Erro ao conectar com o servidor.");
    console.error(err);
  }
};
