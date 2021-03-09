<template>
  <q-page padding>
    <div>
      <q-table
        grid
        card-class="bg-accent"
        :data="userList"
        :columns="getColumns"
        row-key="_id"
        @row-click="rowclick"
        :filter="filter"
        bordered
        :no-data-label="emptyData"
		:no-results-label="notFoundData"
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
</template>

<script>
import User from "components/User.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      filter: "",
    };
  },
  components: { User },
  methods: {
    ...mapActions("users", ["fetchUsers"]),

    rowclick(evt, row) {
      this.$router.push("/user");
      localStorage.setItem("user-current", row._id);
    },
  },

  computed: {
    ...mapGetters("users", ["userList"]),
    getColumns() {
      return [
        {
          name: "USERNAME",
          required: true,
          label: this.$t("USERNAME"),
          align: "left",
          field: "username",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "EMAIL",
          align: "center",
          label: this.$t("EMAIL"),
          field: "email",
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
  },
  created() {
    this.fetchUsers();
  },
};
</script>
