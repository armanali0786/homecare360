// import { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Navigation } from "@/app/components/Navigation";
// import { HomePage } from "@/app/components/HomePage";
// import { BrowseServices } from "@/app/components/BrowseServices";
// import { ViewProfile } from "@/app/components/ViewProfile";
// import { BecomeProvider } from "@/app/components/BecomeProvider";
// import { MyBookings } from "@/app/components/MyBookings";

// export default function App() {
//   const [currentPage, setCurrentPage] = useState("home");
//   const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
//   const [previousPage, setPreviousPage] = useState("browse");

//   const handleNavigate = (page: string) => {
//     setPreviousPage(currentPage);
//     setCurrentPage(page);
//     setSelectedProviderId(null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleViewProfile = (providerId: string) => {
//     setSelectedProviderId(providerId);
//     setPreviousPage(currentPage);
//     setCurrentPage("profile");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleBackFromProfile = () => {
//     setCurrentPage(previousPage);
//     setSelectedProviderId(null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleBookNow = () => {
//     setCurrentPage("bookings");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const renderPage = () => {
//     switch (currentPage) {
//       case "home":
//         return <HomePage />;
//       case "browse":
//         return <BrowseServices onViewProfile={handleViewProfile} />;
//       case "profile":
//         return (
//           <ViewProfile
//             providerId={selectedProviderId || ""}
//             onBack={handleBackFromProfile}
//             onBookNow={handleBookNow}
//           />
//         );
//       case "become-provider":
//         return <BecomeProvider />;
//       case "bookings":
//         return <MyBookings />;
//       default:
//         return <HomePage />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
//       <AnimatePresence mode="wait">
//         <motion.main
//           key={currentPage}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.4, ease: "easeInOut" }}
//         >
//           {renderPage()}
//         </motion.main>
//       </AnimatePresence>
//     </div>
//   );
// }
