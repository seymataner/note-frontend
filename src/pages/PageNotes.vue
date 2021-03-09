<template>
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
      >
        <template v-slot:top-right>
          <q-input border debounce="400" v-model="filter" :placeholder= "searchLabel">
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
import Note from "components/Note.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
	  return {
    filter: "",
    //columns: 
  	}
  },
  components: { Note },
  methods: {
    ...mapActions("notes", ["fetchNotes"]),
  },
  computed: {
    ...mapGetters("notes", ["noteList"]),
	getColumns() {
		return [
			{
				name: "name",
				required: true,
				label: this.$t('TITLE'),
				align: "left",
				field: "title",
				format: (val) => `${val}`,
				sortable: true,
			},
			{
				name: "description",
				align: "center",
				label: this.$t('DESCRIPTION'),
				field: "description",
				format: (val) => `${val}`,
				sortable: true,
			},
		];
	},
	searchLabel () {
		return this.$t('search')
	}
  },
  created() {
    this.fetchNotes();
  },
};
</script>

<style></style>
