<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close" v-on:click="add=!add"></button>
    </header>
    <section class="modal-card-body">
      <div class="columns" v-for="(member,index) in members" v-bind:key="index"> 
                                <div class="column">
                                    <div class="field">
                                        <label class="label inputName">Firstname {{index}}</label>
                                        <div class="control">
                                            <input class="input inputData" type="text" placeholder="Firstname" v-model="member.Firstname">
                                        </div>
                                    </div>
                                    {{member.Firstname}}
                                </div>
                                <div class="column">
                                    <div class="field">
                                        <label class="label inputName">Lastname</label>
                                        <div class="control">
                                            <input class="input inputData" type="text" placeholder="Lastname" v-model="member.Lastname">
                                        </div>
                                    </div>
                                </div>
                            </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success">Save changes</button>
      <button class="button">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
export default {
    
}
</script>

