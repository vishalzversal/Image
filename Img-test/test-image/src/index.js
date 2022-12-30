import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Images(props) {
  const width = props.width ? props.width + "px" : "inherit";
  const height = props.height ? props.height + "px" : "inherit";
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const [times, setTimes] = useState(
    process.env.NEXT_PUBLIC_IMAGE_ERROR_RELOAD || 3
  );

  useEffect(() => {
    if (error) {
      if (times > 0) {
        setReload(true);
        setTimeout(() => {
          setTimes((prev) => prev - 1);
          setReload(false);
        }, 2000);
        clearTimeout();
      }
    } else {
      setError(false);
      setReload(false);
    }
  }, [error, times]);

  const handleError = () => {
    if (times > 0) {
      setError(true);
      setReload(true);
    }
  };
  return (
    <>
      {!reload ? (
        <Image {...props} priority={true} onError={() => handleError()} />
      ) : (
        <>
          <div style={{ width: width, height: height }}></div>
        </>
      )}
    </>
  );
}
