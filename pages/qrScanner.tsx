import { useEffect, useRef, useState } from "react";

import QrScanner from "qr-scanner";
import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";
import { useRouter } from "next/router";
import {
  checkInById,
  getEvents,
  getRegistrationByID,
  getUserbyId,
} from "@/utils/apiCalls";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserCheckInCard from "@/components/cards/UserCheckInDetails";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import withAuth from "@/components/permissions/authPage";
import { AxiosError, isAxiosError } from "axios";
import React from "react";
import SingleDropdown from "@/components/UI/Inputs/UWDSC/SingleDropdown";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";

interface ScannedResult {
  id: string;
  eventArray: [
    {
      id: string;
      secret: string;
    },
  ];
}

const QrScannerPage = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scanSuccess, setScanSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [QrError, setQrError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const token = useSelector((state: RootState) => state.loginToken.token);

  const [userInfo, setUserInfo] = useState<any>({});
  const [registrationInfo, setRegistrationInfo] = useState<any>({});
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const [events, setEvents] = useState<Array<any>>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [toDisplayBefore, setToDisplayBefore] = useState<any>(null);
  const [toDisplayAfter, setToDisplayAfter] = useState<any>(null);

  const [reqFeedback, setReqFeedback] = useState<string>("");

  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  const selectedEventRef = useRef<any>(null);

  useEffect(() => {
    selectedEventRef.current = selectedEvent;
  }, [selectedEvent]);

  // Success
  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    setScanSuccess(true);
    const currEvent = selectedEventRef.current;

    if (!currEvent) {
      setErrorMessage("Please select an event to scan for.");
      setQrError(true);
      return;
    }

    scanner.current?.stop();
    setScannedResult(result?.data);
    const data: ScannedResult = JSON.parse(result?.data);
    const id = data.id;
    // const events = data.eventArray;
    try {
      setLoading(true);
      const response = await getRegistrationByID(currEvent.id, id);
      console.log(response);
      setUserInfo(response.data.registrant.user);
      setRegistrationInfo(response.data.registrant.additionalFields ?? {});
      setIsCheckedIn(response.data.registrant.checkedIn);
      setIsSelected(response.data.registrant.selected);
      setToDisplayBefore(currEvent.toDisplay.before);
      setToDisplayAfter(currEvent.toDisplay.after);
      console.log(userInfo);
      console.log(registrationInfo);
      setQrError(false);
    } catch (err: any | AxiosError) {
      console.log(err);
      if (err.status == 404) {
        setErrorMessage("Scan failed, user is not registered for this event.");
      } else {
        setErrorMessage("Scan failed, something went wrong.");
      }
      setQrError(true);
    }
    setLoading(false);
  };

  const reScan = () => {
    router.reload();
  };

  const checkIn = async () => {
    // check in user
    const response = await checkInById({
      id: userInfo.id,
      token: token,
      eventName: userInfo.event,
    }).catch((err) => {
      console.log(err);
      alert(err.response.data.message);
    });

    if (response && response.data.success) {
      alert("User is checked in !");
    }
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

    const retrieveEvents = async () => {
      const response = (await getEvents(new Date(), new Date(), true)).data
        .events;
      setEvents(response);
      if (!selectedEvent) {
        setSelectedEvent(response && response.length == 1 ? response[0] : null);
      }
    };

    retrieveEvents();

    // Clean up on unmount.
    // This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    console.log("Changed");
    console.log(selectedEvent);
  }, [selectedEvent]);

  // If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.",
      );
  }, [qrOn]);

  const checkRequirements = (requirements: any, registrant: any) => {
    const userReq = requirements.user;
    const registrantReq = requirements.registrant;
    const needToBeCheckedIn = requirements.checkedIn;
    const needToBeSelected = requirements.selected;

    let errMsg = "";

    if (
      needToBeCheckedIn != undefined &&
      registrant.checkedIn != needToBeCheckedIn
    ) {
      errMsg += "'checkedIn' needs to be " + needToBeCheckedIn + "; ";
    }

    if (
      needToBeSelected != undefined &&
      registrant.selected != needToBeSelected
    ) {
      errMsg += "'selected' needs to be " + needToBeSelected + "; ";
    }

    if (userReq) {
      Object.keys(userReq).forEach((key) => {
        if (registrant.user[key] != userReq[key]) {
          errMsg += `'${key}' needs to be ${userReq[key]}; `;
        }
      });
    }

    if (registrantReq) {
      Object.keys(registrantReq).forEach((key) => {
        if (registrant.registration[key] != registrantReq[key]) {
          errMsg += `'${key}' needs to be ${registrantReq[key]}; `;
        }
      });
    }

    console.log(errMsg);
    return errMsg;
  };

  useEffect(() => {
    if (selectedEvent) {
      setReqFeedback(
        checkRequirements(selectedEvent.requirements, {
          user: userInfo,
          registration: registrationInfo,
          checkedIn: isCheckedIn,
          selected: isSelected,
        }),
      );
    }
  }, [userInfo]);

  return (
    <>
      <section className="mx-container mb-section mt-14 lg:mt-20">
        <h1 className="mb-3 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          QR Scanner
        </h1>
        {events ? (
          <SingleDropdown
            id="eventOption"
            name="eventOption"
            placeholder="Select event"
            value={
              selectedEvent ? `${selectedEvent.name} (${selectedEvent.id})` : ""
            }
            options={
              events
                ? events.map((event) => {
                    return `${event.name} (${event.id})`;
                  })
                : []
            }
            onChange={(e) => {
              setSelectedEvent(
                events.filter((event) => {
                  return event.id == e.target.value.split(" ")[1].slice(1, -1);
                })[0],
              );
            }}
            wrapperClasses="mb-14"
          />
        ) : (
          <></>
        )}
        {!scanSuccess && (
          <video ref={videoEl} className="h-full w-full rounded-md" />
        )}

        {scanSuccess &&
          (loading ? (
            <LoadingSpinner
              size={100}
              classes="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : (
            <div>
              <UserCheckInCard
                toDisplay={isCheckedIn ? toDisplayAfter : toDisplayBefore}
                userInfo={userInfo}
                registrationInfo={registrationInfo}
                isCheckedIn={isCheckedIn}
                isSelected={isSelected}
                error={QrError}
                errorMessage={errorMessage}
              />

              {reqFeedback == "" ? (
                <div className="mt-6 flex justify-center gap-6">
                  <GradientBorder
                    rounded="rounded-lg"
                    classes="w-auto inline-block items-center"
                  >
                    <Button
                      type="button"
                      hierarchy="secondary"
                      font="font-bold"
                      text="sm:text-lg 2xl:text-xl"
                      padding="py-3 sm:px-7 sm:py-4"
                      rounded="rounded-[15px]"
                      onClick={() => {
                        reScan();
                      }}
                    >
                      Re Scan
                    </Button>
                  </GradientBorder>
                  <GradientBorder
                    rounded="rounded-lg"
                    classes="w-auto inline-block items-center"
                  >
                    <Button
                      type="submit"
                      hierarchy="secondary"
                      font="font-bold"
                      text="sm:text-lg 2xl:text-xl"
                      padding="py-3 sm:px-7 sm:py-4"
                      rounded="rounded-[15px]"
                      onClick={() => {
                        checkIn();
                      }}
                    >
                      Check In
                    </Button>
                  </GradientBorder>
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  <InputFeedback state="error" classes="w-fit">
                    {reqFeedback}
                  </InputFeedback>
                  <GradientBorder
                    rounded="rounded-lg"
                    classes="w-fit inline-block items-center mt-4"
                  >
                    <Button
                      type="button"
                      hierarchy="secondary"
                      font="font-bold"
                      text="sm:text-lg 2xl:text-xl"
                      padding="py-3 sm:px-7 sm:py-4"
                      rounded="rounded-[15px]"
                      onClick={() => {
                        reScan();
                      }}
                    >
                      Re Scan
                    </Button>
                  </GradientBorder>
                </div>
              )}
            </div>
          ))}
      </section>
    </>
  );
};

export default withAuth(QrScannerPage, ["admin"]);
