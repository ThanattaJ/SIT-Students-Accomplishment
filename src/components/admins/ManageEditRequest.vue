<template>
   <div id="ManageEditRequest">
        <div class="card" id="cardMenu" >
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-4" id="title">{{projectName[0].name}}</p>
                <div class="content" id="detail">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. 
                </div>
            </div>
        </div>
   </div>
</template>
<script>
export default {
    data(){
        return{
            projectName: [{
                name: "John Smith"
            }]
        }
    }
}
</script>
<style>
    #ManageEditRequest{
        width: 80%;
        margin-top: 5%;
        margin-left: 10%;
    }
    #cardMenu{
        width: 32%;
        height: 10%;
    }
</style>
