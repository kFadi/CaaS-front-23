class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        welcome: "https://couponinja-723-be.oa.r.appspot.com/api/welcome",
        admin: "https://couponinja-723-be.oa.r.appspot.com/api/admin",
        companies: "https://couponinja-723-be.oa.r.appspot.com/api/companies",
        customers: "https://couponinja-723-be.oa.r.appspot.com/api/customers"  
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        welcome: "www.aws.com/MohseWebSite/api/welcome",
        admin: "www.aws.com/MohseWebSite/api/admin",
        companies: "www.aws.com/MohseWebSite/api/companies",
        customers: "www.aws.com/MohseWebSite/api/customers"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;