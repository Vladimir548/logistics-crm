import SidebarNav from "@/components/sidebar/SidebarNav";
import style from './style.module.scss'
export default function Sidebar() {
  return (
    <div className={style.sidebar}>
      <SidebarNav />
    </div>
  );
}
