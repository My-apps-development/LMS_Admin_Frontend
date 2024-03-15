import AdminDashboard from "../Dashboard/AdminDashboard"


const NotFound = () => {
  return (
    <div>
      <AdminDashboard />
      <div className="ml-56 p-3 flex flex-col justify-center items-center gap-5 font-semibold text-gray-600 bg-gray-300 h-dvh" >
        <p className="text-4xl">404</p>
        <h1 className="text-4xl">No Information Found</h1>

        <div className="mt-10">
          <img src="/404.jpg" alt="" className="w-96 h-72 object-cover rounded-lg mix-blend-multiply"/>
        </div>

      </div>
    </div>
  )
}

export default NotFound