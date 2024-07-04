import HomeLayout from "@/app/layouts/HomeLayout";
import Registry from "@/app/(home)/_ui/Registry";
import {Suspense} from "react";



export default function Home() {
  return (
      <>
      <HomeLayout>
        <Suspense fallback={'Загрузка...'}>

    <Registry/>
        </Suspense>

      </HomeLayout>
      </>
  );
}
