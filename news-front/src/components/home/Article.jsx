export default function Article({
  headline,
  description,
  authorName,
  publishedAt,
}) {
  return (
    <div className="mx-auto px-4 max-w-xl">
      <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
        <div className="md:flex-shrink-0">
          <img
            src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
            alt="mountains"
            className="w-full h-64 rounded-lg rounded-b-none"
          />
        </div>
        <div className="px-4 py-2 mt-2">
          <p className="text-gray-500 text-xs my-2">The Guardian | Guardian</p>
          <h2 className="font-bold text-xl text-gray-800 tracking-normal">
            My Amaizing Journey to the Mountains.
          </h2>
          <p className="text-sm text-gray-700 py-1 my-1 line-clamp-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            reiciendis ad architecto at aut placeat quia, minus dolor
            praesentium officia maxime deserunt porro amet ab debitis deleniti
            modi soluta similique...
          </p>
          <div className="flex items-center justify-between mt-2">
            <a href="#" className="text-blue-500 text-xs">
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
              <a href="#">By Mohammed Ibrahim</a>
              {", "}
              <span className="text-gray-600">21 SEP 2015.</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
