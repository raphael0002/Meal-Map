/* eslint-disable react/prop-types */
const ShareBox = ({ onClose, show, link }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full flex flex-col max-w-md bg-[#FFF5E4] shadow-lg rounded-lg p-6 relative">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Share Recipe</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
            viewBox="0 0 320.591 320.591"
            onClick={onClose}
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000"
            ></path>
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000"
            ></path>
          </svg>
        </div>

        <div className="flex justify-center items-center gap-1 mt-8 mb-2">
          <input
            type="text"
            className=" bg-[#C1D8C3] border border-[#6A9C89] text-black text-sm rounded-md outline-none block w-full p-2.5"
            readOnly={true}
            value={link}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 px-4 text-center self-center"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareBox;
