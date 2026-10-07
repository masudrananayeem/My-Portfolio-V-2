import { CollectionAdminPage } from "../components/cms/CmsEditors";
import { COLLECTIONS } from "@nayeem/firebase";
export function ServicesAdmin() { return <CollectionAdminPage title="Services" collection={COLLECTIONS.services} fields={[{key:"title",label:"Title"},{key:"description",label:"Description",type:"textarea"},{key:"icon",label:"Icon"},{key:"order",label:"Order",type:"number"}]} defaults={{title:"",description:"",icon:"",order:0}} />; }
