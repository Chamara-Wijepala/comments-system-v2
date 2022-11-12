import HashLoader from "react-spinners/HashLoader";

export default function Loader() {
  return (
    <div className="loader flex flex-justify-center flex-align-center bg-primary-100">
      <HashLoader color="purple" />
    </div>
  );
}
