<template>
<div class="vertical-center">
  <div class="container">
    <div class="row">
      <div class="rasp-image" align="center">
        <img src="@/assets/pi.png" class="img-responsive img-raspberry" alt="Raspberry Pi Logo">
      </div>
      <div class="text-error">
        <h3>Error {{ $route.params.error }}</h3>
        <p>{{ errors[$route.params.error] ? errors[$route.params.error] : 'Error not found..' }}</p>
        <p><strong>URL:</strong> {{ fixUrl() }}</p>

        <a class="btn btn-raspberry" @click="router.go(-1)">Go Back</a>
        <a class="btn btn-raspberry" href="" data-statuscode=""></a>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import Errors from '../errors/index.json'
export default {
  name: 'ErrorPage',
  data: () => ({
    errors: process.env.Errors || Errors
  }),
  watch: {
    '$route' ()  {
      this.updateTitle()
    }
  },
  methods: {
    fixUrl () {
      const url = window.location.href
      return url ? url.split('/#')[0] : url
    },
    updateTitle () {
      const param = this.$route.params.error
      document.title = `Error ${param ? param : ''} - [Raspi Errors pages Vue]`
    }
  },
  beforeMount () {
    this.updateTitle()
  }
}
</script>