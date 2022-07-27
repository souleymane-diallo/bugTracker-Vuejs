<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link to="/dashbord" class="navbar-brand text-uppercase fw-bold fs-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bug ms-1 fw-bold" viewBox="0 0 16 16">
                    <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
                </svg>
                Bug Tracker
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="me-auto mb-2 mb-lg-0">
                    <span> bugs</span>, <span> en cours</span>, <span>traité</span>
                </div>
                <ul class="navbar-nav me-auto">
                    <li class="nav-item mb-2 mb-lg-0">
                        <button class="btn btn-outline-secondary me-4" @click="listComplete()" >Liste complète</button>
                    </li>
                    <li class="nav-item mb-2 mb-lg-0">
                        <button class="btn btn-outline-secondary me-4" @click="toTreat()">A traiter</button>
                    </li>
                    <router-link to="/dashbord/ajouter-bug" class="btn btn-outline-primary me-5" type="button">Ajouter</router-link>
                    <button class="btn btn-outline-info" type="button"  @click="logout()">Déconnexion</button>
                </ul>
            </div>
        </div>
    </nav>
    <table class="table table-hover mt-4 border">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">désignation</th>
                <th scope="col">description</th>
                <th scope="col">date</th>
                <th scope="col">nom</th>
                <th scope="col">état</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody class="table-striped">
            <tr v-for="(bug, index) in bugs" :key="bug.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ bug.title}}</td>
                <td>{{ bug.description }}</td>
                <td>{{ getHumanDate(bug.timestamp) }}</td>
                <td>{{ bug.user_id }}</td>
                <td>
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option value="{{bug.state}}">{{bug.state}}</option>
                        <option value="0">A traiter</option>
                        <option value="1">En cours</option>
                        <option value="2">Traité</option>
                    </select>
                </td>
                <td>
                    <!-- data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="onDelete(bug.id)"-->
                    <button type="button"  class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                    <PoppinConfirm :id="bug.id" />
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import PoppinConfirm from '@/components/PoppinConfirm.vue'
import { BugTrackerAPI } from '../services/BugTrackerAPI'
import router from '../router';
//import moment from 'moment'
export default {
    name: 'Dashbord',
    components: {
        PoppinConfirm,
    },
    data() {
        return {
            bugs: [],
            users: [],
            user: ''
        }
    },
    methods: {
        logout() {
            BugTrackerAPI.logout().then();
            router.push('/login');
        },
        getHumanDate(temp) {
            let date = new Date(temp*1000);
            let formatDate = (+date.getDate()+
                "/"+(date.getMonth()+1)+
                "/"+date.getFullYear()+
                " "+date.getHours()+
                ":"+date.getMinutes()+
                ":"+date.getSeconds());

            return formatDate;
        },
        listComplete() {
            BugTrackerAPI.showListBugs(false).then((data) => {
                this.bugs = data;
            }); 
        }, 
        toTreat() {
            BugTrackerAPI.showListBugs().then((data) => {
                this.bugs = data;
            }); 
        },
        onDelete(id) {
            console.log(id)
        }
    
    },
    computed: {
    
    },
    mounted() {
        BugTrackerAPI.showListBugs(false).then((data) => {
            this.bugs = data;
        }); 
        BugTrackerAPI.getUsers().then((data) => {
            this.users = data;
        })
    }
}
</script>

<style>

</style>