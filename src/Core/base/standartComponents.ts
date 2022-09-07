import { materialComponents } from "./materialComponents";
import { nativeComponents } from "./nativeComponents";
import { viennaComponents } from "./viennaComponents";

export const standartComponents = { ...nativeComponents, ...viennaComponents, ...materialComponents };
export default standartComponents;