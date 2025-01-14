import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autoTable";
import { Button } from '@mui/material'
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';


export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

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
    <Button variant="contained" onClick={()=> exportarPDF()}>Botão</Button>
    <table>
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
          <Link to={'/alterar/' + usuario.id}>
          <button>Alterar</button>
          </Link>
        </tr>
      )}
    </table>
    </div>
  );
}