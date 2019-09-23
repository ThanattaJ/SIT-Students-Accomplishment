<template>
  <div id="login">
       <md-card md-with-hover id="flex-container" style="border-radius: 6px;">
          <div id="sign-up">
            <form>
                <md-card-header>
                   <md-card-header-text>
                     <div class="md-title" id="title">Sign in</div>
                   </md-card-header-text>
                </md-card-header>
                <div class="grey-text">
                      <md-card-content>
                        <md-field>
                            <label>Username</label>
                            <md-textarea v-model="autogrow" md-autogrow></md-textarea>
                        </md-field>
                         <div class="md-layout-item">
                          <md-field>
                              <label for="movie">selected subfix</label>
                              <md-select v-model="subfix" name="subfix" id="subfix">
                              <md-option value="@sit.kmutt.ac.th" selected>@sit.kmutt.ac.th</md-option>
                              <md-option value="@sit.com">@sit.com</md-option>

                            </md-select>
                          </md-field>
                        </div>
                        <md-field>
                          <label>Password</label>
                          <md-input v-model="password" type="password"></md-input>
                        </md-field>
                      </md-card-content>
                </div>
                <div class="text-center" id="btm">
                    <a class="button" id="login-btm">Log in </a>
                </div> 
            </form>
          </div>
          <div id="media">
            <img src="./../../assets/login.jpg" alt="img"/>
          </div>
       </md-card>
  </div>
</template>
<script>

  export default {
    name: 'Login',
    components: {
  
    },
  }
</script>
<style>
    #login{
      justify-content: center;
      width: 40%;
      margin-left: 30%;
      margin-top: 3%;
      padding: 10px;
      font-family:'Courier New', Courier, monospace;
    }
    #title{
      color: grey;
      margin-left: 30%;
    }
    #flex-container{
      display: flex;
    }
    #sign-up{
     flex-grow: 1;
      width: 50%;
    }
    #media{
      flex-grow: 1;
      width: 50%;

    }
    #login-btm{
      color: grey;
      text-decoration: none;
      width: 70%;
    }
    #btm{
      margin-left: 25%;
      margin-top: 15%;
    }
</style>
