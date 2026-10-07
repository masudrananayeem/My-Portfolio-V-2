import { CollectionAdminPage } from "../components/cms/CmsEditors";
import { COLLECTIONS } from "@nayeem/firebase";
export function TechStackAdmin() { return <CollectionAdminPage title="Tech Stack" collection={COLLECTIONS.techStack} fields={[{key:"name",label:"Name"},{key:"icon",label:"Icon / Icon Name"},{key:"row",label:"Marquee Row",type:"number",help:"Use 1 for the first row and 2 for the second row."},{key:"order",label:"Order",type:"number"},{key:"enabled",label:"Enabled",type:"boolean"}]} defaults={{name:"",icon:"",row:1,order:0,enabled:true}} />; }
