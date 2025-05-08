import { useEffect, useRef, useState } from "react";

import QrScanner from "qr-scanner";
import { getUserbyId } from "@/utils/apiCalls";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AxiosError } from "axios";
import { User } from "@/types/types";
import LoadingSpinner from "../UI/LoadingSpinner";

interface ScannedResult {
  id: string;
  eventArray: [
    {
      id: string;
      secret: string;
    },
  ];
}

type QrProps = {
  onCancel: () => void;
  onScanComplete: () => void;
  handleQrScan: (data: User) => void;
  handleError: (status: number) => void;
};

export const QrScannerCamera = ({
  onCancel,
  onScanComplete,
  handleQrScan,
  handleError,
}: QrProps) => {
  // QR States
  const token = useSelector((state: RootState) => state.loginToken.token);
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const [scannerRunning, setScannerRunning] = useState<boolean>(true);
  const [cameraAllowed, setCameraAllowed] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Success
  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    const scannedResult: ScannedResult = await JSON.parse(result?.data);
    try {
      setLoading(true);
      const values = {
        id: scannedResult.id,
        token: token,
      };
      const user = (await getUserbyId(values)).data;
      handleQrScan(user);
    } catch (err: any | AxiosError) {
      console.log(err);
      handleError(err.status);
      onCancel();
    }
    setScannerRunning(false);
    setLoading(false);
    setTimeout(() => onScanComplete(), 500);
  };

  useEffect(() => {
    if (scannerRunning && videoEl.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: (err: string | Error) => {
          // console.log(err);
        },

        preferredCamera: "environment",

        highlightScanRegion: true,
        // This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
      });

      // Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setCameraAllowed(true))
        .catch((err) => {
          if (err) setCameraAllowed(false);
        });
    } else if (scanner) {
      scanner?.current?.stop();
      scanner?.current?.destroy();
      scanner.current = undefined;
    }
  }, [scannerRunning]);

  // If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!cameraAllowed)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.",
      );
  }, [cameraAllowed]);

  return (
    <>
      {loading ? (
        <section className="mx-container mt-14 lg:mt-20">
          <h1 className="mb-3 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
            QR Scanner
          </h1>

          {scannerRunning && (
            <div>
              {/* div needed so that overlay is properly identified by QR Scanner */}
              <video ref={videoEl} className="h-full w-full rounded-md" />
            </div>
          )}
        </section>
      ) : (
        <LoadingSpinner
          size={100}
          classes="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
      <button
        onClick={() => {
          setScannerRunning(false);
          setTimeout(() => onCancel(), 500);
        }}
        className="rounded-md bg-grey2 p-2"
      >
        Close
      </button>
    </>
  );
};
