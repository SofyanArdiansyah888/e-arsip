import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Alert, { Variant } from "../../base-components/Alert";
import Lucide from "../../base-components/Lucide";
import { setNotification } from "../../stores/apps/notificationSlice";
import { useAppDispatch } from "../../stores/hooks";
import { RootState } from "../../stores/store";

export default function CustomNotification() {
  const { message, status } = useSelector(
    (state: RootState) => state.notification
  );
  const [variant, setVariant] = useState<Variant>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (status) {
      case "success":
        setVariant("success");
        break;
      case "warning":
        setVariant("warning");
        break;
      case "error":
        setVariant("danger");
        break;
    }
  }, [status]);

  if (status === "") {
    return <></>;
  }

  return (
    <Alert
      variant={variant}
      className="alert-warning flex justify-between mb-2 w-auto mt-4 absolute bottom-0 right-12 gap-4 z-50"
    >
      {({ dismiss }) => {
        setTimeout(() => {
          dispatch(
            setNotification({
              message: "",
              status: "",
            })
          );
        }, 1500);

        return (
          <>
            <div className="flex text-white">
              <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" /> {message}
            </div>

            <button
              type="button"
              className="btn-close text-white"
              aria-label="Close"
              onClick={() => {
                dispatch(
                  setNotification({
                    message: "",
                    status: "",
                  })
                );
              }}
            >
              <Lucide icon="X" className="w-4 h-4" />
            </button>
          </>
        );
      }}
    </Alert>
  );
}
