<template>
    <div id="profile-page" class="container nav">
        <h2>{{ user.firstName }} {{user.lastName}} </h2>
        <br>
        <div class="user-settings">
            <div class="user-info" autocomplete="off">
                <div class="input-field">
                    <input v-model="allergies" name="new-password" placeholder="Allergier" autocomplete="off">
                    <label>Allergier</label>
                </div>
                <br>
                <div class="input-field">
                    <select>
                        <option v-for="classYear in classYears" v-bind:key="classYear.id">
                            {{ classYear.name }}
                        </option>
                    </select>
                </div>
                <br>
                <div class="input-field">
                    <input type="checkbox" id="is_komite" v-model="myCommittee">
                    <div class="checkmark"></div>
                    <label for="is_komite">Komitémedlem</label>

                    <div class="input-field">
                        <select v-model="myCommittee">
                            <option v-for="committee in committees" :value="committee.name" :key="committee.id">
                                {{ committee.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <br>
                <div class="input-field">
                    <input name="new-password" type="password" placeholder="Nytt passord" autocomplete="new-password">
                    <label>Nytt passord</label>
                </div>
                <br>
                <button type="submit" class="button"><span>Lagre</span></button>
            
            </div>
        </div>
        <div class="user-activity">

        </div>
        <br>
        <br>
        <br>
        <router-link to="/logout" class="button secondary"><span>Logg ut</span></router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
    name: "Account",
    components: {
        
    },
    data: function() {
        return {
            classYears: [
                {id: 0, name: '1.klasse'},
                {id: 1, name: '2.klasse'},
                {id: 2, name: '3.klasse'},
                {id: 3, name: '4.klasse'},
                {id: 4 ,name: '5.klasse'},
                {id: 5, name: 'Alumni'},
            ],
            myCommittee: 'Webkomiteen',
            allergies: "Gluten",
        }
    },
    computed: {
        ...mapState([
            'user',
            'committees',
        ]),
        ...mapGetters([
            'is_authenticated',
        ]),
    },
    created: function() {
        this.$store.dispatch('loadCommittees');
    },
}
</script>

<style lang="scss" scoped>
    @import "@/assets/css/pages/_profile.scss";
</style>

