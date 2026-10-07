import { CollectionAdminPage } from "../components/cms/CmsEditors";
import { COLLECTIONS } from "@nayeem/firebase";

export function ResearchAdmin() {
  return <CollectionAdminPage title="Research" collection={COLLECTIONS.research} fields={[{key:"slug",label:"Slug"},{key:"title",label:"Title"},{key:"summary",label:"Short Research Details",type:"textarea"},{key:"abstract",label:"Abstract",type:"textarea"},{key:"dataset",label:"Dataset"},{key:"methodology",label:"Methodology",type:"textarea"},{key:"models",label:"Models",type:"array"},{key:"results",label:"Results",type:"textarea"},{key:"technologies",label:"Technologies",type:"array"},{key:"paperUrl",label:"Paper URL",type:"url"},{key:"coverImage",label:"Paper Image",type:"image"},{key:"order",label:"Order",type:"number"}]} defaults={{slug:"",title:"",summary:"",abstract:"",dataset:"",methodology:"",models:[],results:"",technologies:[],paperUrl:"",coverImage:{url:"",publicId:""},order:0}} />;
}
