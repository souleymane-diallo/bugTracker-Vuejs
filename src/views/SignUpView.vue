<template>
  <div class="login-form border p-4 rounded shadow">
    <h2 class="text-center text-uppercase">Bug Tracker</h2>
    <form class="needs-validation" novalidate @submit.prevent="registerForm()">
        <div class="mb-3">
            <label for="username" class="form-label">Nom d'utilisateur</label>
            <input type="text" class="form-control" id="username" name="user" v-model="user" placeholder="Jolène" required="required">
            <div class="mt-1 text-danger" v-if="v$.user.$error">{{ v$.user.$errors[0].$message }}</div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <input type="password" class="form-control" id="password" name="password" v-model="password.password" required="required">
            <div class="mt-1 text-danger" v-if="v$.password.password.$error">{{ v$.password.password.$errors[0].$message }}</div>
        </div>
        <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" v-model="password.confirm">
            <div class="mt-1 text-danger" v-if="v$.password.confirm.$error">{{ v$.password.confirm.$errors[0].$message }}</div>
        </div>
        <button type="submit" class="btn btn-primary fw-bold">Inscription</button>
        <router-link class="d-block text-center mt-2" to="/login">Se connecter</router-link>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import { BugTrackerAPI } from '../services/BugTrackerAPI';
import router from '../router';

export default {
    name: 'SignUp',
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            user: '',
            password: {
                password: '',
                confirm: ''
            }, 
            result: {
                id: '',
                status: '',
                message: ''
            }
        }
    },
    methods: {
        registerForm() {
            this.v$.$validate();

            if (this.v$.$error) {
                return false;
            }
            BugTrackerAPI.register(this.user, this.password.password).then((data) => {
                this.result = data;
            });
            router.push('/dashbord');
        }
    },
    validations() {
        return {
            user: { required, minLength: minLength(6) },
            password: {
                password: { required, minLength: minLength(6) },
                confirm: { required, sameAs: sameAs(this.password.password) }
            }
        }
    }
}
</script>

<style>

</style>