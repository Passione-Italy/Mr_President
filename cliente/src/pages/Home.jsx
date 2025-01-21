import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autoTable";
import { useNavigate } from "react-router-dom";
import frufru from "../../Global.module.css";
import Loading from "../notificacao/Loading";

import Button from '@mui/material/Button';
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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


export default function Home() {
  const [nome, setNome] = useState('');
  const [dlc, setDlc] = useState('');
  const [valor, setValor] = useState(0);
  const [lancamento, setLancamento] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [requisitos, setRequisitos] = useState('');
  const [desenvolvedora, setDesenvolvedora] = useState('');
  const [Games, setGames] = useState([]);
  const [janelaAberta, setJanelaAberta] = useState(false);
  const [idAlterar, setIdAlterar] = useState(0);

  const abrirJanela = (id) => {
    setJanelaAberta(true)
    setIdAlterar(id)
  };

  const navigate = useNavigate()

  const PagHome = () => {
    navigate('/Games');
  };


  const fecharJanela = () => setJanelaAberta(false);

  const handleFormSubmit = (e) => {
    alterarJogo(idAlterar)
    e.preventDefault();
    alert('Formulário enviado!');
    fecharJanela();
  };


  useEffect(() => {
    const buscarGames = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/GamesList");
        const dados = await resposta.json();
        setGames(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarGames();
  }, [Games])

  const removerGames = async (id) => {
    try {
      await fetch('http://localhost:3000/GamesList/' + id, {
        method: 'DELETE'
      })
    } catch {
      alert('Deu erro!')
    }
  };

  const alterarJogo = async (id) => {
    try {
      const resposta = await fetch('http://localhost:3000/GamesList/' + idAlterar, {
        method: 'PUT',
        headers: { 'Content-type': 'Application/json' },
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

    } catch {
      console.error('Erro ocorrido com sucesso')
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = Games.map(Game => [
      Game.nome,
      Game.dlc,
      Game.valor,
      Game.lancamento,
      Game.avaliacao,
      Game.requisitos,
      Game.desenvolvedora
    ])
    doc.text("Lista de Games", 10, 10);
    doc.autoTable({
      head: [["Nome", "DLC", "Valor", "Lançamento", "Avaliação", "Requisitos", "Desenvolvedora"]],
      body: tabela
    })

    doc.save("Games.pdf");
  }

    if(Games.length === 0) {
      return <Loading/>
    }

return ( 


    <div className={frufru.tabHome}>
      <Button variant="contained" onClick={() => exportarPDF()}>Gerar PDF</Button>
      
      <br /><br />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>

              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">DLC</TableCell>
              <TableCell align="right">Preço</TableCell>
              <TableCell align="right">Lançamento</TableCell>
              <TableCell align="right">Avaliação</TableCell>
              <TableCell align="right">Requisitos</TableCell>
              <TableCell align="right">Desenvolvedora</TableCell>
              <TableCell align="right">Excluir</TableCell>
              <TableCell align="right">Alterar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Games.map((Game) => (
              <TableRow
                key={Game.id}
                sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
              >
                <TableCell component="th" scope="row">
                  {Game.nome}
                </TableCell>

                <TableCell align="right">{Game.dlc}</TableCell>
                <TableCell align="right">R${Game.valor}</TableCell>
                <TableCell align="right">{Game.lancamento}</TableCell>
                <TableCell align="right">{Game.avaliacao}/5</TableCell>
                <TableCell align="right">{Game.requisitos}</TableCell>
                <TableCell align="right">{Game.desenvolvedora}</TableCell>
                <TableCell align="right"><Button variant="outlined" color="error" onClick={() => removerGames(Game.id)}>
                  <DeleteIcon />
                </Button>
                </TableCell>

                <TableCell align="right">
                  <Button variant="outlined" onClick={() => abrirJanela(Game.id)}>
                    <SyncAltOutlinedIcon />
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br /><br />
<div className={frufru.alteCard}>
      <Janela isOpen={janelaAberta} onClose={fecharJanela} id="alterar">
        <form onSubmit={handleFormSubmit}>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <div>

              <TextField label="Nome" variant="outlined" type="text" name="" id=""
                value={nome} onChange={(event) => setNome(event.target.value)} />

              <TextField label="DLC" variant="outlined" type="text" name="" id=""
                value={dlc} onChange={(event) => setDlc(event.target.value)} />

              <TextField label="Preço" variant="outlined" type="number" name="" id=""
                value={valor} onChange={(event) => setValor(event.target.value)} />

              <TextField label="" variant="outlined" helperText="Lançamento" type="date" name="" id=""
                value={lancamento} onChange={(event) => setLancamento(event.target.value)} />

              <TextField label="Desenvolvedora" variant="outlined" type="text" name="" id=""
                value={desenvolvedora} onChange={(event) => setDesenvolvedora(event.target.value)} />

              <TextField label="Requisitos" variant="outlined" type="text" name="" id=""
                value={requisitos} onChange={(event) => setRequisitos(event.target.value)} />

              <h3>Avaliação</h3>

              <Stack spacing={1}>
                <Rating
                  name="half-rating"
                  value={avaliacao * 1}
                  precision={1}
                  onChange={(event) => setAvaliacao(event.target.value)}
                />
              </Stack>
              <br /><br />

            </div>
          </Box>


        <button className={frufru.b}>  <Button variant="contained" >Salvar</Button></button>

        </form>
      </Janela>
</div>
      <br /><br />

      <Button variant="contained" onClick={PagHome}>Registrar Jogo</Button>

    </div>


  );
}