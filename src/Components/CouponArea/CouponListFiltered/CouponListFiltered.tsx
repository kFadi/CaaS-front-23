import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { BsFilterRight } from "react-icons/bs";
import { IoCaretDownCircle, IoCaretUpCircle } from "react-icons/io5";
import { MdSettingsBackupRestore } from "react-icons/md";
import { RiFilter2Fill } from "react-icons/ri";
import * as yup from "yup";
import { Category, CouponFilter, CouponModel } from "../../../Models/CouponModels";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CouponItem, { CouponPermissionsLevel } from "../CouponItem/CouponItem";
import "./CouponListFiltered.css";


interface CouponListFilteredProps {
	originCoupons: CouponModel[];
    emptyMessage: string;
    couponLevel: CouponPermissionsLevel;
}

function CouponListFiltered(props: CouponListFilteredProps): JSX.Element {

    //--------------------------------------------------
    const originCategories : Category[] = [];
    const originFilter : CouponFilter =
        {
            "minId":"",
            "maxId":"",
            "categories":originCategories,
            "titleContains":"",
            "descriptionContains":"",
            "minDaysLeft":"",
            "maxDaysLeft":"",
            "minCouponsLeft":"",
            "maxCouponsLeft":"",
            "minPrice":"",
            "maxPrice":""
        };
    const [isFilterShown,setIsFilterShown] = useState(false);
    const [isFilterApplied,setIsFilterApplied] = useState(false);
    const [coupons, setCoupons] = useState(props.originCoupons);
    
    //--------------------------------------------------

    useEffect(() => {
        setCoupons(props.originCoupons)
    },[props.originCoupons]);

    //--------------------------------------------------

    // Step 6 - Manage Your schema
    const schema = yup.object().shape({
        
        // categories:
        //     array().of(
        //         object().shape({
        //                 category:
        //                     yup.mixed<Category>().oneOf(Object.values(Category))
        //             })
        //         ),

        //----------------------
        
        titleContains:
            yup.string()
                .max(45, "max 45 chars")
                .notRequired()
                .default(undefined),
        descriptionContains:
            yup.string()
                .max(45, "max 45 chars")
                .notRequired()
                .default(undefined),
        
        //----------------------
        
        minId:
            yup.lazy(val => {
                    if (  val === null || val === undefined || val === "" ) {
                        return yup.mixed().notRequired();
                        //return yup.string().notRequired().default(undefined);
                    }
                    return yup.number()
                                .min(1,"min 1")
                                .integer(" an integer")
                                .typeError("a number");
            }),

        maxId:
            yup.lazy(val => {
                    if ( val === null || val === undefined || val === "" ) {
                        return yup.mixed().notRequired();
                    }
                    return yup.number()
                                .when("minId", (minId) =>
                                        minId
                                        ?
                                        yup.number()
                                            .min( yup.ref('minId'),">= \"min\"")
                                            .integer(" an integer")
                                            .typeError("a number")
                                        :
                                        yup.number()
                                            .min(1,"min 1")
                                            .integer(" an integer")
                                            .typeError("a number")
                                );
            }),
        
        //----------------------
        
        minDaysLeft:
            yup.lazy(val => {
                if (  val === null || val === undefined || val === "" ) {
                    return yup.mixed().notRequired();
                }
                return yup.number()
                            .min(0, "min 0")
                            .integer(" an integer")
                            .typeError("a number");
            }),
        
        maxDaysLeft:
            yup.lazy(val => {        
                if ( val === null || val === undefined || val === "" ) {
                    return yup.mixed().notRequired();
                }
                return yup.number()
                            .when("minDaysLeft", (minDaysLeft) =>
                                    minDaysLeft
                                    ?
                                    yup.number()
                                        .min( yup.ref('minDaysLeft'),">= \"min\"")
                                        .integer(" an integer")
                                        .typeError("a number")
                                    :
                                    yup.number()
                                        .min(0,"min 0")
                                        .integer(" an integer")
                                        .typeError("a number")
                            );
            }),

        //----------------------
        
        minCouponsLeft:
            yup.lazy(val => {
                if (  val === null || val === undefined || val === "" ) {
                    return yup.mixed().notRequired();
                }
                return yup.number()
                            .min(0, "min 0")
                            .integer(" an integer")
                            .typeError("a number");
            }),

        maxCouponsLeft:
            yup.lazy(val => {            
                if ( val === null || val === undefined || val === "" ) {
                    return yup.mixed().notRequired();
                }
                return yup.number()
                            .when("minCouponsLeft", (minCouponsLeft) =>
                                    minCouponsLeft
                                    ?
                                    yup.number()
                                        .min( yup.ref('minCouponsLeft'),">= \"min\"")
                                        .integer(" an integer")
                                        .typeError("a number")
                                    :
                                    yup.number()
                                        .min(0,"min 0")
                                        .integer(" an integer")
                                        .typeError("a number")
                            );
            }),
        
        //----------------------
        
        minPrice:
            yup.lazy(val => {
                if (  val === null || val === undefined || val === "" ) {
                    return yup.mixed().notRequired();
                }
                return yup.number()
                            .min(0, "min 0")
                            .typeError("a number");
            }),

        maxPrice:
            yup.lazy(val => {                
                if ( val === null || val === undefined || val === "" ) {
                    return yup.mixed().notRequired();
                }
                return yup.number()
                            .when("minPrice", (minPrice) =>
                                    minPrice
                                    ?
                                    yup.number()
                                        .min( yup.ref('minPrice'),">= \"min\"")
                                        .typeError("a number")
                                    :
                                    yup.number()
                                        .min(0,"min 0")
                                        .typeError("a number")
                            );
            }),

        //----------------------
        
    });
    
    
    // Step 7 - Prepare the Hook >> useHook for the rescue 
    
    let defaultValuesObj = { ...originFilter };
    /* * * * * */
    const { register, handleSubmit, formState: { errors, isDirty, isValid }, reset, control } =
        useForm<CouponFilter>({ mode: "all", resolver: yupResolver(schema), defaultValues: defaultValuesObj });
    /* * * * * */
    const { dirtyFields } = useFormState({ control });
    /* * * * * */

    
    ///////////////////////////////////////////
    
    function getDaysLeft(endDate: Date) {
    
        const now= new Date();
        now.setHours(0,0,0,0);
        const d1 = now.getTime();
    
        const dt = new Date (endDate);
        dt.setHours(0,0,0,0);
        const d2 = dt.getTime();
    
        return ((d2-d1)/(1000*60*60*24));
    }
    
    ///////////////////////////////////////////

    function hideFilter() {

        setIsFilterShown(false)
        cancelFilter();
    }

    ///////////////////////////////////////////

    function cancelFilter() {

        reset();
        if (isFilterApplied){
            setCoupons(props.originCoupons);
            setIsFilterApplied(false);
        }

    }

    ///////////////////////////////////////////


    const applyFilter = (f: CouponFilter) => {
    // const applyFilter = async (f: CouponFilter) => {
    
        if( JSON.stringify(f) === JSON.stringify(originFilter) ){
            cancelFilter();
        } else {
            setCoupons(
                // await setCoupons(
                props.originCoupons.filter(
                    
                    c => (
                        ( (f.categories.length === 0) || (f.categories.includes(c.category)) )
                        &&
                        ( (!f.titleContains) || (c.title.toLowerCase().includes(f.titleContains.toLowerCase())) )
                        &&
                        ( (!f.descriptionContains) || (c.description.toLowerCase().includes(f.descriptionContains.toLowerCase())) )
                        &&
                        ( (f.minId==="") || (c.id >= +(f.minId)) )
                        &&
                        ( (f.maxId==="") || (c.id <= +(f.maxId)) )
                        &&
                        ( (f.minDaysLeft==="") || (getDaysLeft(c.endDate) >= +(f.minDaysLeft)) )
                        &&
                        ( (f.maxDaysLeft==="") || (getDaysLeft(c.endDate) <= +(f.maxDaysLeft)) )
                        &&
                        ( (f.minCouponsLeft==="") || (c.amount >= +(f.minCouponsLeft)) )
                        &&
                        ( (f.maxCouponsLeft==="") || (c.amount <= +(f.maxCouponsLeft)) )
                        &&
                        ( (f.minPrice==="") || (c.price >= +(f.minPrice)) )
                        &&
                        ( (f.maxPrice==="") || (c.price <= +(f.maxPrice)) )
                    )
                )
            );
            setIsFilterApplied(true);
        }
    
    }

    
    
    ////////////////////////////////////////////

    return (
        <div className="CouponListFiltered flex flx-col flx-start">

            <div className="flex flx-row flx-center f-filter-header">
                    <BsFilterRight size={36} />
                    {(!isFilterShown) && (
                        <div onClick={()=>setIsFilterShown(true)} title="Show Filter Options.." className={"flex flx-center pointer hvr m-item f-filter-header-"+((!isFilterShown)?"show":"hide")}>
                            <IoCaretDownCircle size={46}/>    
                        </div>
                    )}
                    {(isFilterShown) && (
                        <div onClick={hideFilter} title="Hide Filter Options.." className={"flex flx-center pointer hvr m-item f-filter-header-"+((isFilterShown)?"show":"hide")}>
                            <IoCaretUpCircle size={46}/>    
                        </div>   
                    )}
                
            </div>

            {(isFilterShown) && ( 

                /* Step 9 - handleSubmit your form */
                <form onSubmit={handleSubmit(applyFilter)} className="flex flx-row flx-center f-filter-form">
                    
                    <div className="flex flx-col flx-center f-filter-configs">

                        <div className="flex flx-row flx-even f-filter-configs-row">
                            
                            <fieldset className="flex flx-row flx-even f-filter-fieldset">
                                <legend className="f-filter-legend">Categories</legend>
                                {
                                    (Object.keys(Category) as Array<keyof typeof Category>).map
                                        (
                                            (c) =>                
                                                <div className="flex flx-col flx-center" key={c}>
                                                    <input className={"f-filter-checkbox"}
                                                        type="checkbox" 
                                                        value={c} 
                                                        id={c}
                                                        name ="categories" 
                                                        {...register("categories")} 
                                                    />
                                                    <label htmlFor={c} className="f-filter-label-checkbox">{c}</label>
                                                </div>
                                        )
                                }   
                            </fieldset>

                        </div>

                        <div className="flex flx-row flx-btw f-filter-configs-row">
                            
                            <fieldset className="flex flx-col flx-end f-filter-fieldset2" title="case insensitive">
                                <legend className="f-filter-legend">Contained in</legend>
                                <div className="f-filter-group">
                                    <input className={"f-filter-input" + (((dirtyFields.titleContains) && (!(errors.titleContains?.message)))? " f-filter-input-valid":"")}
                                        type="text"
                                        {...register("titleContains")}
                                    />
                                    <label className="f-filter-label">Title</label>
                                    <span className="f-filter-span">{errors.titleContains?.message}</span>
                                </div>
                                <div className="f-filter-group">
                                    <input className={"f-filter-input" + (((dirtyFields.descriptionContains) && (!(errors.descriptionContains?.message)))? " f-filter-input-valid":"")}
                                        type="text"
                                        {...register("descriptionContains")}
                                    />
                                    <label className="f-filter-label">Description</label>
                                    <span className="f-filter-span">{errors.descriptionContains?.message}</span>
                                </div>
                            </fieldset>

                            <fieldset className="flex flx-col flx-end f-filter-fieldset2">
                                <legend className="f-filter-legend">Id</legend>
                                <div className="f-filter-group">
                                    <input className={"f-filter-input" + (((dirtyFields.minId) && (!(errors.minId?.message)))? " f-filter-input-valid":"")}
                                        type="text"
                                        {...register("minId")}
                                    />
                                    <label className="f-filter-label">min</label>
                                    <span className="f-filter-span">{errors.minId?.message}</span>
                                </div>
                                <div className="f-filter-group">
                                    <input className={"f-filter-input" + (((dirtyFields.maxId) && (!(errors.maxId?.message)))? " f-filter-input-valid":"")}
                                        type="text"
                                        {...register("maxId")}
                                    />
                                    <label className="f-filter-label">max</label>
                                    <span className="f-filter-span">{errors.maxId?.message}</span>
                                </div>
                            </fieldset>
                            
                            <fieldset className="flex flx-col flx-end f-filter-fieldset2">
                                <legend className="f-filter-legend">Days Left</legend>
                                <div className="f-filter-group">
                                    <input className={"f-filter-input" + (((dirtyFields.minDaysLeft) && (!(errors.minDaysLeft?.message)))? " f-filter-input-valid":"")}
                                        type="text"
                                        {...register("minDaysLeft")}
                                    />
                                    <label className="f-filter-label">min</label>
                                    <span className="f-filter-span">{errors.minDaysLeft?.message}</span>
                                </div>
                                <div className="f-filter-group">
                                    <input className={"f-filter-input" + (((dirtyFields.maxDaysLeft) && (!(errors.maxDaysLeft?.message)))? " f-filter-input-valid":"")}
                                        type="text"
                                        {...register("maxDaysLeft")}
                                    />
                                    <span className="f-filter-span">{errors.maxDaysLeft?.message}</span>
                                    <label className="f-filter-label">max</label>
                                </div>
                            </fieldset>

                            <fieldset className="flex flx-col flx-end f-filter-fieldset2">
                                <legend className="f-filter-legend">Coupons Left</legend>
                                <div className="f-filter-group">
                                    <input className={"f-filter-input" + (((dirtyFields.minCouponsLeft) && (!(errors.minCouponsLeft?.message)))? " f-filter-input-valid":"")}
                                        type="text"
                                        {...register("minCouponsLeft")}
                                    />
                                    <label className="f-filter-label">min</label>
                                    <span className="f-filter-span">{errors.minCouponsLeft?.message}</span>
                                </div>
                                <div className="f-filter-group">
                                    <input className={"f-filter-input" + (((dirtyFields.maxCouponsLeft) && (!(errors.maxCouponsLeft?.message)))? " f-filter-input-valid":"")}
                                        type="text"
                                        {...register("maxCouponsLeft")}
                                    />
                                    <label className="f-filter-label">max</label>
                                    <span className="f-filter-span">{errors.maxCouponsLeft?.message}</span>
                                </div>
                            </fieldset>

                            <fieldset className="flex flx-col flx-end f-filter-fieldset2">
                                <legend className="f-filter-legend">Price</legend>
                                <div className="f-filter-group">
                                    <input className={"f-filter-input" + (((dirtyFields.minPrice) && (!(errors.minPrice?.message)))? " f-filter-input-valid":"")}
                                        type="text"
                                        {...register("minPrice")}
                                    />
                                    <label className="f-filter-label">min</label>
                                    <span className="f-filter-span">{errors.minPrice?.message}</span>
                                </div>
                                <div className="f-filter-group">
                                    <input className={"f-filter-input" + (((dirtyFields.maxPrice) && (!(errors.maxPrice?.message)))? " f-filter-input-valid":"")}
                                        type="text"
                                        {...register("maxPrice")}
                                    />
                                    <label className="f-filter-label">max</label>
                                    <span className="f-filter-span">{errors.maxPrice?.message}</span>
                                </div>
                            </fieldset>

                        </div>
                    </div>
                    
                    <div>
                        <div className="flex flx-col flx-center f-filter-actions">
                            <div 
                                className={"f-reset" + ((isDirty || isFilterApplied)? "-active pointer hvr m-item":"")}
                                title="reset" 
                                onClick={ ()=>{if (isDirty || isFilterApplied) cancelFilter()}}>          
                                    <MdSettingsBackupRestore size={48} />
                            </div>
                            
                            <div title="apply filter">
                                <button
                                    className={"f-btn-icon" + 
                                        (
                                            (isValid && (isDirty || isFilterApplied))
                                            ? 
                                            ""
                                            :
                                            "-inactive"
                                        )
                                    }
                                    //disabled={(!isValid || !isDirty)} 
                                    >
                                        <RiFilter2Fill size={48} />
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            )}

            <div className="flex flx-row-wrap flx-even coupons-list">
                {
                    (coupons.length > 0)
                    ? 
                    ( coupons.map( c => <CouponItem key={c.id} coupon={c} level= {props.couponLevel} /> ) )
                    :
                    <EmptyView msg={props.emptyMessage} />
                }
            </div>

        </div>
    );
}

export default CouponListFiltered;
