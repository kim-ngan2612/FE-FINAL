import Admin from "./features/admin";
import Customer from "./features/customer";
import logined from "./features/logined";
import SignIn from "./features/SignIn";
import "./style.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import PageNotFound from "./features/pagenotfound";
import PrivateRoute from "./features/PrivateRoute";
import 'antd/dist/antd.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Customer />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          {/* <Route exact path="/" element={<Admin />} /> */}

          {/* <Route index element={<Home />} />
            <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
