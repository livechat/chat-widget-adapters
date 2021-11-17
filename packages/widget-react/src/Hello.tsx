import * as React from "react";
import { secret } from "./secret";

type Props = {
  name: string;
};

export function Hello({ name }: Props) {
  return (
    <h1>
      Hello {name.toLowerCase()} {secret()}
    </h1>
  );
}
