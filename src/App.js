import React from "react";
import style from "./App.module.css";
import "antd/dist/antd.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NewStudent from "./components/NewStudent";
import ModifyStudent from "./components/ModifyStudent";

export default function App() {
  return (
    <div className={style.app}>
      <>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/NewStudent" component={NewStudent} />
          <Route path="/ModifyStudent/:id" component={ModifyStudent} />
        </Switch>
      </>
    </div>
  );
}
