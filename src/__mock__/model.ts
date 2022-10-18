export const model = `
function PixiApp() {
    const [y, setY] = React.useState(0);
    const [applePosition, setApplePosition] = React.useState({ x: 700, y: 250 });
    const [arrowPosition, setArrowPosition] = React.useState({ x: 30, y: y });
    const [appleVisible, setAppleVisible] = React.useState(true);
    const [counter, setCounter] = React.useState(0);
    const backgroundSize = 100;
    const randomInteger = ReactPIXI.helpers.randomInteger;

    const getIntersaction = React.useCallback((positionA, positionB, size) => {
        const { x: xA, y: yA } = positionA;
        const { x: xB, y: yB } = positionB;

        return xA + size > xB && xA < xB + size && yA + size > yB && yA < yB + size;
    }, []);

    const randomForest = React.useMemo(() => {
        const background = [];
        for (let i = 0; i < 25; i++) {
            const number = randomInteger(1, 2);
            const treePosition = { x: randomInteger(20, 800), y: randomInteger(20, 600) };
            background.push({ x: treePosition.x, y: treePosition.y, number });
        }
        return background;
    }, []);

    const background = React.useMemo(() => {
        const size = backgroundSize;
        const background = [];
        for (let i = 0; i < 800 / size; i++) {
            for (let j = 0; j < 600 / size; j++) {
                background.push({ x: size * i, y: size * j });
            }
        }
        return background;
    }, []);

    React.useEffect(() => {
        const isIntersaction = getIntersaction(arrowPosition, applePosition, 25);
        if (isIntersaction && appleVisible) {
            setAppleVisible(false);
            setCounter((prev) => prev + 1);
        }
    }, [arrowPosition, applePosition]);

    React.useEffect(() => {
        setInterval(() => {
            const y = randomInteger(0, 550);
            setApplePosition({ x: 700, y });
            setAppleVisible(true);
        }, 2000);
    }, []);

    React.useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const handleMouseMove = React.useCallback((event) => {
        const y = event.data.global.y - 25;
        if (y > 0 && y < 580) {
            setY(y);
        } else if (y < 0) {
            setY(0);
        } else {
            setY(580);
        }
    }, []);

    const handleClick = React.useCallback((event) => {
            setArrowPosition({ x: 30, y: event.clientY - 25 });
    }, []);

    const arrowTicker = (delta) => {
        setArrowPosition((prev) => ({ x: prev.x + 10 * delta, y: prev.y }));
    };

    ReactPIXI.useTick(arrowTicker);

    return (
        <>
            {background.map(({ x, y }, i) => (
                <ReactPIXI.Sprite key={i} img="../resources/trava.png" width={backgroundSize} height={backgroundSize} x={x} y={y} />
            ))}
            {randomForest.map((tree, i) => {
                if (tree.number === 1) {
                    return <ReactPIXI.Sprite key={i} img="../resources/tree1.png" width={100} height={100} x={tree.x} y={tree.y} />;
                } else {
                    return <ReactPIXI.Sprite key={i} img="../resources/tree2.png" width={100} height={100} x={tree.x} y={tree.y} />;
                }
            })}
            <text text={counter} style={{ fontSize: 48, fill: 0xffffff }} x={750} y={0} />
            {appleVisible && <ReactPIXI.Sprite img="../resources/apple.png" width={75} height={50} x={applePosition.x} y={applePosition.y} />}
            <ReactPIXI.Sprite img="../resources/arrow.png" width={70} height={40} x={arrowPosition.x} y={arrowPosition.y} />
            <ReactPIXI.Sprite img="../resources/boy.png" width={150} height={120} x={30} y={y} anchor={0.37} onMouseMove={handleMouseMove} />
        </>
    );
}

const Component = () => {
    return (
        <div style={{ cursor: 'none' }}>
        <ReactPIXI.Stage options={{ backgroundColor: 0x24bd80 }}>
            <PixiApp />
        </ReactPIXI.Stage>
    </div>
    );
}
`;

// export const model = `
// const PixiApp: React.FC<Props> = () => {
//     const randomInteger = ReactPIXI.helpers.randomInteger;

//     const app = ReactPIXI.useApp();
//     const screenWidth = app.screen.width;
//     const screenHeight = app.screen.height;
//     const size = 25;
//     const step = size;
//     const count = React.useRef(0);
//     const [counter, setCounter] = React.useState(0);
//     const [snail, setSnail] = React.useState([{ x: 100, y: 500 }, { x: 125, y: 500 }]);
//     const [applePosition, setApplePosition] = React.useState({
//         x: randomInteger(0, screenWidth),
//         y: randomInteger(0, screenHeight),
//     });
//     const [direction, setDirection] = React.useState('right');
//     const background = React.useMemo(() => {
//         const background = [];
//         for (let i = 0; i < 800 / size; i++) {
//             for (let j = 0; j < 600 / size; j++) {
//                 const number = randomInteger(1, 2);
//                 background.push({ x: size * i, y: size * j, number });
//             }
//         }
//         return background;
//     }, []);

//     const getIntersaction = React.useCallback((positionA, positionB, size) => {
//         const { x: xA, y: yA } = positionA;
//         const { x: xB, y: yB } = positionB;

//         return xA + size > xB && xA < xB + size && yA + size > yB && yA < yB + size;
//     }, []);

//     const handleKeyDown = React.useCallback(({ key }) => {
//         if (key === 'ArrowUp') setDirection('up');
//         if (key === 'ArrowDown') setDirection('down');
//         if (key === 'ArrowLeft') setDirection('left');
//         if (key === 'ArrowRight') setDirection('right');
//     }, []);

//     const ticker = React.useCallback(
//         (time) => {
//             if (++count.current < 4) {
//                 return;
//             }
//             count.current = 0;

//             if (direction === 'up')
//                 setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: p[p.length - 1].y - step * time }]);
//             if (direction === 'down')
//                 setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: p[p.length - 1].y + step * time }]);
//             if (direction === 'left')
//                 setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x - step * time, y: p[p.length - 1].y }]);
//             if (direction === 'right')
//                 setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x + step * time, y: p[p.length - 1].y }]);
//         },
//         [direction]
//     );

//     ReactPIXI.useTick(ticker);

//     React.useEffect(() => {
//         const position = snail[snail.length - 1];
//         /** Перемещаем змейку в начало, если зашла вы из видимой области */
//         if (position.x > screenWidth) setSnail((p) => [...p.slice(1), { x: 0, y: p[p.length - 1].y }]);
//         if (position.y > screenHeight) setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: 0 }]);
//         if (position.x < 0) setSnail((p) => [...p.slice(1), { x: screenWidth, y: p[p.length - 1].y }]);
//         if (position.y < 0) setSnail((p) => [...p.slice(1), { x: p[p.length - 1].x, y: screenHeight }]);

//         if (getIntersaction(position, applePosition, 30)) {
//             const x = randomInteger(0, screenWidth - 50);
//             const y = randomInteger(0, screenHeight - 50);

//             setApplePosition({ x, y });
//             setCounter((p) => p + 1);
//             if (direction === 'up') setSnail((p) => [...p, { x: p[p.length - 1].x, y: p[p.length - 1].y - step }]);
//             if (direction === 'down') setSnail((p) => [...p, { x: p[p.length - 1].x, y: p[p.length - 1].y + step }]);
//             if (direction === 'left') setSnail((p) => [...p, { x: p[p.length - 1].x - step, y: p[p.length - 1].y }]);
//             if (direction === 'right') setSnail((p) => [...p, { x: p[p.length - 1].x + step, y: p[p.length - 1].y }]);
//         }
//     }, [direction, snail, screenWidth, screenHeight]);

//     React.useEffect(() => {
//         document.addEventListener('keydown', handleKeyDown);

//         return () => {
//             document.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []);

//     return (
//         <>
//             {background.map(({ x, y, number }, i) => {
//                 if (number === 1) {
//                     return <ReactPIXI.Sprite key={i} img="../resources/trava.png" x={x} y={y} width={size} height={size} />;
//                 } else if (number === 2) {
//                     return <ReactPIXI.Sprite key={i} img="../resources/trava2.png" x={x} y={y} width={size} height={size} />;
//                 }
//             })}
//             <text text={counter} style={{ fontSize: 32, fill: 0xffffff }} x={38} />

//             {snail.map(({ x, y }, i) => {
//                 return <graphics key={i} fill={0x4287f5} drawRect={{ width: size, height: size }} x={x} y={y} />;
//             })}
//             <ReactPIXI.Sprite img="../resources/apple.png" width={50} height={35} x={applePosition.x} y={applePosition.y} anchor={0.5} />
//             <ReactPIXI.Sprite img="../resources/apple.png" width={50} height={35} x={15} y={18} anchor={0.5} />
//         </>
//     );
// };

// const Component = () => {
//     return (
//         <ReactPIXI.Stage width={784} height={584} options={{ backgroundColor: 0x24bd80 }}>
//             <PixiApp />
//         </ReactPIXI.Stage>
//     );
// }
// `;
