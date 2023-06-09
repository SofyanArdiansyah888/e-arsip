import urlLogo  from '../../../src/assets/images/berakhlak.png'
function Main() {

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Dashboard</h2>
      </div>
      {/* BEGIN: Page Layout */}
      {/*<div className="grid grid-cols-1 lg:grid-cols-1  ">*/}
        <div className=" px-8 pt-8 pb-28 lg:py-24 mt-5 intro-y box relative  shadow-xl">
          <div className="max-h-[calc(100vh-300px)] text-3xl">
           Selamat Datang, Admin
          </div>
          <div className="text-xl text-slate-500 mt-2">
          Ciptakan Pelayanan Prima
          </div>
          <div className="absolute bottom-1 lg:top-20 lg:right-12 ">
           <img src={urlLogo} className='h-24' alt="Logo" />
          </div>
        {/*</div>*/}
       

      </div>
    

      {/* END: Page Layout */}
    </>
  );
}




export default Main;
