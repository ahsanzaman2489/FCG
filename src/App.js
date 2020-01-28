import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Fallback from "./components/Fallback";

const Home = lazy(() => import("./routes/Home/Home"));
const CarDetail = lazy(() => import("./routes/CarDetail/CarDetail"));
const NotFound = lazy(() => import("./routes/404"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:id" component={CarDetail} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
