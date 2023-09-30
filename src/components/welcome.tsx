import { FC, useState } from "react";

interface WelcomeProps {
  code: number | undefined;
  setCode: React.Dispatch<React.SetStateAction<number | undefined>>;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  voyagers: any;
  setChosenVoyager: React.Dispatch<React.SetStateAction<any>>;
}

const Welcome: FC<WelcomeProps> = ({
  code,
  setCode,
  setShowMessage,
  voyagers,
  setChosenVoyager,
}) => {
  const welcome = "images/Welcome.png";

  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status

  function handleInputChange(val: string) {
    setCode(Number(val));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setIsSubmitting(true); // Set the submission status to true

    let found = false;

    // Use a Promise to await the loop
    await new Promise<void>((resolve) => {
      for (let i = 0; i < voyagers.length; i++) {
        if (voyagers[i].id === Number(code)) {
          setChosenVoyager(voyagers[i]);
          setShowMessage(true);
          found = true;
          break;
        }
        // If this is the last iteration and no match is found, resolve the Promise
        if (i === voyagers.length - 1) {
          resolve();
        }
      }
    });

    if (!found) {
      alert("Invalid code. No matching voyager found.");
    }

    setIsSubmitting(false); // Reset the submission status when done
  }

  return (
    <div
      className={`flex relative w-10/12 md:w-8/12 lg:w-7/12 m-auto aspect-[16/9] bg-none`}
    >
      {isSubmitting ? (
        // Show loading spinner when submitting
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        // Show the form when not submitting
        <div className="flex flex-col w-full h-auto my-auto">
          <div
            className="bg-cover bg-center w-full aspect-[32/9] flex"
            style={{
              backgroundImage: `url(${welcome})`,
            }}
          ></div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col space-y-5"
          >
            <input
              className="w-2/3 aspect-[40/4] mx-auto mt-4 text-center placeholder-blue-500 font-semibold md:text-1xl lg:text-2xl border-2 lg:border-4 border-black border-solid bg-white text-black"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="INPUT VOYAGER ID"
              value={code}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                handleInputChange(numericValue);
              }}
              disabled={isSubmitting}
            />

            <div className="flex flex-row w-full justify-center">
              <button
                type="submit"
                className="bg-blue-600 w-2/3 py-3 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Welcome;
