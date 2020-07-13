<template>
  <div>
      <h1>Formulário de Empregados</h1>
      <form id="form-empregados" v-on:submit.prevent="onSubmit">
        <p>
          <label for="nome">Nome:</label><br>
          <input name="nome" v-model="nome"/>
        </p>
        <p>
          <label for="salario">Salário:</label><br>
          <input name="salario" v-model="salario" type="number"/>
        </p>
        <p>
          <label for="idade">Idade:</label><br>
          <input name="idade" v-model="idade" type="number"/>
        </p>
        <p>
          <label for="avatar">Avatar:</label><br>
          <input name="avatar" v-model="avatar" type="url"/>
        </p>
        <p>
          <div class="error">{{errorMessage}}</div>
          <input type="submit" value="Salvar">
        </p>
        
      </form>
  </div>
</template>

<script>
import Employee from '../../models/Employee'
export default {
data() {
  return{
  errorMessage: "",
  id: "",
  nome: "",
  salario: "",
  idade: "",
  avatar: "",
  }
  
},
methods: {
   
    onSubmit() {
      this.errorMessage = '';
      if(!this.nome){
        this.errorMessage = 'Campo nome é obrigatório';
        return
      }
      if(this.avatar == null){
        
      }
      const employee = new Employee(this.id, this.nome, this.salario, this.idade, this.avatar);
      this.$parent.salvar(employee);
      this.id = '';
      this.nome = '';
      this.salario = '';
      this.idade = '';
      this.avatar = '';

    },
    carregar(employee) {
      this.id = employee.id;
      this.nome = employee.nome;
      this.salario = employee.salario;
      this.idade = employee.idade;
      this.avatar = employee.avatar;
      this.errorMessage = '';
    }
  }
}
</script>

<style>
.error{
  color: red;
}

</style>