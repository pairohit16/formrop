# Formrop

_Simple Alternative to Formik_

`Example`

```
import React from "react";
import { useFormrop } from "@pairohit/formrop";

const initProps = { email: "", password: "" };
export function Form(props) {
  const [
    credentials,        // <= gives values
    dynamiCredentials,  // <= dynamically handles onChange
    manualCredentials,  // <= manually can change values
    resetCredentials,   // <= resets all values
  ] = useFormrop(initProps);

  /**How to use manualCredentials ??
   *
   * manualCredentials({ email : "pairohit16@gmail.com"}) or
   * manualCredentials({ password : "1234"})
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(credentials);

    // after 1 sec reset credentials to simulate real form operation
    setTimeout(() => {
      resetCredentials();
    }, 1000);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        // name should be present in initProps otherwise onchange won't work
        name="email"
        value={credentials.email}
        onChange={dynamiCredentials}
      />

      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={dynamiCredentials}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

```
