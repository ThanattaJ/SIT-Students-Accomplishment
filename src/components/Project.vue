<template>
    <div id="Project-bg">
        <div>
            <router-link to="/CreatePortfolioPage">CreatePortfolioPage</router-link>
            <router-view></router-view>
        </div>
        <div class="columns">
            <div class="column is-2">
                <div class="field">
                    <div class="control" id="searchbar">
                        <input class="input" type="text" placeholder="Search Project...">
                    </div>
                </div>
                <aside class="manu">
                    <ul class="menu-list">
                        <li><a>All Project</a></li>
                        <li><a>Assignment Project</a></li>
                        <li><a>External Project</a></li>
                    </ul>
                </aside>
            </div>
            <div class="column">
                <div class="card" id="card">
                    <div class="card-image">
                        <figure class="image is-3by2">
                            <img src="../assets/LUNA.png">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <p id="h1">SIT Students Accomplishment</p>
                            <p id="h2">โหลๆเทสๆๆ</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-3by2">
                            <img src="../assets/plus-symbol.png">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './css/Project.css'
export default {
  data () {
    return {
    }
  }
}
</script>


