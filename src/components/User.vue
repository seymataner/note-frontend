<template>
  <div>
    <q-list bordered>
      <q-item to="/account" clickable >
        <q-item-section>
          <q-avatar color="primary" text-color="white">
            {{ username.charAt(0).toUpperCase() }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ username }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label> {{ email }} </q-item-label>
        </q-item-section>
  
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    id: {
      type: Number,
    },
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    }
  },
};
</script>
