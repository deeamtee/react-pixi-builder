import { useCallback, useEffect } from 'react';

export { useEffect } from 'react';

export const useClickOutside = (ref: React.RefObject<any>, callback: any) => {

    const clickHandler = useCallback((e: MouseEvent) => {
        if (!ref?.current?.contains(e.target)) {
            callback();
        }
    }, [ref.current, callback]);

    useEffect(() => {
        document.body.addEventListener('click', clickHandler)
        document.body.addEventListener('contextmenu', clickHandler)
        return () => {
            document.body.removeEventListener('click', clickHandler);
            document.body.removeEventListener('contextmenu', clickHandler)
        }
    }, [ref.current, callback])
}

export default useClickOutside;