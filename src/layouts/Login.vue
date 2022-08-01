<template>
  <q-layout view="lHh Lpr lFf" class="custom-bg flex flex-center">
    <q-card class="custom-card" style="max-width: 400px; width: 90%">
      <q-card-section class="flex flex-center q-mt-md">
       <span class="text-h6 text-weight-bold">Login</span>
      </q-card-section>
      <q-card-section class="q-px-lg">
        <q-form ref="formRef">
        <q-input color="primary" dense :rules="[customRule]" error-message="Email is required!" outlined v-model="email" label="Email">
        </q-input>
        <q-input color="primary" class="q-mt-sm" type="password" dense :rules="[customRule]" error-message="Password is required!" outlined v-model="password" label="Password">
        </q-input>
           <div class="row q-px-xs q-mt-sm">
                    <div class="col-12">
                       <span class="text-secondary cursor-pointer" @click="createAccount()">Create new account.</span>
                    </div>
           </div>
         <q-btn color="primary" @click="login()" :loading="loading" class="full-width q-mt-xs q-mb-md" label="Login" no-caps/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-layout>
</template>
<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: null,
      password: null,
      customRule: value => !!value,
      loading: false
    }
  },
  methods: {
    login () {
      this.$refs.formRef.validate().then(res => {
        if (res) {
          this.loading = true
          this.$store.dispatch('account/login', this)
        }
      })
    },
    createAccount () {
      this.$router.replace('/register')
    }
  }
}
</script>
<style scoped>
</style>
