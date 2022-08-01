<template>
  <q-layout view="lHh Lpr lFf" :class="!$store.state.account.UserData ? 'flex flex-center' : ''">
       <q-header class="bg-indigo" v-show="$store.state.account.UserData">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          <span>My todo list</span>
        </q-toolbar-title>

        <div v-if="$store.state.account.UserData">
           <q-btn flat no-caps :label="$store.state.account.UserData.email">
        <q-menu>
          <q-list style="">
            <q-item clickable @click="logout()">
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container v-show="$store.state.account.UserData">
      <router-view />
    </q-page-container>

     <q-spinner-cube
     v-show="!$store.state.account.UserData"
        color="primary"
        size="20em"
      />
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>
