import Image from "next/image";
import { useCallback, useState } from "react";

import * as css from "./CopyIcon.css";

interface CopyIconProps {
  content: string;
}

export function CopyIcon(props: CopyIconProps) {
  const { content } = props;
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(content);
    setIsCopying(true);

    setTimeout(() => {
      setIsCopying(false);
    }, 1000);
  }, []);

  return (
    <Image
      key={isCopying ? "copying" : "copy"}
      src={isCopying ? "/images/check.svg" : "/images/copy.svg"}
      alt="copy to clipboard icon"
      width="18"
      height="18"
      className={css.copyIcon}
      onClick={copyToClipboard}
    />
  );
}
