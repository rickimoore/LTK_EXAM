<template>
  <div style="margin-top: 50px">
    <p style="text-align: center">{{fileData ? 'Calculated Results:' : 'Upload Files'}}</p>
    <v-card
        v-if="fileData && targetFiles.length > 0"
        class="mx-auto"
        min-width="400"
        style="padding: 15px"
        tile
    >
      <v-list dense>
        <v-list-item
            v-for="(file, index) in targetFiles"
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

export default {
  name: "FileResults",
  computed: mapState(['files']),
  data: function () {
    return {
      fileData: null,
      targetFiles: null
    }
  },
  watch: {
    files: function (newVal) {
      if(!newVal) {
        this.fileData = null;
        this.targetFiles = null;
        return;
      }
      this.extractData(newVal)
          .then(this.setFileDataResults)
          .then(this.calculateValueOfTargetFiles)
          .catch(() => {
            console.log("could not read file")
          });
    }
  },
  methods: {
    async extractData (data) {
      return await Promise.all(Array.from(data).map(async (file) => ({
        name: file.name,
        data: await this.readFile(file),
        value: 0,
      })));
    },
    setFileDataResults: function (results) {
      this.fileData = results;
      this.targetFiles = [].concat(results[0]);
    },
    calculateValueOfTargetFiles: function () {
      for (let i = 0; i < this.targetFiles.length; i++) {
        const targetFile = this.targetFiles[i];
        targetFile.value += this.loopForIntegers(targetFile.data);
      }
    },
    loopForIntegers: function (data) {
      let result = 0;
      
      for (let i = 0; i < data.length; i++) {
        const string = data[i];
        const stringToInt = parseInt(data[i]);
        const newFile = this.fileData.find(file => file.name === string);

        if(newFile) {
          if(!this.targetFiles.find(file => file.name === newFile.name)) {
            this.targetFiles.push(newFile);
          }
          result += this.loopForIntegers(newFile.data)
        }

        if(!isNaN(stringToInt)) {
          result += stringToInt;
        }
      }

      return result;
    },
    readFile: function (file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = function() {
          resolve(reader.result.split("\n"))
        };
        reader.onerror = reject;
        reader.readAsText(file);
      })
    }
  }
}
</script>

<style scoped>

</style>