<template>
    <div id="Project-bg">
        <div class="columns">
            <div class="column is-2">
                <div class="field">
                    <div class="control" id="searchbar">
                        <input class="input" type="text" placeholder="Search Project...">
                    </div>
                </div>
                <aside class="menu">
                    <ul class="menu-list">
                        <li><a>All Project</a></li>
                        <li><a>Assignment Project</a></li>
                        <li><a>External Project</a></li>
                        <li><a><router-link to="/CreateExternalPortPage">CreatePortfolioPage</router-link></a></li>
                    </ul>
                </aside>
            </div>
            <router-link to="/ProjectDetail">
            <div class="column">
                <div class="card" id="card">
                    <div class="card-image">
                        <figure class="image is-3by2">
                            <img src="./../../assets/LUNA.png">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content" id="content-card">
                            <p>{{Title}}</p>
                            <p>{{Description}}</p>
                        </div>
                    </div>
                </div>
            </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import './../css/Project.css'
export default {
            // el:"#content-card",
            data() {
                return{
                Title: 'SIT Students Accomplishment',
                Description: 'โหลๆเทสๆๆ',
                }
            },
            methods: {
            }
        }
      
</script>


