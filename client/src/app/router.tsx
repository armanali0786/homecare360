import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";

import { HomePage }        from "./components/HomePage";
import { BrowseServices }  from "./components/BrowseServices";
import { ViewProfile }     from "./components/ViewProfile";
import { BookingPage }     from "./components/BookingPage";
import { BecomeProvider }  from "./components/BecomeProvider";
import { MyBookings }      from "./components/MyBookings";
import { ProviderDashboard } from "./components/ProviderDashboard";
import { Admin }           from "./components/admin/Admin";

import { Login }           from "./pages/Login";
import { Signup }          from "./pages/Signup";
import { BookingSuccess }  from "./pages/BookingSuccess";

import { AboutUs }         from "./pages/AboutUs";
import { Blog }            from "./pages/Blog";
import { Careers }         from "./pages/Careers";
import { Contact }         from "./pages/Contact";
import { HelpCenter }      from "./pages/HelpCenter";
import { PrivacyPolicy }   from "./pages/PrivacyPolicy";
import { Safety }          from "./pages/Safety";
import { TermsOfService }  from "./pages/TermsOfService";
import { InstantQuoteEstimator } from "./pages/InstantQuoteEstimator";
import { MockGatewayCheckout } from "./pages/MockGatewayCheckout";
import { ForgotPassword }  from "./pages/ForgotPassword";
import { GuestRoute }      from "./components/GuestRoute";
import { AdminRoute }      from "./components/AdminRoute";
import { ProtectedRoute }  from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "services",           Component: BrowseServices       },
      { path: "profile/:providerId", Component: ViewProfile          },
      { path: "booking/:providerId", Component: BookingPage          },
      { path: "booking-success",     Component: BookingSuccess        },
      { path: "quote-estimator",     Component: InstantQuoteEstimator },
      { path: "mock-gateway-checkout", Component: MockGatewayCheckout },
      { path: "become-provider",     Component: BecomeProvider        },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "bookings",          Component: MyBookings        },
          { path: "provider/dashboard", Component: ProviderDashboard },
        ],
      },
      {
        element: <GuestRoute />,
        children: [
          { path: "login",           Component: Login           },
          { path: "signup",          Component: Signup          },
          { path: "forgot-password", Component: ForgotPassword  },
        ],
      },

      { path: "about-us",       Component: AboutUs      },
      { path: "blog",           Component: Blog         },
      { path: "careers",        Component: Careers      },
      { path: "contact",        Component: Contact      },
      { path: "help-center",    Component: HelpCenter   },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "safety",         Component: Safety       },
      { path: "terms-of-service", Component: TermsOfService },

      {
        element: <AdminRoute />,
        children: [
          { path: "admin/*", Component: Admin },
        ],
      },
    ],
  },
]);
