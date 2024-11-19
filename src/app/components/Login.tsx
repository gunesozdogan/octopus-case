export const Login = () => {
  return (
    <div className="flex items-center justify-center flex-[3] flex-col">
      <div className="flex items-center justify-center flex-col">
        <h2 className="font-inter font-bold text-[32px]">Welcome Octopus!</h2>
        <p className="text-[#94A3B8] text-[14px] font-normal">
          Manage your smart signage, watch your company grow.
        </p>
      </div>
      <form
        action=""
        className="flex flex-col self-start w-full gap-[24px] px-[91px] py-[20px]"
      >
        <div className="flex flex-col gap-[10px]">
          <label className="font-inter text-[14px] font-medium" htmlFor="email">
            E-mail Address*
          </label>
          <input
            className="bg-[#f1f5f9] h-[44px] rounded-lg px-[16px] py-[12px] focus:outline-2 focus:outline-customGreen"
            placeholder="Enter your e-mail address"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className="font-inter text-[14px] font-medium"
            htmlFor="password"
          >
            Password*
          </label>
          <input
            className="bg-[#f1f5f9] w-full h-[44px] rounded-lg px-[16px] py-[12px] focus:outline-2 focus:outline-customGreen"
            placeholder="Enter your password"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="flex items-center gap-[8px]">
          <input
            type="checkbox"
            className="border-1 border-[#CBD5E1] w-[20px] h-[20px] rounded"
          />
          <label htmlFor="">Remember me?</label>
        </div>
        <button className="w-full h-[44px] bg-customGreen rounded-lg text-white font-medium text-[14px]">
          Login
        </button>
      </form>
    </div>
  );
};
