<template>
  <div style="position: relative">
    <div class="svgHero" :style="[this.$store.state.files ? {'top': '-150px'} : {'top': '-200px'}]">
      <v-img
          :max-width="this.$store.state.files ? 150 : 250"
          src="searching-2.svg"
      ></v-img>
    </div>
    <v-file-input
        style="min-width: 400px"
        @click:clear="clearResults"
        @change="storeFiles"
        multiple
        truncate-length="15"
    ></v-file-input>
  </div>
</template>

<script>
export default {
  name: "FileDownloader",
  methods: {
    clearResults: function () {
      this.$store.commit("clearFiles")
    },
    storeFiles: function (files) {
      if(files.length > 0) {
        this.$store.commit("storeFiles", {files})
      }
    }
  }
}
</script>

<style scoped>
.svgHero {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center
}
</style>