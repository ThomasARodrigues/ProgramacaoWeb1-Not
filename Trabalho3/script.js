//Thomas Anderson Rodrigues
function mostrarDadosDoEmpregado(empregado) {
    var nome = empregado.employee_name;
    var salario = empregado.employee_salary;
    var idade = empregado.employee_age;
    var avatar = empregado.profile_image;
    console.log("Empregado: Nome:" + nome + ", Salário:" + salario + ", Idade: " + idade);

  }
  


  //listar empregados
  axios.get('http://rest-api-employees.jmborges.site/api/v1/employees')
   .then(function (response) {
     
     
     var empregados = response.data.data; //array de empregados
     var table="<tr><th>ID</th><th>Nome</th><th>Salário</th><th>Idade</th><th>Avatar</th><th>Ações</th></tr>";
     for (var i = 0; i < empregados.length; i++) {
        var empregado = empregados[i];
        var id = empregado.id;
        var nome = empregado.employee_name;
        var salario = empregado.employee_salary;
        var idade = empregado.employee_age;
        var avatar = empregado.profile_image;
        mostrarDadosDoEmpregado(empregado);
        table += "<tr><td>";
        table += id ;
        table += "</td><td>";
        table +=  nome;
        table += "</td><td>";
        table +=  salario;
        table += "</td><td>";
        table +=  idade;
        table += "</td><td>";
        table += '<img src="avatar">';
        table += "</td><td>";
        table += '<a onclick= "editarEmpregado(i)">Editar</a><a href="">Excluir</a>';
        table += "</td></tr>";
     }
     document.getElementById("tabela").innerHTML = table;
   })
    .catch(function (respostaDeErro) {
   
      var status = respostaDeErro.response.status;
     alert("Ocorreu um erro na requisição (status " + status + ")");
    });


  //criar empregado
  
  function addEmpregado() {
      var novoEmpregado = {
      name: document.getElementById("nome").value,
      salary: document.getElementById("salario").value,
      age: document.getElementById("idade").value,
      profile_image: document.getElementById("avatar").value
  };

  axios.post('http://rest-api-employees.jmborges.site/api/v1/create', novoEmpregado)
   .then(function (response) {
       //handle success
       var nome = response.data.data.name;
      alert("O empregado " + nome + " foi criado");
    })
    .catch(function (respostaDeErro) {
     //handle error
      var status = respostaDeErro.response.status;
     alert("Ocorreu um erro(status " + status + ")");
   });


  }
  function editarEmpregado(id){
  //atualização de dados
  var novoEmpregado = {
      name: document.getElementById("nome1").value,
      salary: document.getElementById("salario1").value,
      age: document.getElementById("idade1").value,
      profile_image: document.getElementById("avatar1").value
 };
  axios.put('http://rest-api-employees.jmborges.site/api/v1/update/'+id, novoEmpregado)
    .then(function (response) {
     var nome = response.data.data.name;
    alert("O empregado " + nome + " foi atualizado");
 })
 .catch(function (respostaDeErro) {
     var status = respostaDeErro.response.status;
     alert("Ocorreu um erro(status " + status + ")");
   });
  }
 