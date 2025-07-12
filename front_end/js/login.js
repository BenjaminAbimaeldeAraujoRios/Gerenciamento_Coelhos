app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios.");
    }

    const usuario = await UsuarioRota.login(email);

    if (!usuario) {
        return res.status(404).send("Usuário não encontrado.");
    }

   
    const resultado = await UsuarioRota.criarHash(senha, usuario.tempero);

  console.log(resultado.hash);
  console.log(usuario.senha);

    if (resultado.hash !== usuario.senha) {
        return res.status(401).send("Senha incorreta.");
    }


    res.status(200).json({ mensagem: "Login realizado com sucesso", usuario });
});


 