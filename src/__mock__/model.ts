export const model = `const Component: React.FC<Props> = () => {
    const footer = <ViennaUI.Groups justifyContent="flex-end">
        <ViennaUI.Button design="accent"></ViennaUI.Button>
        <ViennaUI.Button></ViennaUI.Button>
    </ViennaUI.Groups>;

    const actions = <ViennaUI.Switcher>Избранное</ViennaUI.Switcher>;
    const header = <ViennaUI.H5>Видео</ViennaUI.H5>;

    return (
        (<ViennaUI.Body>
            <ViennaUI.Header>
            </ViennaUI.Header>
            <ViennaUI.Grid.Row></ViennaUI.Grid.Row>
            <ViennaUI.Grid.Row align="stretch" valign="middle">
                <ViennaUI.Grid.Col size="6" offset="3">
                    <ViennaUI.Card footer={footer} actions={actions} header={header}>
                        <video width="100%" autoPlay controls height="300" />
                    </ViennaUI.Card>
                </ViennaUI.Grid.Col>
            </ViennaUI.Grid.Row>
        </ViennaUI.Body>)
    );
};`;

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