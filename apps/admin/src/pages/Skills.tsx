import { CollectionAdminPage } from "../components/cms/CmsEditors";
import { COLLECTIONS } from "@nayeem/firebase";
export function SkillsAdmin() { return <CollectionAdminPage title="Skills" collection={COLLECTIONS.skills} fields={[{key:"name",label:"Name"},{key:"category",label:"Category",type:"select",options:["frontend","backend","database","cloud","devops","ai-ml","tools","architecture"]},{key:"icon",label:"Icon / Icon Name"},{key:"order",label:"Order",type:"number"}]} defaults={{name:"",category:"frontend",icon:"",order:0}} />; }
