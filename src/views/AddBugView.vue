<template>
  <div class="login-form border p-4 rounded shadow">
    <h2 class="text-center text-uppercase">Nouveau bug</h2>
    <form class="needs-validation" novalidate @submit.prevent="createBug()">
        <div class="mb-3">
          <label for="title" class="form-label">Titre du Bug</label>
          <input type="text" class="form-control" id="title" v-model="title" placeholder="server en panne" required="required">
          <div class="mt-1 text-danger" v-if="v$.title.$error">{{ v$.title.$errors[0].$message }}</div> 
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Decription</label>
          <textarea class="form-control" id="description" v-model="description" rows="3"></textarea>
          <div class="mt-1 text-danger" v-if="v$.description.$error">{{ v$.description.$errors[0].$message }}</div>
        </div>
        <button type="submit" class="btn btn-primary fw-bold">Créer un bug</button>
    </form>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { BugTrackerAPI } from '../services/BugTrackerAPI'
import router from '../router'
export default {
  name: 'AddBug',
  setup() {
    return { v$: useValidate({ $autoDirty: true })}
  },
  data() {
    return {
      title: '',
      description: ''
     
    }
  },
  methods: {
    createBug() {
      this.v$.$validate();
      if (this.v$.$error) {
        return false;
      }
      BugTrackerAPI.registerNewBug(JSON.stringify({ title: this.title, description: this.description })).then();
      router.push('/dashbord');
      console.log('created bug')
    }
  },
  validations() {
    return {
      title: { required },
      description: { required, minLength: minLength(8)}
    
    }
  }

}
</script>

<style>
    
</style>