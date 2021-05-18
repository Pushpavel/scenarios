# Firebase Scenarios 🧪
___

> IMPORTANT: This Project is still work in progress, anything may break or not work at any time

### 😀 What is Scenarios ?

CLI that helps setup firebase emulators data making your local first development a bit easier 🎉

Basically, scenarios runs a cloud function (that you create) from terminal and exports data after execution which can be
imported for developing your frontend

### 😄 Scenarios helps you

- Develop frontend with different firebase data easily
- Run a single command that handles running your cloud function and exporting the data for you

### 🥳 Getting Started

Let's start by installing Scenarios as a dev dependency of your project with npm.

```  
npm i firebase-scenarios --only=dev
```

Now we can set up firebase and its emulators ([firebase docs](https://firebase.google.com/docs/rules/emulator-setup))

Write your httpsCallable that generates fake data for development in ```scenarios``` folder. The directory structure
could look like

```
myproject/
    functions/
    scenarios/
        generated/
        index.js
        ...
    frontend/
    firebase.json
    ...
```

> Do not Forget to build scenarios folder if you are using typescript

To execute the httpsCallable.

```
scenarios https_callable_name
```

This command exports the firebase emulator data to ```myproject/scenarios/generated/https_callable_name```

For a sample firebase project look at ```example``` folder
