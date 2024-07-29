import {AiOutlineLoading3Quarters} from "react-icons/ai";

export default function Loading({size}:{size:number}) {
    return (
        <div className={'p-1'}>
            <AiOutlineLoading3Quarters size={size} className={'animate-spin  text-border'}/>
        </div>
    );
};