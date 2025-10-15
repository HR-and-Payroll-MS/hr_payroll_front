import { Outlet } from "react-router-dom";
import DetailEmployee from "./Employee_sub/DetailEmployee";
import Directory from "./Employee_sub/Directory";
import ManageEmployee from "./Employee_sub/ManageEmployee";

export default function Employee(){
    return (
        <>
        <Outlet/>
            {/* <Directory/> */}
            {/* <ManageEmployee/> */}
            {/* <DetailEmployee/> */}
        </>
    )
}