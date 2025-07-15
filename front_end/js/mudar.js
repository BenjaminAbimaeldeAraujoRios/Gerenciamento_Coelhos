async function alterarSenha() {
  const form = document.getElementById("formAlterarSenha");

  const email = form.email.value.trim();
  const senha = form.nova_senha.value;

  if (!email || !senha || senha.length < 8) {
    alert("Preencha todos os campos corretamente. Senha deve ter no mínimo 8 caracteres.");
    return;
  }

  try {
    const response = await fetch("/alterarSenha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.mensagem);
      window.location.href = "login.html";
    } else {
      alert("Não foi possível alterar a senha.");
    }
  } catch (error) {
    alert("Erro na requisição. Tente novamente.");
  }
}
