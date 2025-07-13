async function clicarbotao() {
  const form = document.getElementById("registroForm");

  const nome_usuario = form.nome_usuario.value.trim();
  const email = form.email.value.trim();
  const senha = form.senha.value;

  if (!nome_usuario || !email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const response = await fetch('/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome_usuario, email, senha })
    });

    if (response.ok) {
      alert("Usuário registrado com sucesso!");
      window.location.href = "login.html";
    } else {
      const errorText = await response.text();
      alert("Erro ao registrar: " + errorText);
    }
  } catch (error) {
    alert("Erro na requisição: " + error.message);
  }
}
