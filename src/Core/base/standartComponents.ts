import { materialComponents } from "./materialComponents";
import { nativeComponents } from "./nativeComponents";
import { viennaComponents } from "./viennaComponents";
import { pixiComponents } from "./pixiComponents";

export const standartComponents = {
  ...nativeComponents,
  ...viennaComponents,
  ...materialComponents,
  ...pixiComponents,
};
export default standartComponents;
