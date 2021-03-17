<template>
  <div style="margin-top: 50px">
    <p style="text-align: center">{{fileData ? 'Calculated Results:' : 'Upload Files'}}</p>
    <v-card
        v-if="fileData"
        class="mx-auto"
        min-width="400"
        style="padding: 15px"
        tile
    >
      <v-list dense>
        <v-list-item
            v-for="(file, index) in fileData"
            :key="index"
        >
          <v-list-item-avatar>
            <v-icon
                class="grey lighten-1"
                dark
            >
              mdi-folder
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="file.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-chip
                outlined
                class="ma-2"
            >
              {{file.value}}
            </v-chip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import calculateFileValues from "@/helpers/calculateFileValues";

export default {
  name: "FileResults",
  computed: mapState(['files']),
  data: function () {
    return {
      fileData: null,
    }
  },
  watch: {
    files: function (newVal) {
      if(!newVal) {
        this.fileData = null;
        return;
      }
      calculateFileValues(newVal).then(result => {
        this.fileData = result;
      }).catch(() => {
        console.log("could not read file")
      })
    }
  }
}
</script>

<style scoped>

</style>