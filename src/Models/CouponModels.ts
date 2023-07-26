///////////////////////////////////////
///////////////////////////////////////

export enum Category {
  FOOD = "FOOD",
  PHARMA = "PHARMA",
  COSMETICS = "COSMETICS",
  CLOTHES = "CLOTHES",
  TOYS = "TOYS",
  ELECTRICITY = "ELECTRICITY",
  SPORT = "SPORT",
  RESTAURANTS = "RESTAURANTS",
  VACATIONS = "VACATIONS",
}

//////////////////////////////////////

export class CouponModel {
  public id?: number;
  public category?: Category;
  public title?: string;
  public description?: string;
  public startDate?: Date;
  public endDate?: Date;
  public amount?: number;
  public price?: number;
  public image?: string;

  public constructor(
    id?: number,
    category?: Category,
    title?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
    amount?: number,
    price?: number,
    image?: string
  ) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.amount = amount;
    this.price = price;
    this.image = image;
  }
}

///////////////////////////////////////
///////////////////////////////////////

export class CouponFilter {
  public minId?: string;
  public maxId?: string;
  public categories?: Category[];
  public titleContains?: string;
  public descriptionContains?: string;
  public minDaysLeft?: string;
  public maxDaysLeft?: string;
  public minCouponsLeft?: string;
  public maxCouponsLeft?: string;
  public minPrice?: string;
  public maxPrice?: string;

  public constructor(
    minId?: string,
    maxId?: string,
    categories?: Category[],
    titleContains?: string,
    descriptionContains?: string,
    minDaysLeft?: string,
    maxDaysLeft?: string,
    minCouponsLeft?: string,
    maxCouponsLeft?: string,
    minPrice?: string,
    maxPrice?: string
  ) {
    this.minId = minId;
    this.maxId = maxId;
    this.categories = categories;
    this.titleContains = titleContains;
    this.descriptionContains = descriptionContains;
    this.minDaysLeft = minDaysLeft;
    this.maxDaysLeft = maxDaysLeft;
    this.minCouponsLeft = minCouponsLeft;
    this.maxCouponsLeft = maxCouponsLeft;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}

///////////////////////////////////////
///////////////////////////////////////