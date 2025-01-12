import { useState } from "react";
import { useNavigate} from "react-router-dom";

export default function Registrar() {

const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [valor, setValor] = useState(0);

const navigate = useNavigate()
const registrarPessoa = async (event) =>{
  event.preventDefault();
  try{
  const resposta = await fetch('http://localhost:3000/usuarios', {
       method: 'POST',
       headers: {'Content-type': 'Application/json'},
       body: JSON.stringify({
        nome: nome,
        email: email,
        valor: valor
       })

  });
  if(resposta.ok){
    navigate('/');
  }

  }catch{
  alert('Ocorreu um erro')
  }
}
return(
<main>
<form onSubmit={registrarPessoa}>
  <input type="text" name="" id="" value={nome} onChange={(event)=> setNome(event.target.value)}/>
  <input type="email" name="" id="" value={email} onChange={(event)=> setEmail(event.target.value)} />
  <input type="number" name="" id="" value={valor} onChange={(event)=> setValor(event.target.value)} />

  <button>Salvar</button>
</form>
</main>
);
}