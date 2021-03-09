<template>
  <div class="q-pa-sm">
    <div>
      <q-btn
        :label= "createLabel"
        color="primary"
        @click="dialog = true"
        class="float-right"
        icon="add"
      />
      <q-dialog v-model="dialog" class="absolute-center">
        <q-card
          class="q-pa-md q-gutter-xs"
          style="width: 1000px; height: 400px"
        >
          <q-card-section>
            <div class="text-h6 text-primary ">{{$t('AddNewNote')}}</div>
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <q-input type="input" :label="titleLabel" clearable v-model="title" />
            <q-input
              type="textarea"
              :label="descriptionLabel"
              clearable
              v-model="description"
            />
            <q-btn
              v-close-popup
              :label="AddLabel"
              color="secondary"
              @click="onAdd()"
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      title: null,
      description: null,
      dialog: false,
    };
  },
  methods: {
    ...mapActions("notes", ["pushNote"]),
    onAdd() {
      const noteData = {
        title: this.title,
        description: this.description,
        user_id: localStorage.getItem("user-id"),
      };
      this.pushNote(noteData);
      this.clearData();
    },
    clearData() {
      this.title = null;
      this.description = null;
    },
  },
  computed: {
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
	  }
  }
};
</script>

<style lang="css">
</style>