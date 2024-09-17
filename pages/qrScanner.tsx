import { useEffect, useRef, useState } from "react";

import QrScanner from "qr-scanner";
const qrScanner = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
      // 🖨 Print the "result" to browser console.
      console.log(result);
  
      setScannedResult(result?.data);
  };

  // Fail
  const onScanFail = (err: string | Error) => {
      // 🖨 Print the "err" to browser console.
      console.log(err);
  };

  useEffect(() => {
      if (videoEl?.current && !scanner.current) {

          scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
              onDecodeError: onScanFail,
  
              preferredCamera: "environment",
              
              highlightScanRegion: true,
              // This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
              highlightCodeOutline: true,
              // A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
              overlay: qrBoxEl?.current || undefined,
          });

          // Start QR Scanner
          scanner?.current
              ?.start()
              .then(() => setQrOn(true))
              .catch((err) => {
                  if (err) setQrOn(false);
              });
      }

      // Clean up on unmount.
      // This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
      return () => {
          if (!videoEl?.current) {
              scanner?.current?.stop();
          }
      };
  }, []);

  // If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
      if (!qrOn)
          alert(
              "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
          );
  }, [qrOn]);


  return (
    <>
    <section className="mx-container mb-section mt-14 lg:mt-20">
      <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
        QR Scanner
      </h1>
      <video ref={videoEl} style={{ width: '60%' }} />
      {scannedResult && <p>Scanned Result: {scannedResult}</p>}
    </section>
    </>
    
  );
};

export default qrScanner;
