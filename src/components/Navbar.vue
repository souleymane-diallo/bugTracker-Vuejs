<template>
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
                    <span>{{ listsBugs() }} bugs</span>, <span>{{  progress() }} en cours</span>, <span>{{ doneBug() }} traité</span>
                </div>
                <ul class="navbar-nav me-auto">
                    <li class="nav-item mb-2 mb-lg-0">
                        <a class="nav-link active" aria-current="page" href="#">Liste complète</a>
                    </li>
                    <li class="nav-item mb-2 mb-lg-0">
                        <a class="nav-link" href="#">A traiter</a>
                    </li>
                    <router-link to="/dashbord/ajouter-bug" class="btn btn-outline-primary me-5" type="button">Ajouter</router-link>
                    <button class="btn btn-outline-info" type="button"  @click="logout()">Déconnexion</button>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import router from '../router';
import { BugTrackerAPI } from '../services/BugTrackerAPI'
export default {
    name: 'Navbar',
    data() {
        return {
            message: '',
            status: '',
            bugs: [],
            totalLists: 0,
            totalProgress: 0,
            totalDone: 0
        };
    },
    methods: {
        logout() {
            BugTrackerAPI.logout().then();
            router.push('/login');
        },
        listsBugs() {
            return this.totalLists = this.bugs.length; 
        },
        progress() {
            for(let i = 0; i < this.totalLists; i++){
                if (this.bugs[i].state == 1) {
                    this.totalProgress +=1
                }
            }
            return this.totalProgress;
        },
        doneBug() {
            for(let i = 0; i < this.totalLists; i++){
                if (this.bugs[i].state == 2) {
                    this.totalDone +=1
                }
            }
            return this.totalDone;
        }
         
    },
    mounted() {
        BugTrackerAPI.showListBugs().then((data) => {
            this.bugs = data
            console.log(this.bugs);
        })
    }
}
</script>

<style>

</style>