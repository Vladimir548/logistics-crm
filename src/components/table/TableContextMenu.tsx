import {Dialog} from "@/components/modal/Modal";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuPortal, ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/context-menu/ContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import {Row} from "@tanstack/react-table";


interface IRegistryContextMenu<T>  {
    row:Row<T>
    children:React.ReactNode
    contextItem:IContextItem[]
    getDataForContext:(row:Row<T>) => void


}
export default function TableContextMenu<T>({row,children,contextItem,getDataForContext}:IRegistryContextMenu<T>) {

    return (
            <Dialog>
                <ContextMenu >

                    <ContextMenuTrigger
                        asChild
                        key={row.id}
                        onContextMenu={() =>
                          getDataForContext(row)}
                    >
                        <tr className={`h-[50px] cursor-pointer ease-linear duration-300 hover:bg-table-hover `}>
                        {children}
                        </tr>
                    </ContextMenuTrigger>

                    <ContextMenuPortal>
                    <ContextMenuContent
                            className={
                                'w-[250px] border-2 border-border  bg-secondary-cust py-1 px-2  '
                            }
                        >
                            {contextItem?.map((item,i) => (
                              <div key={i}>
                                {item.label}
                                {item.component}
                                <ContextMenuSeparator className={'text-border'} />
                              </div>
                            ))}
                        </ContextMenuContent>
                    </ContextMenuPortal>
                </ContextMenu>
            </Dialog>

    );
};