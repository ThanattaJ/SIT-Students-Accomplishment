<template>
    <div id="body-bg">
        <div class="columns is-mobile">
            <div class="column is-one-fifth">
                <code>1</code><br>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <div>Create My Portfolio Page</div>
                            <div class="field">
                                <label class="label">Portfolio Page Name(TH)</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Portfolio Page Name">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Portfolio Page Name(EN)</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Portfolio Page Name">
                                </div>
                            </div>
                            <div>When you start the Portfolio Page?</div>

                            <!-- ต้องการแบ่ง card เป็น 2 ส่วน -->
                            <!-- <div class="columns"> 
                                <div class="column">
                                    aaa
                                </div>
                                <div class="column">
                                    ccc
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>






<script>
import './../../node_modules/bulma/css/bulma.css';
import './css/form.css'

export default {
    name : 'CreatePortfolioPage'
}
</script>
