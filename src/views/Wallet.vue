<script setup lang="ts">
import SBUX from "../assets/SBUX.png";
import NVDA from "../assets/NVDA.png";
import APPL from "../assets/AAPL.png";
import { onMounted, ref } from "vue";

const logos = [SBUX, NVDA, APPL];

const stocks = ref<any[]>([]);
const stocksLoading = ref(false);

function generateStocks(count: number) {
  const stocksArr = [];
  for (let i = 1; i <= count; i++) {
    const ticker = `MOCK${i.toString().padStart(2, "0")}`;
    const name = `Mock Company ${i}`;
    const logo = logos[Math.floor(Math.random() * logos.length)];
    const amount = Math.floor(Math.random() * 90) + 10;
    const buyPrice = Math.floor(Math.random() * 900) + 100;
    // Losowa zmiana ceny +/- 20%
    const currentPrice = Math.round(
      buyPrice * (0.8 + Math.random() * 0.4) // 80% - 120% ceny zakupu
    );
    const profit = (currentPrice - buyPrice) * amount;
    stocksArr.push({
      name,
      ticker,
      logo,
      amount,
      buyPrice,
      currentPrice,
      profit,
    });
  }
  return stocksArr;
}

const headers = [
  { title: "Spółka", value: "company" },
  { title: "Ilość", value: "amount" },
  { title: "Kupno", value: "buyPrice" },
  { title: "Aktualna cena", value: "currentPrice" },
  { title: "Wartość", value: "value" },
  { title: "Zysk / Strata", value: "profit" },
  { title: "Szczegóły", value: "details" },
];

onMounted(() => {
  stocksLoading.value = true;
  setTimeout(() => {
    stocks.value = generateStocks(30);
    stocksLoading.value = false;
  }, 1000);
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="mb-6">Twój portfel akcji</h2>
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
      <v-col cols="4">
        <v-card class="pa-4" flat>
          <div class="text-caption text-grey">Wartość portfela</div>
          <v-skeleton-loader
            v-if="stocksLoading"
            type="heading"
          ></v-skeleton-loader>
          <div v-else class="text-h6 font-weight-bold">
            <v-icon class="mr-1" color="primary">mdi-currency-usd</v-icon>
            {{
              stocks
                .reduce((sum, s) => sum + s.amount * s.currentPrice, 0)
                .toLocaleString("pl-PL")
            }}
            zł
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-4" flat>
          <div class="text-caption text-grey">Zysk / Strata</div>
          <v-skeleton-loader
            v-if="stocksLoading"
            type="heading"
          ></v-skeleton-loader>
          <div
            v-else
            class="text-h6 font-weight-bold"
            :class="{
              'text-success': stocks.reduce((sum, s) => sum + s.profit, 0) >= 0,
              'text-error': stocks.reduce((sum, s) => sum + s.profit, 0) < 0,
            }"
          >
            {{
              (stocks.reduce((sum, s) => sum + s.profit, 0) >= 0 ? "+" : "") +
              stocks
                .reduce((sum, s) => sum + s.profit, 0)
                .toLocaleString("pl-PL")
            }}
            zł
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-4" flat>
          <div class="text-caption text-grey">Zwrot (%)</div>
          <v-skeleton-loader
            v-if="stocksLoading"
            type="heading"
          ></v-skeleton-loader>
          <div
            v-else
            class="text-h6 font-weight-bold"
            :class="{
              'text-success': stocks.reduce((sum, s) => sum + s.profit, 0) >= 0,
              'text-error': stocks.reduce((sum, s) => sum + s.profit, 0) < 0,
            }"
          >
            {{
              (
                (stocks.reduce((sum, s) => sum + s.profit, 0) /
                  stocks.reduce((sum, s) => sum + s.amount * s.buyPrice, 0)) *
                100
              ).toFixed(2)
            }}
            %
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="stocks"
          class="elevation-1"
          item-value="ticker"
          hide-default-footer
          :items-per-page="stocks.length"
          :loading="stocksLoading"
        >
          <template #item.company="{ item }">
            <div class="d-flex align-center">
              <v-avatar size="36" class="mr-3">
                <v-img :src="item.logo" />
              </v-avatar>
              <div>
                <div class="font-weight-bold">{{ item.name }}</div>
                <div class="text-caption text-grey">{{ item.ticker }}</div>
              </div>
            </div>
          </template>
          <template #item.profit="{ item }">
            <span :class="item.profit >= 0 ? 'text-success' : 'text-error'">
              {{ item.profit >= 0 ? "+" : "" }}{{ item.profit.toFixed(2) }} zł
            </span>
          </template>
          <template #item.value="{ item }">
            {{ (item.amount * item.currentPrice).toFixed(2) }} zł
          </template>
          <template #item.details="{ item }">
            <v-btn elevation="0" class="border" size="small">
              <v-icon icon="mdi-eye"></v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
