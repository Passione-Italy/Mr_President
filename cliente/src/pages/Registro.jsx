import { useState } from "react";
import { useNavigate} from "react-router-dom";

export default function Registrar() {

const [nome, setNome] = useState('');
const [dlc, setDlc] = useState('');
const [valor, setValor] = useState(0);
const [lancamento, setLancamento] = useState('');
const [avaliacao, setAvaliacao] = useState(0);
const [requisitos, setRequisitos] = useState('');
const [desenvolvedora, setDesenvolvedora] = useState('');


const navigate = useNavigate()
const registrarPessoa = async (event) =>{
  event.preventDefault();
  try{
  const resposta = await fetch('http://localhost:3000/usuarios', {
       method: 'POST',
       headers: {'Content-type': 'Application/json'},
       body: JSON.stringify({
        nome: nome,
        dlc: dlc,
        valor: valor,
        lancamento: lancamento,
        avaliacao: avaliacao,
        requisitos: requisitos,
        desenvolvedora: desenvolvedora
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
  <input type="text" name="" id="" value={dlc} onChange={(event)=> setDlc(event.target.value)} />
  <input type="number" name="" id="" value={valor} onChange={(event)=> setValor(event.target.value)} />
  <input type="date" name="" id="" value={lancamento} onChange={(event)=> setLancamento(event.target.value)} />
  <input type="number" name="" id="" value={avaliacao} onChange={(event)=> setAvaliacao(event.target.value)} />
  <input type="text" name="" id="" value={requisitos} onChange={(event)=> setRequisitos(event.target.value)} />
  <input type="text" name="" id="" value={desenvolvedora} onChange={(event)=> setDesenvolvedora(event.target.value)} />


  <button>Salvar</button>
</form>
</main>
);
}