<template>
  <div class="full-width-container">

    <main id="homepage">
        <section>
            <h1>Leonardo<br>linjeforening</h1>
            <p>Studentene ved Industriell design på NTNU</p>
            <img src="../assets/img/illustrations/bao.png" alt="Velkommen til Leonardo linjeforening">
            <div class="scroll-down"><img src="../assets/img/icons/arrow.svg" alt="pil">Scroll ned</div>
        </section>
        <br>
        <div class="container">
            <h4>Kommende hendelser</h4><br>
        </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'Home',
  created() {
    
  },
  computed: {
    
  },
  data: function() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/pages/_homepage.scss";
</style>


