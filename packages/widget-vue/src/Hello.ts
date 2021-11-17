import Vue from "vue";

import { secret } from "./secret";

type Data = {
  message: string;
};

export const Hello = Vue.component("hello", {
  template: "",
  data(): Data {
    return {
      message: "Hello world!" + secret(),
    };
  },
});
