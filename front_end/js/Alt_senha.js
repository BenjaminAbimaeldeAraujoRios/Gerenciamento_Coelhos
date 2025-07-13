   app.post('/usuario',async (req, res) => {
         const { senha } = req.body;

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