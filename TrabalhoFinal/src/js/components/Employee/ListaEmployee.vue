<template>
  <div>
       <h1>Listagem de Empregados</h1>
       <table border="1">
         <thead>
           <tr>
             <th>ID</th>
             <th>Nome</th>
             <th>Salário</th>
             <th>Idade</th>
             <th>Avatar</th>
             <th>Ações</th>
          
           </tr>
         </thead>
         <tbody>
            <tr v-for="employee in this.empregados" v-bind:key="employee.id">
              <td>{{employee.id}}</td>
              <td>{{employee.nome}}</td>
              <td>{{employee.salario}}</td>
              <td>{{employee.idade}}</td>
              <td><img v-bind:src="employee.avatar" width="100" height="100" /></td>
              <td>
                <a href="#" v-on:click.prevent="editar(employee)">editar</a>
                <a href="#" v-on:click.prevent="excluir(employee.id)">excluir</a>
              </td>
            </tr>
         </tbody>
       </table>
  </div>
 
</template>

<script>
export default {
  methods: {
    editar(employee){
      this.$parent.editar(employee);
    },
    excluir(id){
      if(confirm("Deseja realmente excluir este empregado?"))
      this.$parent.excluir(id)
    }
    
  },
  props: {
    empregados: Array
  }
}
</script>

<style>
 table{
   border-collapse: collapse;
  color: black;
  border: ridge 5px gray;
  padding: 3px;
  width: 100%;
  text-align: center;
  background-color: lightcyan;
}

table thead{
  color: darkcyan;
  font-weight: bold;
}

</style>