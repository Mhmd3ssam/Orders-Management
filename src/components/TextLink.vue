<template>
  <Button :label="text" link @click="navigate" />
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";

export default defineComponent({
  name: "TextLink",
  components: {
    Button,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    path: {
      type: [String, Object],
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const navigate = () => {
      if (typeof props.path === "string") {
        router.push(props.path);
      } else if (typeof props.path === "object") {
        router.push(props.path);
      }
    };

    return {
      navigate,
    };
  },
});
</script>
