<script setup lang="ts">
import SBUX from "../../assets/SBUX.png";
import NVDA from "../../assets/NVDA.png";
import NFLX from "../../assets/NFLX.png";
import APPL from "../../assets/AAPL.png";
import ADBE from "../../assets/ADBE.png";
import { ref } from "vue";

const stocks = [
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
type NewStock = {
  stock: string | null;
  quantity: number | null;
  price: number | null;
};
const newStock = ref<NewStock>({
  stock: null,
  quantity: null,
  price: null,
});
</script>
<template>
  <v-dialog activator="#activator-add-stock-target" max-width="340">
    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi-chart-bar-stacked" title="Dodaj nową pozycję">
        <template v-slot:text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-autocomplete
                  v-model="newStock.stock"
                  :items="stocks"
                  item-title="title"
                  item-value="subtitle"
                  variant="solo-filled"
                  flat
                  label="Wybierz akcję"
                  density="comfortable"
                  hide-details
                >
                  <template v-slot:item="{ props: itemProps, item }">
                    <v-list-item
                      v-bind="itemProps"
                      :subtitle="item.raw.subtitle"
                    ></v-list-item>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model.number="newStock.price"
                  variant="solo-filled"
                  flat
                  label="Podaj cenę kupna"
                  density="comfortable"
                  hide-details
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model.number="newStock.stock"
                  variant="solo-filled"
                  flat
                  label="Podaj wolumen"
                  density="comfortable"
                  hide-details
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-slot:actions>
          <v-btn
            color="red"
            class="mr-auto"
            text="Zamknij"
            variant="tonal"
            prepend-icon="mdi-close"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn
            class="ml-auto"
            text="Zapisz"
            variant="tonal"
            prepend-icon="mdi-content-save"
            @click="isActive.value = false"
          ></v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
