<template>
  <div>
    <q-list bordered separator>
      <q-item>
        <q-item-section>
          <q-item-label>{{ title }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="description"> {{ description }} </q-item-label>
        </q-item-section>
        <div class="q-gutter-sm">
          <q-btn
            size="10px"
            color="primary"
            icon="mode_edit"
            @click="changeNote()"
            no-caps
            :disabled="isDisabled(user_id)"
          />
          <q-btn
            size="10px"
            color="secondary"
            icon="delete"
            @click="popNote(_id)"
            no-caps
            :disabled="isDisabled(user_id)"
          />
          <q-dialog v-model="dialog" class="absolute-center">
            <q-card
              class="q-pa-md q-gutter-md"
              style="width: 1000px; height: 400px"
            >
              <q-card-section class="q-gutter-md">
                <q-input
                  type="input"
                  label="Title"
                  clearable
                  v-model="title1"
                />
                <q-input
                  type="textarea"
                  label="Description"
                  clearable
                  v-model="description1"
                />
                <q-btn
				  v-close-popup 
                  label="Change Note"
                  color="secondary"
                  @click="updatedNote()"
                />
                <q-btn v-close-popup label="Cancel" color="primary" />
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      title1: null,
      description1: null,
      username: null,
    };
  },

  name: "Note",
  props: {
    _id: {
      type: String,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    user_id: {
      type: String,
      default: "",
    },
  },
  computed: {},

  methods: {
    ...mapActions("notes", ["deleteNote", "updateNote"]),
    popNote(_id) {
      this.deleteNote(_id);
    },
    changeNote() {
      this.dialog = true;
      this.title1 = this.title;
      this.description1 = this.description;
    },
    updatedNote() {
      const changedData = {
        _id: this._id,
        title: this.title1,
        description: this.description1,
      };
      this.updateNote(changedData);
    },
    isDisabled(user_id) {
      if (user_id == localStorage.getItem("user-id")) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="css">
.description {
  text-overflow: ellipsis;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
}
</style>
