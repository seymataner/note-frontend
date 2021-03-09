<template>
  <div>
    <q-page padding>
      <div>
        <q-table
          grid
          card-class="bg-accent"
          class="my-sticky-header-column-table"
          :data="noteList"
          :columns="getColumns"
          row-key="_id"
          :filter="filter"
          bordered
          :no-data-label="emptyData"
          :no-results-label="notFoundData"
          :rows-per-page-label="recordPerPage"
        >
          <template v-slot:top-right>
            <q-input
              border
              debounce="400"
              v-model="filter"
              :placeholder="searchLabel"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
    </q-page>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      filter: "",
    };
  },
  methods: {
    ...mapActions("notes", ["fetchUserNotes"]),
  },

  computed: {
    ...mapGetters("notes", ["noteList"]),
    getColumns() {
      return [
        {
          name: "title",
          required: true,
          label: this.$t("TITLE"),
          align: "left",
          field: "title",
          sortable: true,
        },
        {
          name: "description",
          align: "center",
          label: this.$t("DESCRIPTION"),
          field: "description",
          sortable: true,
        },
      ];
    },
    searchLabel() {
      return this.$t("search");
    },
    emptyData() {
      return this.$t("emptyData");
    },
    notFoundData() {
      return this.$t("notFoundData");
    },
    recordPerPage() {
      return this.$t("recordPerPage");
    },
  },
  created() {
    this.fetchUserNotes(localStorage.getItem("user-current"));
  },
};
</script>

<style lang="css">
</style>