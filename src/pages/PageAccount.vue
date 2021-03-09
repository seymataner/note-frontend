<template>
  <div padding>
    <div class="q-pa-lg">
      <AddNote />
    </div>
    <div class="q-pa-lg">
      <q-table

        card-class="bg-accent"
		class="statement-table"
        title="My Notes"
        :data="userNoteList"
        :columns="getColumns"
        row-key="name"
        :filter="filter"
        bordered
        binary-state-sort
		
      >
        <template v-slot:top-right>
          <q-input border debounce="200" v-model="filter" :placeholder="searchLabel">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-left>
          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="show_dialog">
              <q-card
                class="q-pa-md q-gutter-xs"
                style="width: 1000px; height: 400px"
              >
                <q-card-section>
                  <div class="text-h6 text-primary">{{$t('changeNote')}}</div>
                </q-card-section>
                <q-card-section class="q-gutter-md">
                  <q-input
                    type="input"
                    :label="titleLabel"
                    clearable
                    v-model="title"
                  />
                  <q-input
                    type="textarea"
                    :label="descriptionLabel"
                    clearable
                    v-model="description"
                  />
                  <q-btn
                    v-close-popup
                    :label="changeNote"
                    color="secondary"
                    @click="updatedNote()"
                  />
                  <q-btn
                    v-close-popup
                    :label="cancelLabel"
                    color="primary"
                    @click="clearData()"
                  />
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="title" :props="props">
              {{ props.row.title }}
            </q-td>
            <q-td key="description" :props="props">
              {{ props.row.description }}</q-td
            >
            <q-td key="actions" :props="props" class="q-gutter-sm">
              <q-btn
                color="primary"
                size="sm"
                icon="mode_edit"
                @click="editItem(props.row)"
              >
              </q-btn>
              <q-btn
                color="secondary"
                icon="delete"
                size="sm"
                @click="deleteItem(props.row)"
              >
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import Note from "components/Note.vue";
import AddNote from "components/AddNote.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      show_dialog: false,
      filter: "",
      title: null,
      description: null,
	  _id: null,
    };
  },
  components: { Note, AddNote },
  methods: {
    ...mapActions("notes", ["fetchUserNotes"]),
    ...mapActions("notes", ["deleteNote", "updateNote"]),
    deleteItem(item) {
      //confirm("Are you sure you want to delete this item?") &&
        this.deleteNote(item._id);
    },
    editItem(item) {
      this.dialog = true;
      this.title = item.title;
      this.description = item.description;
	  this._id = item._id;
      this.show_dialog = true;
    },
    updatedNote() {
      const changedData = {
        _id: this._id,
        title: this.title,
        description: this.description,
      };
      this.updateNote(changedData);
	  this.clearData();
    },

    clearData() {
      this.title = null;
      this.description = null;
	  this._id =null
    },
  },
  computed: {
    ...mapGetters("notes", ["userNoteList"]),
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
          align: "left",
          label: this.$t("DESCRIPTION"),
          field: "description",
          sortable: true,
        },
        {
		  label:"",
          name: "actions",
          field: "actions"
        },

		];
	},
	searchLabel () {
		return this.$t('search')
	},
		  createLabel() {
		  return this.$t('CREATE');
	  },
	  descriptionLabel () {
		  return this.$t('Description');
	  },
	  AddLabel () {
		  return this.$t('AddNote');
	  },
	  cancelLabel () {
		  return this.$t('cancel')
	  },
	  titleLabel() {
		  return this.$t('title')
	  },
	  changeNote() {
		  return this.$t('changeNote')
	  }
  },
  created() {
    this.fetchUserNotes(localStorage.getItem("user-id"));
  },
 
};
</script>

<style lang="css">
</style>