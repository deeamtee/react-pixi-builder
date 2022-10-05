export const model = `
const PixiApp: React.FC<Props> = () => {
    const randomInteger = ReactPIXI.helpers.randomInteger;

    const app = ReactPIXI.useApp();
    const screenWidth = app.screen.width;
    const screenHeight = app.screen.height;
    const size = 25;
    const step = size;
    const count = React.useRef(0);
    const [counter, setCounter] = React.useState(0);
    const [snail, setSnail] = React.useState([{ x: 100, y: 500 }, { x: 125, y: 500 }]);
    const [applePosition, setApplePosition] = React.useState({
        x: randomInteger(0, screenWidth),
        y: randomInteger(0, screenHeight),
    });
    const [direction, setDirection] = React.useState('right');
    const background = React.useMemo(() => {
        const background = [];
        for (let i = 0; i < 800 / size; i++) {
            for (let j = 0; j < 600 / size; j++) {
                const number = randomInteger(1, 2);
                background.push({ x: size * i, y: size * j, number });
            }
        }
        return background;
    }, []);

    const getIntersaction = React.useCallback((positionA, positionB, size) => {
        const { x: xA, y: yA } = positionA;
        const { x: xB, y: yB } = positionB;

        return xA + size > xB && xA < xB + size && yA + size > yB && yA < yB + size;
    }, []);

    const handleKeyDown = React.useCallback(({ key }) => {
        if (key === 'ArrowUp') setDirection('up');
        if (key === 'ArrowDown') setDirection('down');
        if (key === 'ArrowLeft') setDirection('left');
        if (key === 'ArrowRight') setDirection('right');
    }, []);

    const ticker = React.useCallback(
        (time) => {
            if (++count.current < 4) {
                return;
            }
            count.current = 0;

            if (direction === 'up')
                setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: p[p.length - 1].y - step * time }]);
            if (direction === 'down')
                setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: p[p.length - 1].y + step * time }]);
            if (direction === 'left')
                setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x - step * time, y: p[p.length - 1].y }]);
            if (direction === 'right')
                setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x + step * time, y: p[p.length - 1].y }]);
        },
        [direction]
    );

    ReactPIXI.useTick(ticker);

    React.useEffect(() => {
        const position = snail[snail.length - 1];
        /** Перемещаем змейку в начало, если зашла вы из видимой области */
        if (position.x > screenWidth) setSnail((p) => [...p.slice(1), { x: 0, y: p[p.length - 1].y }]);
        if (position.y > screenHeight) setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: 0 }]);
        if (position.x < 0) setSnail((p) => [...p.slice(1), { x: screenWidth, y: p[p.length - 1].y }]);
        if (position.y < 0) setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: screenHeight }]);

        if (getIntersaction(position, applePosition, 30)) {
            const x = randomInteger(0, screenWidth - 50);
            const y = randomInteger(0, screenHeight - 50);

            setApplePosition({ x, y });
            setCounter((p) => p + 1);
            if (direction === 'up') setSnail((p) => [...p, { x: p[p.length - 1].x, y: p[p.length - 1].y - step }]);
            if (direction === 'down') setSnail((p) => [...p, { x: p[p.length - 1].x, y: p[p.length - 1].y + step }]);
            if (direction === 'left') setSnail((p) => [...p, { x: p[p.length - 1].x - step, y: p[p.length - 1].y }]);
            if (direction === 'right') setSnail((p) => [...p, { x: p[p.length - 1].x + step, y: p[p.length - 1].y }]);
        }
    }, [direction, snail, screenWidth, screenHeight]);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {background.map(({ x, y, number }, i) => {
                if (number === 1) {
                    return <ReactPIXI.Sprite key={i} img="../resources/trava.png" x={x} y={y} width={size} height={size} />;
                } else if (number === 2) {
                    return <ReactPIXI.Sprite key={i} img="../resources/trava2.png" x={x} y={y} width={size} height={size} />;
                }
            })}
            <text text={counter} style={{ fontSize: 32, fill: 0xffffff }} x={38} />

            {snail.map(({ x, y }, i) => {
                return <graphics key={i} fill={0x4287f5} drawRect={{ width: size, height: size }} x={x} y={y} />;
            })}
            <ReactPIXI.Sprite img="../resources/apple.png" width={50} height={35} x={applePosition.x} y={applePosition.y} anchor={0.5} />
            <ReactPIXI.Sprite img="../resources/apple.png" width={50} height={35} x={15} y={18} anchor={0.5} />
        </>
    );
};

const Component = () => {
    return (
        <ReactPIXI.Stage width={784} height={584} options={{ backgroundColor: 0x24bd80 }}>
            <PixiApp />
        </ReactPIXI.Stage>
    );
}
`;

// export const model = `const Component: React.FC<Props> = () => {
//     const content = <ReactPIXI.Sprite img="../resources/boy.png" width={150} height={150} x={0} y={0} />;
//     return (
//         (<ReactPIXI.Stage options={{ backgroundColor: 0x292c33 }}>
// {content}
//             </ReactPIXI.Stage>)
//     );
// };`;

// export const model = `const Component: React.FC<Props> = () => {
// <ReactPIXI.Sprite img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAnxJREFUWEftVs9rE1EQ/uZt0lD0oh5qSypezE16qE2y1T+hFqzZSgVPHvSqntwVCcWsJ/WqB0+CpU2siP4JYrapCsVbvIgt1R7Ui1LSJG9kQze8DemySaQi5h3nzY/vzTdvZgh/+VAn8WfGc8Os0XEA5ecl85tqey5pHwGQoDp/Wn5nfQnrtyMA59O5a4LoPtflbKF0K68GySTvGKSJJcl8/ZljPegDCJ0BQ7fzzCgXHNNqZ+RyG9HwsHHHOAHCGJgdEG349JnjIEqDsQbCR/euVsfV1lrxbDKTdo4YCTJ0mwEU80Vzsh2AmVQ2romB9bAvUvXqcmd0eSXrB7qrYOj2GwB6IICMnlslUBzA0W4AAPjK4I1C0ZpotQ8EcPHM3UM/uTIYkwOrAEa6DO6ZbVbEzsRBim0/fX3zhycMBJBJ20tEMHoM3FIiyBccc/YfBsAok6CX3guYeU6hZ5OIFpp3ks+CkFBTwNxjBvZysBvE94vaUdgHsGcGpk9nR6IyelKAHiucHQYwGIbDsBQA2Abw3fMpwZerovqhMQ2N1Pw4ROTFfgIQzNOLjvW+7TjupIjCZqCVAu+xoQG480JKec8zFCTs5ldjlCVLs3knxA23zwdR2A2Anhrjn8hAH8D+ZcAbx27EWC02DMFv/dH5SkVUX6mymIxOAfTIpyfpVCVSaWzIreM4sAhVJ+02oqCtWLUN2oj6AIL7gG5PuRtrQ4lYIxJDamqpVn2yWLq9psouJOfHOBK95G8+cgtMdVfGhHKhaPrqpuG+XWn7WjFjPe+Yx7r5Akba/gzCaANAy0ISvhP+lwDUPnCgFq0vrFhb3VAwl8oN/YpUtaA+8BuA3gvMK1fAmgAAAABJRU5ErkJggg==" width={150} height={150} x={0} y={0} />

//     const footer = <ViennaUI.Groups justifyContent="flex-end">
//         <ViennaUI.Button design="accent"></ViennaUI.Button>
//         <ViennaUI.Button></ViennaUI.Button>
//     </ViennaUI.Groups>;

//     const actions = <ViennaUI.Switcher>Избранное</ViennaUI.Switcher>;
//     const header = <ViennaUI.H5>Видео</ViennaUI.H5>;

//     return (
//         (<ViennaUI.Body>
//             <ViennaUI.Header>
//             </ViennaUI.Header>
//             <ViennaUI.Grid.Row></ViennaUI.Grid.Row>
//             <ViennaUI.Grid.Row align="stretch" valign="middle">
//                 <ViennaUI.Grid.Col size="6" offset="3">
//                     <ViennaUI.Card footer={footer} actions={actions} header={header}>
//                         <video width="100%" autoPlay controls height="300" />
//                     </ViennaUI.Card>
//                 </ViennaUI.Grid.Col>
//             </ViennaUI.Grid.Row>
//         </ViennaUI.Body>)
//     );
// };`;

// React.useEffect(() => {
//     if (navigator.mediaDevices === undefined) {
//         navigator.mediaDevices = {};
//     }
//     if (navigator.mediaDevices.getUserMedia === undefined) {
//         navigator.mediaDevices.getUserMedia = function(constraints) {
//             var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//             if (!getUserMedia) {
//                 return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
//             }
//             return new Promise(function(resolve, reject) {
//                 getUserMedia.call(navigator, constraints, resolve, reject);
//             });
//         };
//     }
//     navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true
//     }).then(function(stream) {
//         var video = document.querySelector("video");
//         if ("srcObject" in video) {
//             video.srcObject = stream;
//         } else {
//             video.src = window.URL.createObjectURL(stream);
//         }
//         video.onloadedmetadata = function(e) {
//             video.play();
//         };
//     }).catch(function(err) {
//         console.log(err.name + ": " + err.message);
//     });
// }, []);
