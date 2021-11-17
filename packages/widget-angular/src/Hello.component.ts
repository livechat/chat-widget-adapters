import { Component } from "@angular/core";

import { secret } from "./secret";

@Component({
  selector: "hello",
  template: "",
  styles: [],
})
export class HelloComponent {
  foo: string = secret();
}
