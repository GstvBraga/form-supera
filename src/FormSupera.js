import React, {useState, Component} from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { ErrorMessage } from '@hookform/error-message';

var formDisableVar = false;


const EditButtonShow = (formDisable)=>{
  //Se o formulário existir no armazenamento locar vai atribuir os valores para a variavel
  if (!formDisable){
    return true
  }else{
    return false
  }
  
}

export default function FormSupera() {
  //Se o formulário existir no armazenamento locar vai atribuir os valores para a variavel
  if (localStorage.getItem("formSupera")){
    var formSupera = localStorage.getItem("formSupera");
    formSupera = (JSON.parse(formSupera));
    formDisableVar = true;
  }else{
    formDisableVar = false;
    var formSupera = {};
}
  //Cria um useState para poder editar o formulário caso esteja desativado
  const [formDisable, setFormDisable]= useState(formDisableVar)
  //Define os valores padrões do formulário como os armazenados no local se existirem
  const {register, formState: { errors }, handleSubmit } = useForm({
      defaultValues: {
        nome: formSupera?.nome,
        data: formSupera?.data,
        email: formSupera?.email,
        senha: formSupera?.senha,
        numero: formSupera?.numero,
        genero: formSupera?.genero,
        checkbox: formSupera?.checkbox
      }
  });

  const onSubmit =  (data)=>{
    const SubmitFormSwal = withReactContent(Swal)
    localStorage.setItem("formSupera", {});
    console.log(data);
    localStorage.setItem("formSupera", JSON.stringify(data));
    setFormDisable(true);
    SubmitFormSwal.fire({
      title: 'Fomulário salvo',
      icon: 'success',
      confirmButtonColor: '#3085d6',
    })
  }

  function editForm(){
    const EditFormSwal = withReactContent(Swal)

    EditFormSwal.fire({
      title: 'Deseja editar o formulário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar'
    }).then((result) => {
      if (result.isConfirmed) {
        setFormDisable(false)
      }
    })
  }
  
  return (
    <>
    <div className="content">
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Formulário Supera</h1>
      <fieldset disabled={formDisable}>
        <div className="input-field">
          <input
          placeholder=' '
          type="text" {...register('nome', {
          required:"Preencha o campo",
          pattern: {
            value: /[A-Za-z ]/,
            message: "Digitos inválidos"
          }
          })}/>
          <label htmlFor="nome">Nome</label>
          <ErrorMessage
            errors={errors}
            name="nome"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div className="input-field">
          <input type="date" {...register(('data'),{required:"Preencha o campo"})}/>
          <label htmlFor="date">Data de nascimento</label>
          <ErrorMessage
            errors={errors}
            name="data"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div className="input-field">
          <input 
          placeholder=' ' 
          type="email" {...register(('email'),{required:"Preencha o campo"})}/>
          <label htmlFor="nome">Email</label>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div className="input-field">
          <input 
          placeholder=' '
          type="password" {...register(('senha'),{required:"Preencha o campo"})}/>
          <label htmlFor="nome">Senha</label>
          <ErrorMessage
            errors={errors}
            name="senha"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div className="input-field">
          <input 
          placeholder=' '
          type="number" {...register(('numero'),{required:"Preencha o campo"})}/>
          <label htmlFor="nome">Telefone (apenas números)</label>
          <ErrorMessage
            errors={errors}
            name="numero"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div className="input-field">
          <select 
          placeholder=' '
          {...register(('genero'),{required:"Preencha o campo"})}>
            <option value="mulher">Mulher</option>
            <option value="homem">Homem</option>
            <option value="outro">Outro</option>
          </select>
          <label htmlFor="genero">Gênero</label>
          <ErrorMessage
            errors={errors}
            name="genero"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div className="input-field">
          <input 
          type="checkbox" {...register(('checkbox'), {required:false})}/>
          <label htmlFor="checkbox">Desejo que a empresa me envie emails com novidades</label>
        </div>
        <button type="submit">Enviar</button>
      </fieldset>
    </form>
    <button className="edit--btn" onClick={()=>editForm()} disabled={EditButtonShow(formDisable)}>Editar formulário</button>
    </div>
    </>
  );
  }
