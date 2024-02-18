import Header from "./Header"
import SideMenu from "./SideMenu"


const AdminDashboard = () => {
    return (
        <div className="flex">
            <div className="w-[20%]">
                <SideMenu />
            </div>
            <div className="w-[85%] ">
                <Header />
                
            </div>


        </div>
    )
}

export default AdminDashboard