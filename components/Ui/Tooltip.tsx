import { ReactNode } from "react";

//Tooltip
export interface TooltipProps {
  children: ReactNode;
}
const Tooltip = ({ children }: TooltipProps) => {

   /*  const array = [1,2,3,4,5,6] */
  return (
  /*   <div className="list">
    {array.slice(0, 4).map((item, i) => (
        <div key={i}></div>
    ))}
    </div> */
    <div className="absolute pr-14 right-0 hidden xl:group-hover:flex">
      {/* Tooltip */}
      <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
        <div className="text-[12px] leading-none font-semibold capitalize">
          {children}
        </div>
        {/* triangle (The tip out from tooltip box) */}
        <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"></div>
      </div>
    </div>
  );
};

export default Tooltip;
