import SectionTitle from "@/components/UI/SectionTitle";
import withAuth from "@/components/permissions/authPage";
import AdminTable from "@/components/tables/AdminTable";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

require("dotenv").config();

function Memberships() {
  const userRole = useSelector((state: RootState) => state.loginToken.role);

  return (
    <>
      <section className="mx-container mb-section mt-14 lg:mt-20">
        <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          {userRole === "admin" ? "Admin Dashboard" : "Exec Dashboard"}
        </h1>
        <div className="flex flex-col gap-2 overflow-visible">
          <SectionTitle mb="mb-12">Memberships</SectionTitle>
          <AdminTable />
        </div>
      </section>
    </>
  );
}

export default withAuth(Memberships, ["admin", "exec"]);
