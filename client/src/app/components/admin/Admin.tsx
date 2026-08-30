import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AdminLayout } from "./AdminLayout";
import { AdminDashboard } from "./AdminDashboard";
import { ServicesManagement } from "./ServicesManagement";
import { ProviderManagement } from "./ProviderManagement";
import { ProviderApplications } from "./ProviderApplications";
import { ComplianceReview } from "./ComplianceReview";
import { UserManagement } from "./UserManagement";
import { BookingManagement } from "./BookingManagement";
import { PaymentsEscrow } from "./PaymentsEscrow";
import { ReviewsModeration } from "./ReviewsModeration";
import { NotificationsCMS } from "./NotificationsCMS";
import { useLocation, useNavigate } from "react-router-dom";

export function Admin() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract section from URL
  const sectionFromUrl =
    location.pathname.split("/admin/")[1] || "dashboard";

  const [currentSection, setCurrentSection] = useState(sectionFromUrl);

  // Sync state when URL changes (refresh / direct link)
  useEffect(() => {
    setCurrentSection(sectionFromUrl);
  }, [sectionFromUrl]);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    navigate(`/admin/${section}`);
  };

  const renderSection = () => {
    switch (currentSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "services":
        return <ServicesManagement />;
      case "providers":
        return <ProviderManagement />;
      case "applications":
        return <ProviderApplications />;
      case "compliance":
        return <ComplianceReview />;
      case "users":
        return <UserManagement />;
      case "bookings":
        return <BookingManagement />;
      case "payments":
        return <PaymentsEscrow />;
      case "reviews":
        return <ReviewsModeration />;
      case "notifications":
        return <NotificationsCMS />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout
      currentSection={currentSection}
      onSectionChange={handleSectionChange}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </AdminLayout>
  );
}

