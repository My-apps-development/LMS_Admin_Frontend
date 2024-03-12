// import { CircularProgress } from "@mui/material"


const Loader = () => {
  return (
    <div className="w-[100%] h-[550px] flex justify-center items-center flex-col">
      {/* <CircularProgress /> */}
      <div>
        <img src="/Logo.png" alt="logo_loader" className="w-32 h-32 object-cover rounded-full" />
      </div>
      <div className="text-gray-600 font-semibold">
        Loading...
      </div>
    </div>
  )
}

export default Loader