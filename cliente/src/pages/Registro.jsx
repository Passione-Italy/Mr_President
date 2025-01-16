import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material'

export default function Registrar() {

  const [nome, setNome] = useState('');
  const [dlc, setDlc] = useState('');
  const [valor, setValor] = useState(0);
  const [lancamento, setLancamento] = useState('');
  const [avaliacao, setAvaliacao] = useState(0);
  const [requisitos, setRequisitos] = useState('');
  const [desenvolvedora, setDesenvolvedora] = useState('');


  const navigate = useNavigate()
  const registrarPessoa = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
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

      });
      if (resposta.ok) {
        navigate('/');
      }

    } catch {
      alert('Ocorreu um erro')
    }
  }


  return (
    <main>
      <form onSubmit={registrarPessoa}>

        {/*
        <input type="text" name="" id="" value={nome} onChange={(event) => setNome(event.target.value)} />
        <input type="text" name="" id="" value={dlc} onChange={(event) => setDlc(event.target.value)} />
        <input type="number" name="" id="" value={valor} onChange={(event) => setValor(event.target.value)} />
        <input type="date" name="" id="" value={lancamento} onChange={(event) => setLancamento(event.target.value)} />
        <input type="number" name="" id="" value={avaliacao} onChange={(event) => setAvaliacao(event.target.value)} />
        <input type="text" name="" id="" value={requisitos} onChange={(event) => setRequisitos(event.target.value)} />
        <input type="text" name="" id="" value={desenvolvedora} onChange={(event) => setDesenvolvedora(event.target.value)} />
*/}



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
        value={avaliacao*1} 
        precision={1} 
        onChange={(event) => setAvaliacao(event.target.value)} 
      />
    </Stack>
            <br /><br />

          </div>
        </Box>
        <Button variant="contained" >Salvar</Button>
      </form>


    </main>
  );
}