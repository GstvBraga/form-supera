import React, {useState} from 'react'
import { useForm } from 'react-hook-form'

export default function FormSupera() {
  
  
  //Se o formulário existir no armazenamento locar vai atribuir os valores para a variavel
  if (localStorage.getItem("formSupera")){
    var formSupera = localStorage.getItem("formSupera");
    formSupera = (JSON.parse(formSupera));
    var formDisableVar = true;
  }else{
    var formDisableVar = false;
    var formSupera = {};
}
  //Cria um useState para poder editar o formulário caso esteja desativado
  const [formDisable, setFormDisable]= useState(formDisableVar)
  //Define os valores padrões do formulário como os armazenados no local se existirem
  const {register, handleSubmit, errors } = useForm({
      defaultValues: {
        nome: formSupera?.nome,
        data: formSupera?.data,
        email: formSupera?.email,
        senha: formSupera?.senha,
        numero: formSupera?.numero,
        select: formSupera?.select,
        checkbox: formSupera?.checkbox
      }
  });
  const onSubmit = data =>{
      console.log(data);
      localStorage.setItem("formSupera", JSON.stringify(data));
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Formulário da Supera</h1>
      <fieldset disabled={formDisable}>
        <div className="input-field">
          <input
          placeholder=' '
          type="text" {...register(('nome'), {required:true})}/>
          <label htmlFor="nome">Nome</label>
        </div>
        <div className="input-field">
          <input type="date" {...register(('data'),{required:true})}/>
          <label htmlFor="nome"></label>
        </div>
        <div className="input-field">
          <input 
          placeholder=' ' 
          type="email" {...register(('email'),{required:true})}/>
          <label htmlFor="nome">Email</label>
        </div>
        <div className="input-field">
          <input 
          placeholder=' '
          type="password" {...register(('senha'),{required:true})}/>
          <label htmlFor="nome">Senha</label>
        </div>
        <div className="input-field">
          <input 
          placeholder=' '
          type="number" {...register(('numero'),{required:true})}/>
          <label htmlFor="nome">Número</label>
        </div>
        <div className="input-field">
          <select 
          placeholder=' '
          {...register(('select'),{required:true})}>
            <option value="mulher">Mulher</option>
            <option value="homem">Homem</option>
            <option value="outro">Outro</option>
          </select>
          <label htmlFor="select">Genero</label>
        </div>
        <div className="input-field">
          <input 
          placeholder=' '
          type="checkbox" {...register(('checkbox'),{required:true})}/>
          <label htmlFor="checkbox">aaaa</label>
        </div>
        <button type="submit">Enviar</button>
      </fieldset>
    </form>
    <button onClick={()=>setFormDisable(false)} type="button">editar</button>
    </>
  )
}
