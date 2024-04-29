<template>
  <ion-page>
    <ion-content class="ion-padding" :fullscreen="true">
      <div id="container" style="background-color: #d3e3fd; margin-top: 40px">
        <div class="page-content-wrapper2">
          <div class="pb-3"></div>
          <div class="container">
            <div class="card">
              <div class="card-body">
                <div class="app">
                  <Navbar />
                  <Mapx />
                </div>
              </div>
            </div>
          </div>

          <div class="pb-3"></div>
          <div class="container">
            <div class="card">
              <div class="card-body">
                <h1>Geolocation</h1>
                <p>Your location is:</p>
                <p>Accuracy: {{ loc.accuracy }}</p>
                <p>Latitude: {{ loc.lat }}</p>
                <p>Longitude: {{ loc.long }}</p>
                <p>URL: {{ urlx }}</p>

                <ion-button @click="ClickImage()"> Camera </ion-button>

                <div class="container">
                  <ion-img v-if="render" class="img" :src="imageUrl" />
                </div>
                <div class="container">
                  <ion-button v-if="render" @click="Save()">Save</ion-button>
                  <ion-button v-if="render" @click="Clear()">Clear</ion-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { MapboxMap, MapboxMarker } from "@studiometa/vue-mapbox-gl";
</script>
<script>
import axios from "axios";
import { alertController } from "@ionic/core";
import JsonExcel from "vue-json-excel3";

import { saveAs } from "file-saver";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Camera, CameraResultType } from "@capacitor/camera";

import { Geolocation } from "@capacitor/geolocation";

import Navbar from "./components/Navbar.vue";
import Mapx from "./components/Map.vue";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonButton,
  IonButtons,
  IonBackButton,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";

export default {
  name: "Map",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
    IonButton,
    IonButtons,
    IonBackButton,
    IonRefresher,
    IonRefresherContent,
    downloadExcel: JsonExcel,
    Navbar,
    Mapx,
  },
  setup() {},
  data() {
    return {
      mainMap: null,
      initialCoordinates: [-47, -15],
      urlx: "",
      loc: {
        accuracy: "",
        long: "",
        lat: "",
      },
      imageUrl: "",
      render: false,
      title: "",
      dataNotif: {},
      waktu: "",

      x_nomor_baris: 0,
      x_count: 0,

      limit_x: 50,
      nomor_x: 1,

      json_fields: {
        Nomor: "nomor",
        "Item Code": "itemcode",
        "Item Name": "itemname",
        "Store Code": "storecode",
        "Store Name": "storename",
        "WHS Code": "whscode",
        "WHS Name": "whsname",
        "on Hand": "onhand",
        "MIN Buffer (selain tgl 10/25)": "minbuffer",
        "MAX Buffer (tgl 10/25)": "maxbuffer",
      },
      data_x_tabel: [],
      data_x_excel: [],
      nama_excelnya: "",
      nama_sheetnya: "",

      location: {
        lng: -71.224518,
        lat: 42.213995,
        bearing: 0,
        pitch: 0,
        zoom: 9,
      },

      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  async mounted() {
    //this.uObject = JSON.parse(localStorage.getItem("auth"));
    //this.userid = this.uObject.id;
    //this.myMap();
    this.$root.menuX = true;
    console.log(this.$root.menuX);
    console.log(this.$root.activeRoute);

    this.getDataReplenishment();
    this.getTime();
  },
  methods: {
    myMap() {
      useGeographic();
      this.mainMap = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: [new Feature(new Point(this.initialCoordinates))],
            }),
          }),
        ],
        target: "map",
        view: new View({
          center: this.initialCoordinates,
          zoom: 12,
        }),
      });
      setTimeout(() => {
        this.mainMap.updateSize();
      }, 500);
    },
    async Clear() {
      this.imageUrl = "";
      this.render = false;
    },
    async printCurrentPosition() {
      const coordinates = await Geolocation.getCurrentPosition();

      console.log("Current position:", coordinates);
      this.loc.accuracy = coordinates.coords.accuracy;
      this.loc.long = coordinates.coords.longitude;
      this.loc.lat = coordinates.coords.latitude;

      this.urlx =
        "https://maps.google.com/?q=" + this.loc.lat + "," + this.loc.long;
    },
    async ClickImage() {
      await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      }).then((image) => {
        this.render = true;
        this.imageUrl = String(image.webPath);
      });
      console.log(this.imageUrl);
    },
    convertBlobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    },
    async Save() {
      const response = await fetch(this.imageUrl);
      const blob = await response.blob();
      const base64Data = await this.convertBlobToBase64(blob);
      console.log("url", base64Data);
      const savedFile = await Filesystem.writeFile({
        path: new Date().getTime() + ".jpeg",
        data: base64Data,
        directory: Directory.Documents,
      });

      this.printCurrentPosition();
    },

    test() {
      var blob = new Blob(["Hello, world!\nHello, world!"], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "hello world.txt");
    },
    async getDataReplenishment_detail() {
      var mythis = this;
      const that = this;

      mythis.nomor_x = 1;
      var br_pdf = 0;
      var br_flag = 0;
      var br_string = "";

      var html = "";
      var nn = 0;
      var count = 1;
      var limitx = mythis.limit_x;
      var offsetx = 0;

      mythis.nama_sheetnya = "Replenishment";

      var baris = 0;
      while (count > 0) {
        offsetx = limitx * nn;

        const reqData = await axios({
          method: "get",
          url:
            this.$root.appHost2 +
            "wms/getDataReplenishment/" +
            "?limit=" +
            limitx +
            "&offset=" +
            offsetx +
            "",
        });

        const resData = reqData.data;
        mythis.x_nomor_baris = parseInt(resData.nomorBaris);
        mythis.x_count = parseInt(resData.count);

        // console.log("bbb");
        // console.log(resData);
        var totalx = {};
        var totalx_n = 0;
        if (resData.results.length > 0) {
          Object.keys(resData.results).forEach(function (key) {
            const countries_x = {
              nomor: baris + 1,
              itemcode: resData.results[key].itemCode,
              itemname: resData.results[key].itemNameFull,
              storecode: resData.results[key].storeCode,
              storename: resData.results[key].storeName,
              whscode: resData.results[key].whsCode,
              whsname: resData.results[key].whsName,
              onhand: resData.results[key].onHand,
              minbuffer: resData.results[key].minBuffer,
              maxbuffer: resData.results[key].maxBuffer,
            };
            //console.log(totalx);
            //that.data_x_tabel[baris] = countries;
            that.data_x_excel[baris] = countries_x;

            baris = baris + 1;
            totalx_n = totalx_n + 1;
          });
        }

        nn = nn + 1;

        if (mythis.x_count < mythis.x_nomor_baris) {
          count = 0;
          //console.log("MASUKK B");
        }
        if (nn >= 30) {
          count = 0;
        }
      }

      //console.log(totalx);
      //that.data_x_excel[baris] = totalx;

      that.json_data = that.data_x_excel;
      that.flagDownloadXLS = 1;

      var a = new Date().toLocaleString("en-GB");
      that.nama_excelnya = "stock_replenishment_" + a + ".xls";

      return html;
    },
    getTime() {
      var currentdate = new Date();
      this.waktu =
        "Last Sync: " +
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
    },
    async handleRefresh(event) {
      var mythis = this;

      setTimeout(() => {
        mythis.getDataReplenishment();
        mythis.getTime();
        event.target.complete();
      }, 1);

      //return { handleRefresh };

      //mythis.$root.presentLoading();
      //mythis.$root.stopLoading();

      //return { handleRefresh };
    },
    async getDataReplenishment() {
      var mythis = this;
      mythis.$root.presentLoading();

      await this.$root.refreshToken(localStorage.getItem("token"));
      await axios
        .get(this.$root.appHost2 + "wms/pagingReplenishment_Android")
        .then((res) => {
          //console.log(res);
          mythis.dataNotif = res.data.data;
          console.log(mythis.dataNotif);
        });

      await this.getDataReplenishment_detail();

      mythis.$root.stopLoading();
    },
  },
};
</script>

<style scoped>
ion-content {
  --ion-background-color: #d3e3fd;
}
</style>
