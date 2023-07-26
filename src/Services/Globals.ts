class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        welcome: "http://localhost:8080/api/welcome",
        admin: "http://localhost:8080/api/admin",
        companies: "http://localhost:8080/api/companies",
        customers: "http://localhost:8080/api/customers"  
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