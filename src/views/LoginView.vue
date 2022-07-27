<template>
  <div class="login-form border p-4 rounded shadow">
    <h2 class="text-center text-uppercase">Bug Tracker</h2>
    <form class="needs-validation" novalidate @submit.prevent="loginForm()">
        <div class="mb-3">
            <label for="username" class="form-label">Nom d'utilisateur</label>
            <input type="text" class="form-control" id="username" placeholder="Jolène" name="user_name" v-model="username" required="required">
            <div class="mt-1 text-danger" v-if="v$.username.$error">Nom d'utilisateur est requis</div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <input type="password" class="form-control" id="password" name="password" v-model="password" required="required">
            <div class="mt-1 text-danger" v-if="v$.password.$error">Minimum 6 caracteres</div>
        </div>
        <button type="submit" class="btn btn-primary fw-bold">Connexion</button>
        <router-link class="d-block text-center mt-2" to="/inscription">S'incrire</router-link>
    </form>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minLength, alphaNum } from '@vuelidate/validators'
import router from '../router'
import { BugTrackerAPI } from '../services/BugTrackerAPI'

export default {
    name: 'Login',
    setup() {
        return {  v$: useValidate({$autoDirty: true }) }
    },
    data() {
        return {
            username: '',
            password: '',
            result: {
                id: '',
                status: '',
                message: '',
                token: ''
            },
        };
    },
    methods: {
        async loginForm() {
            this.v$.$validate();

            if (this.v$.$error) {
                return false;
            }
            
            BugTrackerAPI.login(this.username, this.password).then((data) => {
                this.result = data;
                if (this.result.status !== 'done') {
                    this.username = '';
                    this.password = '';
                    this.result.message = data.message;
                    console.log('message',this.result.message);

                } else if (this.result.status === 'done') {
                    router.push('/dashbord');
                }
            });    
        }
    },
    validations() {
        return {
            username: { required, minLength: minLength(4) },
            password: { required, minLength: minLength(6), alphaNum }
        }
    }
}
</script>

<style>
    
</style>