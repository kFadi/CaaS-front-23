import { FaInfoCircle } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { CustomerModel } from "../../../Models/CustomerModels";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import "./CustomerTableRow.css";


interface CustomerTableRowProps {
	customer: CustomerModel;
}


function CustomerTableRow(props: CustomerTableRowProps): JSX.Element {
    
    return (
        
		<tr className="CustomerTableRow my-table-tr">
            
            <td className="my-table-td">{props.customer.id}</td>
            <td className="my-table-td">{props.customer.firstName}</td>
            <td className="my-table-td">{props.customer.lastName}</td>
            <td className="my-table-td">{props.customer.email}</td>
            <td className="my-table-td my-table-td-pass">{props.customer.password}</td>
            
            <td className="my-table-td my-table-td-actions">
                <div className="my-table-actions1">
                    <div className="pointer hvr m-item" title="Edit Customer">
                        <CustomLink to={"/admin/customers/edit/" + props.customer.id}>
                            <MdEdit size={28} />
                        </CustomLink>
                    </div>
                    <div className="pointer hvr m-item" title="Delete Customer">
                        <CustomLink to={"/admin/customers/delete/" + props.customer.id}>
                            <MdDeleteForever size={28} />
                        </CustomLink>
                    </div>
                </div>
                <div className="my-table-actions2">
                    <div className="pointer hvr m-item" title="More Details..">
                        <CustomLink to={"/admin/customers/" + props.customer.id}>
                            <FaInfoCircle size={28} />
                        </CustomLink>
                    </div>
                </div>
            </td>

        </tr>	    
    );
}

export default CustomerTableRow;
