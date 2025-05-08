import { useEffect, useRef, useState, useCallback } from "react";

import QrScanner from "qr-scanner";
import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";
import {
  getEvents,
  getRegistrationByID,
  patchCheckInRegistrantById,
  patchCheckInRegistrantToSubEventById,
} from "@/utils/apiCalls";
import UserCheckInCard from "@/components/cards/UserCheckInDetails";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import withAuth from "@/components/permissions/authPage";
import { AxiosError } from "axios";
import React from "react";
import SingleDropdown from "@/components/UI/Inputs/UWDSC/SingleDropdown";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import moment from "moment-timezone";
import { ROLES } from "@/constants/roles";

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
  const [scannerRunning, setScannerRunning] = useState<boolean>(false);
  const [cameraAllowed, setCameraAllowed] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [QrError, setQrError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [userInfo, setUserInfo] = useState<any>({});
  const [registrationInfo, setRegistrationInfo] = useState<any>({});
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const [events, setEvents] = useState<Array<any>>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [subEvents, setSubEvents] = useState<Array<any>>([]);
  const [selectedSubEvent, setSelectedSubEvent] = useState<any>(null);
  const [toDisplayBefore, setToDisplayBefore] = useState<any>(null);
  const [toDisplayAfter, setToDisplayAfter] = useState<any>(null);

  const [reqFeedback, setReqFeedback] = useState<string>("");

  // Result
  const [scannedResult, setScannedResult] = useState<
    ScannedResult | undefined
  >();

  const selectedEventRef = useRef<any>(null);
  const selectedSubEventRef = useRef<any>(null);

  const parentEventString = "Registration";

  function formatEventDisplay(event: any) {
    const start = moment.utc(event.startTime).tz("America/New_York");
    const end = moment.utc(event.endTime).tz("America/New_York");

    if (end.diff(start, "days") > 1) {
      return `${event.name} (${start.format("MMM D")} - ${end.format(
        "MMM D",
      )}) [${event.location}]`;
    }
    return `${event.name} (${start.format("h:mm A")} - ${end.format("h:mm A")}) [${
      event.location
    }]`;
  }

  useEffect(() => {
    selectedEventRef.current = selectedEvent;
  }, [selectedEvent]);

  useEffect(() => {
    selectedSubEventRef.current = selectedSubEvent;
  }, [selectedSubEvent]);

  // Success
  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    const currEvent = selectedEventRef.current;
    const currSubEvent = selectedSubEventRef.current;

    if (!currEvent) {
      setErrorMessage("Please select an event to scan for.");
      setQrError(true);
      setScannerRunning(false);
      return;
    }

    const parsedResult: ScannedResult = await JSON.parse(result?.data);
    setScannedResult(parsedResult);
    try {
      setLoading(true);
      const response = (
        await getRegistrationByID(currEvent.id, parsedResult.id)
      ).data;
      const { registrant, subEventsCheckedIn } = response;
      setUserInfo(registrant.user);
      setRegistrationInfo(registrant.additionalFields ?? {});
      if (currSubEvent && !currSubEvent.default) {
        setIsCheckedIn(subEventsCheckedIn.includes(selectedSubEvent.id));
      } else {
        setIsCheckedIn(registrant.checkedIn);
      }
      setIsSelected(registrant.selected);
      setToDisplayBefore(currEvent.toDisplay.before);
      setToDisplayAfter(currEvent.toDisplay.after);
      setQrError(false);
    } catch (err: any | AxiosError) {
      console.log(err);
      if (err.status == 404) {
        setErrorMessage("Scan failed, user is not registered for this event.");
      } else {
        setErrorMessage("Scan failed, something went wrong.");
      }
      setQrError(true);
    } finally {
      setScannerRunning(false);
      setLoading(false);
    }
  };

  const checkIn = async () => {
    if (scannedResult) {
      console.log("here");
      setLoading(true);
      console.log(loading);
      try {
        const eventSecret = scannedResult.eventArray.filter((event) => {
          return event.id == selectedEvent.id;
        })[0].secret;
        try {
          const handleResult = (result: any) => {
            const updatedRegistrant = result.data.updatedRegistrant.registrant;
            setUserInfo(updatedRegistrant.user);
            setRegistrationInfo(updatedRegistrant.additionalFields ?? {});
            setIsCheckedIn(updatedRegistrant.checkedIn);
            setIsSelected(updatedRegistrant.selected);
            setLoading(false);
          };

          if (selectedSubEvent && !selectedSubEvent.default) {
            patchCheckInRegistrantToSubEventById(
              selectedEvent.id,
              selectedSubEvent.id,
              scannedResult.id,
              eventSecret,
            ).then(handleResult);
          } else {
            patchCheckInRegistrantById(
              selectedEvent.id,
              scannedResult.id,
              eventSecret,
            ).then(handleResult);
          }
        } catch (err: any) {
          setLoading(false);
          alert(err.response.data.message);
        }
      } catch (e) {
        alert(e);
      }
    }
  };

  useEffect(() => {
    const retrieveEvents = async () => {
      const response = await getEvents(new Date(), new Date(), true);
      const events = response.data.events;
      setEvents(events);
      if (!selectedEvent) {
        setSelectedEvent(events && events.length == 1 ? events[0] : null);
      }
    };

    retrieveEvents();
  }, []);

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
    }
  }, [scannerRunning, selectedEvent]);

  // If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!cameraAllowed)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.",
      );
  }, [cameraAllowed]);

  useEffect(() => {
    if (selectedEvent?.subEvents?.length === 0) {
      setSubEvents([]);
      setScannerRunning(true);
    } else if (selectedEvent) {
      setSubEvents([{ default: true }, ...selectedEvent.subEvents]);
      setSelectedSubEvent(null);
    }
  }, [selectedEvent]);

  useEffect(() => {
    console.log("changed");
    console.log(selectedSubEvent);
    if (selectedSubEvent) {
      setScannerRunning(true);
    } else {
      setScannerRunning(false);
    }
  }, [selectedSubEvent]);

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
      errMsg += "User is already checked in. ";
    }

    if (
      needToBeSelected != undefined &&
      registrant.selected != needToBeSelected
    ) {
      errMsg += "User was not selected to participate. ";
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
      <section className="mx-container mb-section my-14 min-h-[80vh] lg:my-20">
        <h1 className="mb-3 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
          QR Scanner
        </h1>
        <div className="mb-14 flex flex-col gap-4">
          {events.length > 0 ? (
            <SingleDropdown
              id="eventOption"
              name="eventOption"
              placeholder="Select event"
              wrapperClasses="w-full"
              value={
                selectedEvent
                  ? {
                      display: formatEventDisplay(selectedEvent),
                      value: selectedEvent.id,
                    }
                  : { display: "", value: "" }
              }
              options={
                events
                  ? events.map((event) => {
                      return {
                        display: formatEventDisplay(event),
                        value: event.id,
                      };
                    })
                  : []
              }
              onChange={(e) => {
                console.log(e);
                setSelectedEvent(
                  events.filter((event) => {
                    return event.id == e.target.value;
                  })[0],
                );
              }}
            />
          ) : (
            <h4 className="text-l mb-3 text-center font-bold text-white underline 3xs:text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl">
              No events right now
            </h4>
          )}
          {subEvents.length > 0 ? (
            <SingleDropdown
              id="subEventOption"
              name="subEventOption"
              placeholder="Select sub-event"
              wrapperClasses="w-full"
              value={
                selectedSubEvent
                  ? selectedSubEvent.default
                    ? { display: parentEventString, value: parentEventString }
                    : {
                        display: formatEventDisplay(selectedSubEvent),
                        value: selectedSubEvent.id,
                      }
                  : { display: "", value: "" }
              }
              options={
                subEvents
                  ? subEvents.map((subEvent) => {
                      return subEvent.default
                        ? {
                            display: parentEventString,
                            value: parentEventString,
                          }
                        : {
                            display: formatEventDisplay(subEvent),
                            value: subEvent.id,
                          };
                    })
                  : []
              }
              onChange={(e) => {
                setSelectedSubEvent(
                  e.target.value == parentEventString
                    ? { default: true }
                    : subEvents.filter((subEvent) => {
                        return subEvent.id == e.target.value;
                      })[0],
                );
              }}
            />
          ) : (
            <></>
          )}
        </div>

        {loading ? (
          <LoadingSpinner size={100} classes="m-auto my-20 h-fit w-fit" />
        ) : scannerRunning && selectedEvent ? (
          <div>
            {/* div needed so that overlay is properly identified by QR Scanner */}
            <video ref={videoEl} className="h-full w-full rounded-md" />
          </div>
        ) : scannedResult ? (
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
                      setScannerRunning(true);
                      setScannedResult(undefined);
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
                      setScannerRunning(true);
                      setScannedResult(undefined);
                    }}
                  >
                    Re Scan
                  </Button>
                </GradientBorder>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default withAuth(QrScannerPage, [ROLES.ADMIN]);
