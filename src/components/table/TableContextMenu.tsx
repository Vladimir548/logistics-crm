import {Dialog} from "@/components/modal/Modal";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuPortal, ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/context-menu/ContextMenu";
import {IContextItem} from "@/app/(home)/_ui/Registry";
import {Row} from "@tanstack/react-table";
import {VirtualItem} from "@tanstack/react-virtual";



interface IRegistryContextMenu<T>  {
    row:Row<T>
    children:React.ReactNode
    contextItem:IContextItem[]
    getDataForContext:(row:Row<T>) => void
    virtualRow?:VirtualItem<Element>


}
export default function TableContextMenu<T>({row,children,contextItem,getDataForContext,virtualRow}:IRegistryContextMenu<T>) {

    return (
            <Dialog>
                <ContextMenu >
                    <ContextMenuTrigger
                        asChild
                        key={row.id}
                        onContextMenu={() =>
                          getDataForContext(row)}
                    >
                        <tr   key={row.id}
                              style={{
                                  display: 'flex',
                                  position: 'absolute',
                                  transform: `translateY(${virtualRow?.start}px)`,
                                  width: '100%',
                                  height: '50px'
                              }}   className={` flex cursor-pointer ease-linear rounded-sm duration-300 hover:shadow-[inset_0px_0px_7px_3px] hover:shadow-text `}>
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