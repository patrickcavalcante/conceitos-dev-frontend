import React , {useState, useEffect} from 'react';
import Header from './components/Header';
import './App.css';
import api from './services/api';

    // para iniciar o app usar o comando yarn dev ou npx dev
    // os estados react são:
    // component
    // Propriedade
    // Estado e imutabilida

function App () {
 
  const [projects, setprojects] = useState([]);

    //usetate retorna uma array com 2 posições.
    //
    // 1. Variável com o valor inicial
    // 2. função para atualizar esse valor 
  useEffect(() =>{
    api.get('/projects').then(response => {
      setprojects(response.data);
    });
  }, []);

  // function handleAddProject() {
  //    projects.push(`Novo projeto ${Date.now}`)
  //    setprojects([...projects, `Novo projeto ${Date.now()}` ]);
  // }


   async function handleAddProject(){
      const response = await api.post('/projects',{
         title: `Novo projeto ${Date.now()}`,
         owner: "Patrick cavalcante"
       });

       const project = response.data;

       setprojects([...projects, project]);
     }

  return (
    <>
      <Header title="Projects"/>
      <ul>
          {projects.map(project =><li key={project.id}>{project.title}</li>)} 
          {/* percorre os elementos de projects atraves do map() e cria um elemento chamado project e retorna o elemento */}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;