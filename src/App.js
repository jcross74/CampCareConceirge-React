import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate, usLocation, Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./styles/app.sass";
import Page from "./components/Page";
import Main from "./screens/Main";
import About from "./screens/About";
import Home from "./screens/Home";
import Results from "./screens/Main/Results";
import CampDetails from "./screens/Main/Details";
import Resources from "./screens/Resources";
import FindCamps from "./screens/FindCamps";
import Contact from "./screens/Contact";
import CampsDashboard from "./screens/CampsDashboard";
import NewCamp from "./screens/NewCamp";
import EditCamp from "./screens/EditCamp";
import Drafts from "./screens/PendingCamps";
import Released from "./screens/Released";
import Comments from "./screens/Comments";
import Scheduled from "./screens/Scheduled";
import Customers from "./screens/Customers";
import ProviderList from "./screens/ProviderList";
import Promote from "./screens/Promote";
import Notification from "./screens/Notification";
import Settings from "./screens/Settings";
import UpgradeToPro from "./screens/UpgradeToPro";
import MessageCenter from "./screens/MessageCenter";
import ExploreCreators from "./screens/ExploreCreators";
import AffiliateCenter from "./screens/AffiliateCenter";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Earning from "./screens/Earning";
import Refunds from "./screens/Refunds";
import Payouts from "./screens/Payouts";
import Statements from "./screens/Statements";
import Shop from "./screens/Shop";
import PageList from "./screens/PageList";
import UserList from "./screens/UsersList";
import TagsList from "./screens/Data/Tags";
import SeasonsList from "./screens/Data/Seasons";
import FormatsList from "./screens/Data/Format";
import Navigation from "./components/Navigation";
import MainNavigation from "./components/MainNavigation";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const auth = getAuth();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      {isAdminRoute ? (
        <Navigation isAuthenticated={isAuthenticated} />
      ) : location.pathname !== "/sign-in" && location.pathname !== "/sign-up" ? (
        <MainNavigation onOpen={() => setIsBurgerOpen(true)} />
      ) : null}

      {isBurgerOpen && (
        <div className="mobileMenu">
          <Link to="/about">About Us</Link>
          <Link to="/find-camps">Find a Camp</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/contact">Contact Us</Link>
          <button onClick={() => setIsBurgerOpen(false)}>Close</button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin">
          <Route
            index
            element={
              <Page title="Admin Dashboard">
                <Home />
              </Page>
            }
          />
          <Route
            path="/admin/camps/dashboard"
            element={
              <Page title="Camps Dashboard">
                <CampsDashboard />
              </Page>
            }
          />
          <Route
            path="/admin/camps/add"
            element={
              <Page title="New Camp">
                <NewCamp />
              </Page>
            }
          />
          <Route
            path="/admin/camps/edit"
            element={
              <Page title="Edit Camp">
                <EditCamp />
              </Page>
            }
          />
          <Route
            path="/admin/camps/pending"
            element={
              <Page title="Pending Camps">
                <Drafts />
              </Page>
            }
          />
          <Route
            path="/admin/camps/approved"
            element={
              <Page title="Approved Camps">
                <Released />
              </Page>
            }
          />
          <Route
            path="/admin/products/comments"
            element={
              <Page title="Comments">
                <Comments />
              </Page>
            }
          />
          <Route
            path="products/scheduled"
            element={
              <Page title="Scheduled">
                <Scheduled />
              </Page>
            }
          />
          <Route
            path="/admin/users/dashboard"
            element={
              <Page title="Users">
                <UserList />
              </Page>
            }
          />
          <Route
            path="/admin/tags"
            element={
              <Page title="Tags">
                <TagsList />
              </Page>
            }
          />

          <Route
            path="/admin/seasons"
            element={
              <Page title="Seasons">
                <SeasonsList />
              </Page>
            }
          />

          <Route
            path="/admin/format"
            element={
              <Page title="Formats">
                <FormatsList />
              </Page>
            }
          />

          <Route
            path="/admin/providers/overview"
            element={
              <Page title="Providers">
                <ProviderList />
              </Page>
            }
          />
          <Route
            path="shop"
            element={
              <Page wide>
                <Shop />
              </Page>
            }
          />
          <Route
            path="income/earning"
            element={
              <Page title="Earning">
                <Earning />
              </Page>
            }
          />
          <Route
            path="income/refunds"
            element={
              <Page title="Refunds">
                <Refunds />
              </Page>
            }
          />
          <Route
            path="income/payouts"
            element={
              <Page title="Payouts">
                <Payouts />
              </Page>
            }
          />
          <Route
            path="income/statements"
            element={
              <Page title="Statements">
                <Statements />
              </Page>
            }
          />
          <Route
            path="promote"
            element={
              <Page title="Promote">
                <Promote />
              </Page>
            }
          />
          <Route
            path="notification"
            element={
              <Page title="Notification">
                <Notification />
              </Page>
            }
          />
          <Route
            path="settings"
            element={
              <Page title="Settings">
                <Settings />
              </Page>
            }
          />
          <Route
            path="upgrade-to-pro"
            element={
              <Page title="Upgrade to Pro">
                <UpgradeToPro />
              </Page>
            }
          />
          <Route
            path="message-center"
            element={
              <Page title="Message center">
                <MessageCenter />
              </Page>
            }
          />
          <Route
            path="/admin/creators"
            element={
              <Page title="Providers">
                <ExploreCreators />
              </Page>
            }
          />
          <Route
            path="affiliate-center"
            element={
              <Page title="Affiliate center">
                <AffiliateCenter />
              </Page>
            }
          />
          <Route path="pagelist" element={<PageList />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/results" element={<Results />} />
        <Route path="/details" element={<CampDetails />} />
        <Route path="/logout" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/find-camps" element={<FindCamps />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
    </>
  );
}

export default App;