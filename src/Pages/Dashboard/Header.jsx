import { FiSearch } from "react-icons/fi";

const Header = () => {
    return (
        <div className="flex justify-between p-2 w-[85%] fixed font-semibold">
            <div className="flex justify-center items-center p-2 border-2 w-[50%] mt-5 ml-20 rounded-lg">
                <p className="text-4xl w-14 text-center"><FiSearch /></p>
                <input type="text" name="" id="" className="p-2 w-full" />
            </div>

            <div className="flex w-[20%] gap-2 mt-5">
                <div className="w-[30%]">
                    <img src="https://img.freepik.com/free-photo/businessman-working-laptop_23-2147839979.jpg?size=626&ext=jpg&ga=GA1.1.1985124745.1695480142&semt=sph" alt="" className="w-12 h-12 object-cover rounded-full" />
                </div>
                <div className="w-full">
                    <h1>John Doe</h1>
                    <p className="text-gray-500">johndoe@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Header