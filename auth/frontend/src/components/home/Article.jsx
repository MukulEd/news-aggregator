export default function Article({ data }) {
  return (
    <div className="mx-auto px-4 max-w-xl">
      <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
        <div className="md:flex-shrink-0">
          <img
            src={
              data.image ??
              "https://www.freeiconspng.com/uploads/no-image-icon-6.png"
            }
            alt="No Image Found"
            className="w-full h-64 rounded-lg rounded-b-none"
          />
        </div>
        <div className="px-4 py-2 mt-2">
          <p className="text-gray-500 text-xs my-2">
            {data.source} {data.category && "|"}{" "}
            {data.category && (
              <span className="px-1 py-0.5 bg-gray-200 ml-1 rounded">
                {data.category}
              </span>
            )}
          </p>
          <h2 className="font-bold text-xl text-gray-800 tracking-normal">
            {data.title}
          </h2>
          <p className="text-sm text-gray-700 py-1 my-1 line-clamp-5">
            {data.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <a href={data.url} className="text-blue-500 text-xs">
              Show More
            </a>
            {/* <a href="#" className="flex text-gray-700">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-blue-500"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              5
            </a> */}
          </div>
          <div className="author flex items-center  my-3">
            <h2 className="text-xs tracking-tighter text-gray-500">
              <a href="#">By {data.author ? data.author : "N/A"}</a>{" "}
              <span>,</span>
              <span className="text-gray-600 ml-1">
                {data.date ? new Date(data.date).toLocaleString() : ""}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
