
import {CgSpinner} from "react-icons/cg";

export default function Loading({size}:{size:number}) {
    return (
        <div className={'p-1'}>
            <CgSpinner   size={size} className={'animate-spin  text-[#02c6ff]'}/>
        </div>
    );
};