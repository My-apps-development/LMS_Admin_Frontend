import Header from "./Header"
import SideMenu from "./SideMenu"


const AdminDashboard = () => {
    return (
        <div className="flex">
            <div className="w-[18%] ">
                <SideMenu />
            </div>
            <div className="w-full shadow-xl">
                <Header />
                
            </div>


        </div>
    )
}

export default AdminDashboard