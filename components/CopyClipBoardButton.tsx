import {
  faCheck,
  faClipboard,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface CopyClipBoardButtonProps {
  latitude: number
  longitude: number
  handleCopyToClipboard: () => void
  clipboardStatus: "success" | "error" | ""
}

const CopyClipBoardButton: React.FC<CopyClipBoardButtonProps> = ({
  latitude,
  longitude,
  handleCopyToClipboard,
  clipboardStatus,
}) => {
  return (
    <div className="mt-4 text-center md:text-left">
      <p>
        <strong>Latitude:</strong> {latitude}
      </p>
      <p>
        <strong>Longitude:</strong> {longitude}
      </p>
      <button
        onClick={handleCopyToClipboard}
        className="mt-2 px-4 py-2 bg-gray-700 text-white rounded flex items-center justify-center hover:bg-gray-500 w-full md:w-auto"
      >
        <FontAwesomeIcon icon={faClipboard} className="mr-2" />
        Copy Coordinates to Clipboard
      </button>
      {clipboardStatus === "success" && (
        <p className="text-green-500 mt-2 flex items-center justify-center md:justify-start">
          <FontAwesomeIcon icon={faCheck} className="mr-2" />
          Coordinates copied to clipboard!
        </p>
      )}
      {clipboardStatus === "error" && (
        <p className="text-red-500 mt-2 flex items-center justify-center md:justify-start">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          Failed to copy coordinates!
        </p>
      )}
    </div>
  )
}

export default CopyClipBoardButton
