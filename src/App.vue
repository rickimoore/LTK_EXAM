<template>
  <v-app>
    <v-app-bar
      app
      color="#6C63FF"
      dark
    >
      <v-btn
        href="https://github.com/rickimoore"
        target="_blank"
        text
      >
        <span class="mr-2">Made by Ricki</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <FileDownloader/>
        <FileResults />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import FileDownloader from "@/components/FileDownloader";
import FileResults from "@/components/FileResults";

export default {
  name: 'App',

  components: {
    FileDownloader,
    FileResults
  },

  data: () => ({
    //
  }),
};
</script>
