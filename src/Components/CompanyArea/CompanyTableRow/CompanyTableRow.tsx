import { FaInfoCircle } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { CompanyModel } from "../../../Models/CompanyModels";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import "./CompanyTableRow.css";

interface CompanyTableRowProps {
	company: CompanyModel;
}

function CompanyTableRow(props: CompanyTableRowProps): JSX.Element {

    return (
        <tr className="CompanyTableRow my-table-tr">
            
            <td className="my-table-td">{props.company.id}</td>
            <td className="my-table-td">{props.company.name}</td>
            <td className="my-table-td">{props.company.email}</td>
            <td className="my-table-td my-table-td-pass">{props.company.password}</td>
            
            <td className="my-table-td my-table-td-actions">
                <div className="my-table-actions1">
                    <div className="pointer hvr m-item" title="Edit Company">
                        <CustomLink to={"/admin/companies/edit/" + props.company.id}>
                            <MdEdit size={28} />
                        </CustomLink>
                    </div>
                    <div className="pointer hvr m-item" title="Delete Company">
                        <CustomLink to={"/admin/companies/delete/" + props.company.id}>
                            <MdDeleteForever size={28} />
                        </CustomLink>
                    </div>
                </div>
                <div className="my-table-actions2">
                    <div className="pointer hvr m-item" title="More Details..">
                        <CustomLink to={"/admin/companies/" + props.company.id}>
                            <FaInfoCircle size={28} />
                        </CustomLink>
                    </div>
                </div>
            </td>

        </tr>	
    );
}

export default CompanyTableRow;
