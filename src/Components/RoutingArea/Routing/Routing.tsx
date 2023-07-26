import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import AddCompany from "../../CompanyArea/AddCompany/AddCompany";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CompanyTable from "../../CompanyArea/CompanyTable/CompanyTable";
import DeleteCompany from "../../CompanyArea/DeleteCompany/DeleteCompany";
import EditCompany from "../../CompanyArea/EditCompany/EditCompany";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import CouponList, { CouponListType } from "../../CouponArea/CouponList/CouponList";
import DeleteCoupon from "../../CouponArea/DeleteCoupon/DeleteCoupon";
import EditCoupon from "../../CouponArea/EditCoupon/EditCoupon";
import AddCustomer from "../../CustomerArea/AddCustomer/AddCustomer";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import CustomerTable from "../../CustomerArea/CustomerTable/CustomerTable";
import DeleteCustomer from "../../CustomerArea/DeleteCustomer/DeleteCustomer";
import EditCustomer from "../../CustomerArea/EditCustomer/EditCustomer";
import Donate from "../../PagesArea/Donate/Donate";
import Home from "../../PagesArea/Home/Home";
import ContactUs from "../../SharedArea/ContactUs/ContactUs";
import Login from "../../UserArea/Login/Login";
import Logout from "../../UserArea/Logout/Logout";
import Page404 from "../Page404/Page404";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>

        {/* ------------------------------------- */}
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        {/* ------------------------------------- */}
        <Route index element={<Home />} />
        {/* ------------------------------------- */}
        <Route path="/donate" element={<Donate to={"CaaS LTD"} bank={10} branch={0} account={0} />}/>
        <Route path="/contact-us" element={<ContactUs />} />
        {/* ------------------------------------- */}
        
        {/* ##################################### */}
        
        <Route path="/admin/coupons" element={<CouponList couponListType={CouponListType.ADMIN_VIEW} />} />
        {/*   -   -   -   -   -   -   -   -   -   */}
        <Route path="/admin/companies" element={<CompanyTable />} />
        <Route path="/admin/companies/:id" element={<CompanyDetails />} />
        <Route path="/admin/companies/add" element={<AddCompany />} />
        <Route path="/admin/companies/edit/:id" element={<EditCompany />} />
        <Route path="/admin/companies/delete/:id" element={<DeleteCompany />} />
        {/*   -   -   -   -   -   -   -   -   -   */}
        <Route path="/admin/customers" element={<CustomerTable />} />
        <Route path="/admin/customers/:id" element={<CustomerDetails />} />
        <Route path="/admin/customers/add" element={<AddCustomer />} />
        <Route path="/admin/customers/edit/:id" element={<EditCustomer />} />
        <Route path="/admin/customers/delete/:id" element={<DeleteCustomer />} />

        {/* ##################################### */}

        <Route path="/company/coupons" element={<CouponList couponListType={CouponListType.COMPANY_CONTROL} />} />
        <Route path="/company/coupons/add" element={<AddCoupon />} />
        <Route path="/company/coupons/edit/:id" element={<EditCoupon />} />
        <Route path="/company/coupons/delete/:id" element={<DeleteCoupon />} />
        
        {/* ##################################### */}
        
        <Route path="/customer/coupons" element={<CouponList couponListType={CouponListType.CUSTOMER_BROWSE_AND_PURCHASE} />} />
        <Route path="/customer/coupons/purchased" element={<CouponList couponListType={CouponListType.CUSTOMER_VIEW_PURCHASED} />} />

        {/* ##################################### */}

        <Route path="/user/login" element={<Login />} />
        <Route path="/user/logout" element={<Logout />} />

        {/* ##################################### */}

        <Route path="*" element={<Page404 />} />      {/********** finally **********/}
        {/* ------------------------------------- */}

      </Routes>
    </div>
  );
}

export default Routing;
