import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import IsEmriContainer from "@/Containers/IsEmriContainer";
import { cookies } from "next/headers";
import { UserGroupsType } from "../../../../types/types";

const UretimIsEmriEkle = async () => {  
  const cookieStore = await cookies(); 
  const userGroups: UserGroupsType[] = JSON.parse(
    cookieStore.get("user_groups")?.value || "",
  );

  const allowedGroupId = 2;
  const userGroupIds = userGroups.map(group => group.id); 

  if (!userGroupIds.includes(allowedGroupId)) {
    return (
      <DefaultLayout>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>403 Forbidden</h1>
          <p>Bu sayfaya erişim izniniz yok.</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "Üretim İş Emirleri Listesi",
            url: "/Admin/IsEmirleri/UretimIsEmirleriListesi",
          },
        ]}
        pageName="Yeni İş Emri "
      />
      <IsEmriContainer />
    </DefaultLayout>
  );
};

export default UretimIsEmriEkle;

export const dynamic = "force-dynamic";
