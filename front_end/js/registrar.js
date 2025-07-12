   app.post('/usuario',async (req, res) => {
         const { nome_usuario, email, senha } = req.body;
        if(!req.body.nome_usuario){
             return res.status(400).send("Faltou o nome!");
        }
         if(!req.body.email
            || !/[a-z]+@[a-z\.]+\.com/.test(email)
            || req.body.email?.length > 300)
        return res.status(400).send("Faltou o email!!");

    if(!req.body.senha || req.body.senha?.length < 8)
        return res.status(400).send("Faltou a senha, ou ta curta. Mínimo de 8 caracteres");

     const resultado =   await UsuarioRota.criarHash(senha);
    const novoUsuario = {
        nome_usuario,
        email,
        senha: resultado.hash,
        tempero: resultado.salt
    };
    
        
    
     const usuario=await UsuarioRota.insertUsuario(novoUsuario);
        res.status(201).json(usuario);
    });