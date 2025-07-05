async function adicionarcoelho(novapessoa){

const res = await fetch("/coelho",{
method: 'POST',
credentials: 'include',
mode: 'cor',
headers:{
'content-Type': "application/json"
   }
 body: JSON.stringfy(adicionarcoelho)

});

alert("Coelho Adicionado com sucesso!");
pessoas= null;
pagina = 'inicio';

}
ev.preventDefault();