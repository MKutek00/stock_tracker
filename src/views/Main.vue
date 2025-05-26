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
import AddStock from "./Dialogs/AddStock.vue";
import { useTheme } from "vuetify";
import { computed, onMounted, ref } from "vue";
import ChatButton from "@/components/ChatButton.vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const theme = useTheme();

const logos = [SBUX, NVDA, NFLX, APPL, ADBE];

const allStocks = ref<any[]>([]);
const stocksLoading = ref(false);
const portfolioValue = ref(0);

function generateStocks(count: number) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    const ticker = `MOCK${i.toString().padStart(2, "0")}`;
    const name = `Mock Company ${i}`;
    const logo = logos[Math.floor(Math.random() * logos.length)];
    const percent = +(Math.random() * 20 - 10).toFixed(1); // -10% do +10%
    const profit = +(Math.random() * 500 - 250).toFixed(2); // -250 do +250
    const price = +(Math.random() * 1000 + 100).toFixed(2); // 100 do 1100
    const quantity = Math.floor(Math.random() * 100) + 1;
    arr.push({
      prependAvatar: logo,
      title: name,
      subtitle: `${ticker}.MOCK`,
      percent,
      profit,
      price,
      quantity,
    });
  }
  return arr;
}

const chartData = ref<any>({
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
      data: [],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
});

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value: any) {
          return `$${value}`;
        },
        color: "#d2d2d2",
        font: { size: 12 },
      },
      grid: { display: false, drawBorder: false },
    },
    x: {
      ticks: {
        callback: function (value: any) {
          return chartData.value.labels[value].substring(0, 3);
        },
        display: true,
        color: "#d2d2d2",
        font: { size: 12 },
      },
      grid: { display: false, drawBorder: false },
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Wycena portfela akcji w ciągu roku",
      font: { size: 18 },
    },
    legend: { display: false },
  },
};

onMounted(() => {
  stocksLoading.value = true;

  setTimeout(() => {
    allStocks.value = generateStocks(10);

    portfolioValue.value = allStocks.value.reduce(
      (sum, s) => sum + s.quantity * s.price,
      0
    );

    const base = Math.floor(portfolioValue.value * 0.7);
    chartData.value.datasets[0].data = Array.from({ length: 12 }, (_, i) =>
      Math.round(
        base +
          (portfolioValue.value - base) * (i / 11) +
          Math.random() * 200 -
          100
      )
    );

    stocksLoading.value = false;
  }, 1000);
});
</script>

<template>
  <v-container>
    <AddStock />
    <v-row>
      <v-col cols="6">
        <h2>Hej, <b>witam ponownie</b> 🥱</h2>
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn
          id="activator-add-stock-target"
          class="mx-2"
          color="black"
          rounded="lg"
          prepend-icon="mdi-plus"
        >
          Dodaj pozycję
        </v-btn>
        <v-btn
          class="mx-2 opacity-50"
          color="black"
          rounded="lg"
          disabled
          prepend-icon="mdi-file-excel"
        >
          Eksportuj
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex">
        <v-sheet class="w-25 pa-5 mx-1" border rounded="lg" elevation="2">
          <v-skeleton-loader
            v-if="stocksLoading"
            type="heading"
          ></v-skeleton-loader>
          <template v-else>
            <p
              class="text-body-2 d-flex justify-space-between font-weight-bold"
            >
              Wycena portfolio
              <v-icon class="ml-auto" icon="mdi-currency-usd"></v-icon>
            </p>
            <p class="text-h6">
              <b>
                <v-icon icon="mdi-currency-usd"></v-icon>
                {{ portfolioValue.toLocaleString("pl-PL") }} zł
              </b>
            </p>
            <p
              class="text-body-2 text-grey-darken-1 opacity-70"
              :class="
                allStocks[allStocks.length - 1]?.percent ?? 0 >= 0
                  ? 'text-success'
                  : 'text-error'
              "
            >
              +{{ allStocks[allStocks.length - 1]?.percent ?? 0 }}% przez
              ostatni miesiąc
            </p>
          </template>
        </v-sheet>
        <!-- ...pozostałe karty... -->
      </v-col>
      <v-col cols="8">
        <v-sheet class="w-100 h-100 pa-5" border rounded="lg" elevation="2">
          <v-skeleton-loader
            v-if="stocksLoading"
            type="card"
          ></v-skeleton-loader>
          <Bar v-else :data="chartData" :options="chartOptions" />
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet class="w-100 h-100 pa-5" border rounded="lg" elevation="2">
          <v-skeleton-loader
            v-if="stocksLoading"
            type="card"
          ></v-skeleton-loader>
          <template v-else>
            <p class="text-h6 font-weight-bold">Nowo otwarte pozycje</p>
            <v-list>
              <v-list-item
                v-for="(stock, sIdx) in allStocks.slice(-5)"
                :key="`stock_${sIdx}`"
                class="py-2"
              >
                <template v-slot:prepend>
                  <v-avatar>
                    <v-img :src="stock.prependAvatar" />
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
                    <small
                      class="text-high-emphasis opacity-60 font-weight-bold"
                      :class="
                        stock.percent >= 0 ? 'text-success' : 'text-error'
                      "
                    >
                      {{ stock.percent >= 0 ? "+" : "" }}{{ stock.percent }} %
                    </small>
                    <small
                      class="text-high-emphasis opacity-60 font-weight-bold"
                      :class="stock.profit >= 0 ? 'text-success' : 'text-error'"
                    >
                      {{ stock.profit >= 0 ? "+" : "" }}{{ stock.profit }} $
                    </small>
                  </v-list-item-action>
                  <v-divider />
                </template>
              </v-list-item>
            </v-list>
          </template>
        </v-sheet>
      </v-col>
    </v-row>
    <ChatButton />
  </v-container>
</template>
