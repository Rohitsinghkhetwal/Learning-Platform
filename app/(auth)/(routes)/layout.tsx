const Authlayout = ({ children} : {children: React.ReactNode}) => {
    console.log("this is from auth layout", children);
    return ( 
        <div className="h-full flex justify-center items-center">
        {children}


        </div>
     );
}
 
export default Authlayout;