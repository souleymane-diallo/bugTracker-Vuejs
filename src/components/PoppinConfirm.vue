<template>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Suppression Bug</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer ce Bug</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="onDeleteBug(id)">Oui</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
//import { BugTrackerAPI } from '../services/BugTrackerAPI'
export default {
    name: 'PoppinConfirm',
    props: {
        id: String,
    },
    
    methods: {
        onDeleteBug(id) {
            //BugTrackerAPI.deleteBug(id).then();
            console.log(id)
            //this.$forceUpdate();
        } 
    }
}
</script>

<style>

</style>