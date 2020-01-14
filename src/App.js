import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import CarDetail from "./routes/CarDetail/CarDetail";
import Header from "./components/header";
import NotFound from "./routes/404";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/detail/:id" component={CarDetail} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
