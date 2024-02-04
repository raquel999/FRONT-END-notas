import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import{FiPlus, FiSearch} from 'react-icons/fi'
import {Container, Brand, Menu, Search, Content, NewNote} from './style';
import { useNavigate } from 'react-router-dom';
import {Header} from '../../../components/Button/Header';
import { Input } from '../../../components/input';
import{ButtonText}from '../../../components/ButtonText';
import{Section} from'../../../components/Section'
import { Note } from '../../../components/Note';
import { api } from '../../../services/api';
import { all } from 'axios';

export function Home() {
const[ search, setSearch]= useState("");
const [tags, setTags] = useState([]);
const [tagsSelected, setTagsSelected] = useState([])
const [notes, setNotes]=  useState([])

function handleTagSelected(tagName){
if(tagName === "all"){
  return setTagsSelected ([]);
}

const alreadySelected = tagsSelected.includes(tagName)

if(alreadySelected){
const  filteredTags = tagsSelected.filter(tag =>tag!==tagName)
setTagsSelected(filteredTags);

}else{

  setTagsSelected(prevState=>[...prevState, tagName]);
}}


const navigate = useNavigate();
function handleDetails(id){
  navigate(`/details/${id}`)
}

useEffect(()=>{
async function fetchTags(){
  const response = await  api.get("/tags");
  setTags (response.data);
}
fetchTags()
},[])

useEffect  (()=>{
  async function fetchNote(){
    const  response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
  setNotes(response.data)
  }
  fetchNote();
},[tagsSelected, search])


  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
      <li> 
        <ButtonText
         title={"Todos"} 
        onClick={()=>handleTagSelected("all")}
         isActive={tagsSelected.length === 0}
          />
          </li>
        {
          tags && tags.map(tag =>(
      <li key = {String(tag.id)}>
          <ButtonText
           title={tag.name}
           onClick={()=>
            handleTagSelected(tag.name)}
           isActive={tagsSelected.includes(tag.name)}
           />
           </li>
        ))
        }
      </Menu>

      <Search>
        <Input placeholder="Pesquisar pelo título" 
        onChange={(e)=>setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
        {
          notes.map(note=>(
            <Note
            key={String(note.id)}
            data={note}
            onClick={()=>handleDetails(note.id)}
            />
          ))
}
      
             
         
        </Section>
      </Content>

      <NewNote to ="/new" >
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}