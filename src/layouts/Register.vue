<template>
  <q-layout view="lHh Lpr lFf" class="custom-bg flex flex-center">
    <q-card class="custom-card" style="max-width: 400px; width: 90%">
      <q-card-section class="flex flex-center q-mt-md">
       <span class="text-h6 text-weight-bold">Register</span>
      </q-card-section>
      <q-card-section class="q-px-lg">
        <q-form ref="formRef">
        <q-input color="primary" dense :rules="[customRule]" error-message="Email is required!" outlined v-model="email" label="Email">
        </q-input>
        <q-input color="primary" class="q-mt-sm" dense :rules="[customRule]" error-message="Password is required!" outlined v-model="password" label="Password">
        </q-input>
           <div class="row q-px-xs q-mt-sm">
                    <div class="col-12">
                       <span class="text-secondary cursor-pointer" @click="gotologin()">Already have an account.</span>
                    </div>
           </div>
         <q-btn color="primary" @click="register()" :loading="loading" class="full-width q-mt-xs q-mb-md" label="Register" no-caps/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-layout>
</template>
<script>
export default {
  name: 'RegisterPage',
  data () {
    return {
      email: null,
      password: null,
      customRule: value => !!value,
      loading: false
    }
  },
  methods: {
    register () {
      this.$refs.formRef.validate().then(res => {
        if (res) {
          this.loading = true
          this.$store.dispatch('account/register', this)
        }
      })
    },
    gotologin () {
      this.$router.replace('/login')
    }
  }
}
</script>
<style scoped>
</style>
