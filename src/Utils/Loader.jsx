import { CircularProgress } from "@mui/material"


const Loader = () => {
  return (
    <div className="w-[100%] h-[550px] flex justify-center items-center">
        <CircularProgress />
    </div>
  )
}

export default Loader