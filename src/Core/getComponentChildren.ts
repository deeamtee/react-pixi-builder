export const getComponentChildren = (element: any) => {
    const children = element.parent.value.children;
    return children;
};

export default getComponentChildren;