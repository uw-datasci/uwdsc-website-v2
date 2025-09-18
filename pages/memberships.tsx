import SEO from "@/components/SEO/SEO";
import SectionTitle from "@/components/UI/SectionTitle";
import withAuth from "@/components/permissions/authPage";
import AdminTable from "@/components/tables/AdminTable";
import { AppDispatch, RootState } from "@/store/store";
import { getPaidUsers } from "@/utils/apiCalls/userApiCalls";
import { FaBlackTie } from "react-icons/fa";
import { UserRound } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatCard from "@/components/cards/StatCard";
import { setPaidUsers } from "@/store/slices/paidUsersSlice";

require("dotenv").config();

export interface PaidUsers {
  id: string;
  isMathSocMember: boolean;
}

function Memberships() {
  const dispatch = useDispatch<AppDispatch>();
  const userRole = useSelector((state: RootState) => state.loginToken.role);
  const { totalCount, mathSocCount } = useSelector(
    (state: RootState) => state.paidUsers,
  );

  useEffect(() => {
    const fetchPaidUsers = async () => {
      try {
        const response = await getPaidUsers();
        dispatch(setPaidUsers(response.data));
      } catch (err) {
        console.log("Failed to fetch paid users: ", err);
      }
    };
    fetchPaidUsers();
  }, [dispatch]);

  return (
    <>
      <SEO title="Memberships" />
      <section className="mx-container mb-section mt-14 lg:mt-20">
        <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          {userRole === "admin" ? "Admin Dashboard" : "Exec Dashboard"}
        </h1>
        <div className="flex flex-col gap-2 overflow-visible">
          <SectionTitle mb="mb-12">Memberships</SectionTitle>
          <div className="flex flex-col items-center gap-5 pb-3 md:flex-row md:items-start">
            {/* Total Paid Users Count */}
            <StatCard
              value={totalCount}
              label="Total Paid Users"
              icon={<UserRound className="h-8 w-8 text-white" />}
              cardBgColour="bg-transparent"
              borderColour="border-white/30"
              statColour="text-white"
              labelColour="text-white/50"
            />
            {/* Total MathSoc Paid Users Count */}
            <StatCard
              value={mathSocCount}
              label="Total Paid MathSoc Users"
              icon={<FaBlackTie className="h-8 w-8 text-[#C50078]" />}
              cardBgColour="bg-transparent"
              borderColour="border-white/30"
              statColour="text-white"
              labelColour="text-white/50"
            />
          </div>
          <AdminTable />
        </div>
      </section>
    </>
  );
}

export default withAuth(Memberships, ["admin", "exec"]);
