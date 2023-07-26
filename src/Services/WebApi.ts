import axios from "axios";
import { CompanyModel } from "../Models/CompanyModels";
import { CouponModel } from "../Models/CouponModels";
import { CustomerModel } from "../Models/CustomerModels";
import { LoginReqModel, LoginResModel } from "../Models/UserModels";
import globals from "./Globals";


import tokenAxios from "./InterceptorAxios";

class WebApi {

    private welcomeApi = globals.urls.welcome;
    
    private adminApiCompanies = globals.urls.admin + '/companies';
    private adminApiCustomers = globals.urls.admin + '/customers';
    private adminApiCoupons = globals.urls.admin + '/coupons';
    
    private companiesApi = globals.urls.companies;
    private companiesApiCoupons = globals.urls.companies + '/coupons';
    
    private customersApi = globals.urls.customers;
    private customersApiCoupons = globals.urls.customers + '/coupons';
    private customersApiCouponsPurchased = globals.urls.customers + '/coupons/purchased';


    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////     welcome     ///////////////////////////
    ///////////////////////////////////////////////////////////////////////

    public async login(loginReq: LoginReqModel): Promise<any> {
        return await axios.post<LoginResModel>(this.welcomeApi, loginReq);
    }


    ///////////////////////////////////////////////////////////////////////
    ////////////////////////////     admin     ////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    public async addCompany(company: CompanyModel): Promise<any> {
        return await tokenAxios.post<CompanyModel>(this.adminApiCompanies, company);
    }
    
    public async updateCompany(id: number, company: CompanyModel): Promise<any> {
        return await tokenAxios.put<CompanyModel>(this.adminApiCompanies + '/' + id, company);
    }

    public async deleteCompany(id: number): Promise<any> {
        return await tokenAxios.delete<any>(this.adminApiCompanies + '/' + id);
    }

    public async getAllCompanies(): Promise<any> {
        return await tokenAxios.get<CompanyModel[]>(this.adminApiCompanies);
    }

    public async getOneCompany(id: number): Promise<any> {
        return await tokenAxios.get<CompanyModel>(this.adminApiCompanies + '/' + id);
    }

    ///////////////////////////////////////////////////////////////////////

    public async addCustomer(customer: CustomerModel): Promise<any> {
        return await tokenAxios.post<CustomerModel>(this.adminApiCustomers, customer);
    }
    
    public async updateCustomer(id: number, customer: CustomerModel): Promise<any> {
        return await tokenAxios.put<CustomerModel>(this.adminApiCustomers + '/' + id, customer);
    }

    public async deleteCustomer(id: number): Promise<any> {
        return await tokenAxios.delete<any>(this.adminApiCustomers + '/' + id);
    }

    public async getAllCustomers(): Promise<any> {
        return await tokenAxios.get<CustomerModel[]>(this.adminApiCustomers);
    }

    public async getOneCustomer(id: number): Promise<any> {
        return await tokenAxios.get<CustomerModel>(this.adminApiCustomers + '/' + id);
    }

    ///////////////////////////////////////////////////////////////////////
    
    public async getAllCoupons(): Promise<any> {
        return await tokenAxios.get<CouponModel[]>(this.adminApiCoupons);
    }
    

    ///////////////////////////////////////////////////////////////////////
    //////////////////////////     companies     //////////////////////////
    ///////////////////////////////////////////////////////////////////////

    public async addCompanyCoupon(coupon: CouponModel): Promise<any> {
        return await tokenAxios.post<CouponModel>(this.companiesApiCoupons, coupon);
    }
    
    public async updateCompanyCoupon(id: number, coupon: CouponModel): Promise<any> {
        return await tokenAxios.put<CouponModel>(this.companiesApiCoupons + '/' + id, coupon);
    }

    public async deleteCompanyCoupon(id: number): Promise<any> {
        return await tokenAxios.delete<any>(this.companiesApiCoupons + '/' + id);
    }

    public async getCompanyCoupons(): Promise<any> {
        return await tokenAxios.get<CouponModel[]>(this.companiesApiCoupons);
    
    }

    ///////////////////////////////////////////////////////////////////////
    
    public async getCompanyDetails(): Promise<any> {
        return await tokenAxios.get<CompanyModel>(this.companiesApi + '/me');
    }


    ///////////////////////////////////////////////////////////////////////
    //////////////////////////     customers     //////////////////////////
    ///////////////////////////////////////////////////////////////////////

    public async addCustomerPurchase(coupon: CouponModel): Promise<any> {
        return await tokenAxios.post<CouponModel>(this.customersApiCouponsPurchased, coupon);
    }
    
    public async getCustomerCoupons(): Promise<any> {
        return await tokenAxios.get<CouponModel[]>(this.customersApiCouponsPurchased);
    }

    ///////////////////////////////////////////////////////////////////////

    public async getBrowseCoupons(): Promise<any> {
        return await tokenAxios.get<CouponModel[]>(this.customersApiCoupons);
    }

    ///////////////////////////////////////////////////////////////////////
    
    public async getCustomerDetails(): Promise<any> {
        return await tokenAxios.get<CustomerModel>(this.customersApi + '/me');
    }
    

    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

}

const web = new WebApi();
export default web;