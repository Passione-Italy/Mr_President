import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autoTable";
import { Button } from '@mui/material'
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Janela from "./Janela";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function Home() {
  const [nome, setNome] = useState('');
  const [dlc, setDlc] = useState('');
  const [valor, setValor] = useState(0);
  const [lancamento, setLancamento] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [requisitos, setRequisitos] = useState('');
  const [desenvolvedora, setDesenvolvedora] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [janelaAberta, setJanelaAberta] = useState(false);
  const [idAlterar, setIdAlterar] = useState(0);

  const abrirJanela = (id) => {setJanelaAberta(true)
  setIdAlterar(id)


  };

  
  

  const fecharJanela = () => setJanelaAberta(false);

  const handleFormSubmit = (e) => {
    alterarJogo(idAlterar)
    e.preventDefault();
    alert('Formulário enviado!');
    fecharJanela(); 
  };


  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios])
  
  const removerPessoa = async (id) => {
   try{
    await fetch('http://localhost:3000/usuarios/' +id ,{
      method: 'DELETE'
    })
   }catch{
    alert('Deu erro!')
   }
  };

  const alterarJogo = async (id) => {
    try{
      const resposta = await fetch('http://localhost:3000/usuarios/'+idAlterar, {
         method: 'PUT',
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
  
    })

    }catch{
      console.error('Erro ocorrido com sucesso')
    }
  }

  const exportarPDF = ()=> {
    const doc = new jsPDF();
    const tabela = usuarios.map(usuario => [
      usuario.nome,
      usuario.dlc,
      usuario.valor,
      usuario.lancamento,
      usuario.avaliacao,
      usuario.requisitos,
      usuario.desenvolvedora
    ])
    doc.text("Lista de usuarios", 10, 10);
    doc.autoTable({
      head: [["Nome", "DLC", "Valor", "Lançamento", "Avaliação", "Requisitos", "Desenvolvedora"]],
      body: tabela
    })

    doc.save("alunos.pdf");
  }
  return (
    <div>
    <Button variant="contained" onClick={()=> exportarPDF()}>Gerar PDF</Button>
<br/><br/>
    
    <table border="1">
      <tr>
        <td>Nome</td>
        <td>DLC</td>
        <td>Valor</td>
        <td>Lançamento</td>
        <td>Avaliação</td>
        <td>Requisitos</td>
        <td>Desenvolvedora</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.dlc}</td>
          <td>{usuario.valor}</td>
          <td>{usuario.lancamento}</td>
          <td>{usuario.avaliacao}</td>
          <td>{usuario.requisitos}</td>
          <td>{usuario.desenvolvedora}</td>
          <td><button onClick={()=> removerPessoa(usuario.id)}>
           <DeleteIcon/>
            </button></td>
            <td><button onClick={() => abrirJanela(usuario.id)}><SyncAltOutlinedIcon/></button></td>
        </tr>
      )}
    </table>

    <Janela isOpen={janelaAberta} onClose={fecharJanela} id="alterar">
    <form onSubmit={handleFormSubmit}>
  <input type="text" name="" id="" value={nome} onChange={(event)=> setNome(event.target.value)}/>
  <input type="text" name="" id="" value={dlc} onChange={(event)=> setDlc(event.target.value)} />
  <input type="number" name="" id="" value={valor} onChange={(event)=> setValor(event.target.value)} />
  <input type="date" name="" id="" value={lancamento} onChange={(event)=> setLancamento(event.target.value)} />
  <input type="number" name="" id="" value={avaliacao} onChange={(event)=> setAvaliacao(event.target.value)} />
  <input type="text" name="" id="" value={requisitos} onChange={(event)=> setRequisitos(event.target.value)} />
  <input type="text" name="" id="" value={desenvolvedora} onChange={(event)=> setDesenvolvedora(event.target.value)} />


  <button>Salvar</button>
</form>
    </Janela>
    
    
    </div>

    
  );
}