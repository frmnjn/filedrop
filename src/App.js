import React from "react";
import "./css/tailwind.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import EditAkun from "./EditAkun";
import Drop from "./Drop";
import ListFiles from "./ListFiles";
import Register from "./Register";
import CreateDropLink from "./CreateDropLink";
import GuestRoute from "./components/GuestRoute";
import AuthRoute from "./components/AuthRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <div className="bg-gray-300 h-screen">
          <Route exact path="/" component={index} />
          {/* <GuestRoute path="/drop" component={Drop} /> */}
          <GuestRoute exact path="/drop/:username/:droplink" component={Drop} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <AuthRoute path="/profile/edit" component={EditAkun} />
          <AuthRoute path="/home" component={Home} />
          <AuthRoute path="/createdroplink" component={CreateDropLink} />
          <AuthRoute
            exact
            path="/:username/files/:folder"
            component={ListFiles}
          />
        </div>
      </Layout>
    </Router>
  );
}

const index = () => (
  <div id="app">
    <div class="bg-gray-100 flex">
      <div class="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12">
        <div class="xl:max-w-lg xl:ml-auto">
          <img
            class="h-10"
            src={require("./assets/img/logo-blue.svg")}
            alt="Workcation"
          />
          <img
            class="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-72 sm:w-full sm:object-cover sm:object-center lg:hidden"
            src="/img/beach-work.jpg"
            alt="Woman workcationing on the beach"
          />
          <h1 class="mt-6 text-2xl font-bold text-gray-900 leading-tight sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
            You can collect or drop your files easily.
            <br class="hidden lg:inline" />
            <span class="text-blue-500" />
          </h1>
          <p class="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
            FileDrop is a cloud based file collection platform to help you
            collect files from anyone in the world.
          </p>
          <div class="mt-4 sm:mt-6">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create a DropLink
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-8 lg:px-12 py-8">
        <h2 class="text-xl text-gray-900">Popular destinations</h2>
        <p class="text-gray-600">
          A selection of great work-friendly cities with lots to see and
          explore.
        </p>
        <div class="flex flex-wrap -mx-4">
          <div class="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3" />
        </div>
      </div>
    </div>
  </div>
);

export default App;
