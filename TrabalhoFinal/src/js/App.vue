<template>
  <div>
    <Employee>
  </div>
</template>

<script>
import Vue from "vue";
import Employee from './components/Employee/Employee';

export default Vue.extend({
  components: {
    Employee
  }
});
</script>

<style>
h1{
  color: darkcyan;
}
body{
  background: rgb(239, 239, 239);
}
</style>