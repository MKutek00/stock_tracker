<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import SBUX from "../assets/SBUX.png";
import NVDA from "../assets/NVDA.png";
import NFLX from "../assets/NFLX.png";
import APPL from "../assets/AAPL.png";
import ADBE from "../assets/ADBE.png";
import { callback } from "chart.js/helpers";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const data = {
  labels: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  datasets: [
    {
      label: "Wycena portfela ($)",
      data: [
        1200, 1500, 1800, 2200, 2700, 3200, 3700, 4300, 4900, 5500, 6100, 6700,
      ],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 7000,
      ticks: {
        callback: function (value: any) {
          return `$${value}`;
        },
        color: "#333",
        font: {
          size: 12,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        callback: function (value: any) {
          return data["labels"][value].substring(0, 3);
        },
        display: true, // ← pokazuje etykiety miesięcy
        color: "#333",
        font: {
          size: 12,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Wycena portfela akcji w ciągu roku",
      font: {
        size: 18,
      },
    },
    legend: {
      display: false,
    },
  },
};

const recent_bought_stock = [
  {
    prependAvatar: SBUX,
    title: "Starbucs inc.",
    subtitle: "SBUX.NYSE",
  },
  {
    prependAvatar: NVDA,
    title: "Nvidia Inc.",
    subtitle: "NVDA NASDAQ",
  },
  {
    prependAvatar: NFLX,
    title: "Netlifx Inc.",
    subtitle: "NFLX.NASDAQ",
  },
  {
    prependAvatar: APPL,
    title: "Apple",
    subtitle: "APPL.NASDAQ",
  },
  {
    prependAvatar: ADBE,
    title: "Adobe Inc.",
    subtitle: "ADBE.NASDAQ",
  },
];
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h2>Hej, <b> witam ponownie</b> 🥱</h2>
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn class="mx-2" color="black" rounded="lg" prepend-icon="mdi-plus">
          Dodaj pozycję
        </v-btn>
        <v-btn class="mx-2" color="black" rounded="lg" disabled>
          Eksportuj
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="flex-grow-0">
        <v-btn-toggle
          class="bg-grey-lighten-4"
          density="compact"
          selected-class="bg-white opacity-100"
          rounded="lg"
          variant="text"
        >
          <v-btn class="my-1 ml-1" rounded="lg" size="x-small">Overwiev</v-btn>
          <v-btn class="my-1 mx-1" rounded="lg" disabled size="x-small"
            >Portfel</v-btn
          >
          <v-btn class="my-1 mr-1" rounded="lg" size="x-small">Benchmark</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12" class="d-flex">
        <v-sheet class="w-25 pa-5 mx-1" border rounded="lg" elevation="2">
          <p class="text-body-2 d-flex justify-space-between font-weight-bold">
            Wycena portfolio
            <v-icon class="ml-auto" icon="mdi-currency-usd"></v-icon>
          </p>
          <p class="text-h6">
            <b><v-icon icon="mdi-currency-usd"></v-icon>45,231.89</b>
          </p>
          <p class="text-body-2 text-grey-darken-1">
            +20,1% przez ostatni miesiąc
          </p>
        </v-sheet>
        <v-sheet class="w-25 pa-5 mx-1" border rounded="lg" elevation="2">
          <p class="text-body-2 d-flex justify-space-between font-weight-bold">
            Wycena portfolio
            <v-icon class="ml-auto" icon="mdi-currency-usd"></v-icon>
          </p>
          <p class="text-h6">
            <b><v-icon icon="mdi-currency-usd"></v-icon>45,231.89</b>
          </p>
          <p class="text-body-2 text-grey-darken-1">
            +20,1% przez ostatni miesiąc
          </p>
        </v-sheet>
        <v-sheet class="w-25 pa-5 mx-1" border rounded="lg" elevation="2">
          <p class="text-body-2 d-flex justify-space-between font-weight-bold">
            Wycena portfolio
            <v-icon class="ml-auto" icon="mdi-currency-usd"></v-icon>
          </p>
          <p class="text-h6">
            <b><v-icon icon="mdi-currency-usd"></v-icon>45,231.89</b>
          </p>
          <p class="text-body-2 text-grey-darken-1">
            +20,1% przez ostatni miesiąc
          </p>
        </v-sheet>
        <v-sheet class="w-25 pa-5 mx-1" border rounded="lg" elevation="2">
          <p class="text-body-2 d-flex justify-space-between font-weight-bold">
            Wycena portfolio
            <v-icon class="ml-auto" icon="mdi-currency-usd"></v-icon>
          </p>
          <p class="text-h6">
            <b><v-icon icon="mdi-currency-usd"></v-icon>45,231.89</b>
          </p>
          <p class="text-body-2 text-grey-darken-1">
            +20,1% przez ostatni miesiąc
          </p>
        </v-sheet>
      </v-col>
      <v-col cols="8">
        <v-sheet class="w-100 h-100 pa-5" border rounded="lg" elevation="2">
          <Bar :data="data" :options="options" />
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet class="w-100 h-100 pa-5" border rounded="lg" elevation="2">
          <p class="text-h6 font-weight-bold">Nowo otware pozycje</p>
          <v-list>
            <v-list-item
              v-for="(stock, sIdx) in recent_bought_stock"
              :key="`stock_${sIdx}`"
              class="py-2"
            >
              <template v-slot:prepend>
                <v-avatar>
                  <v-img :src="stock.prependAvatar"> </v-img>
                </v-avatar>
              </template>
              <template v-slot:title>
                <v-list-item-title>
                  {{ stock.title }}
                </v-list-item-title>
              </template>
              <template v-slot:subtitle>
                <v-list-item-subtitle>
                  {{ stock.subtitle }}
                </v-list-item-subtitle>
              </template>
              <template v-slot:append>
                <v-list-item-action class="flex-column align-end">
                  <small class="text-high-emphasis opacity-60 font-weight-bold">
                    +9.1 %
                  </small>
                  <small class="text-high-emphasis opacity-60 font-weight-bold">
                    +142.12 $
                  </small>
                </v-list-item-action>
                <v-divider />
              </template>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.v-btn--active {
  opacity: 100% !important;
}
</style>
