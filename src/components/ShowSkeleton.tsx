export const ShowSkeleton = () => (
  <div className="flex min-h-60 z-10 rounded-sm dark:hover:shadow-dark hover:duration-80 hover:ease-in-out hover:shadow-light">
    <div className="h-full min-w-40 md:p-2 p-1">
      <div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
    </div>

    <div className="flex flex-col justify-between relative md:p-2 p-1 w-full">
      <div className="absolute top-0 right-0 z-20 p-2">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div>
      </div>

      <div className="md:mr-0 mr-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-5/6"></div>
      </div>

      <div className="flex justify-between">
        <div className="flex min-w-10 flex-col dark:brightness-75 dark:opacity-100 opacity-50">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-10 mb-1"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-16"></div>
        </div>

        <div className="flex min-w-12 items-end md:gap-1 gap-0.5">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="h-3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-10"
              ></div>
            ))}
        </div>
      </div>
    </div>
  </div>
);
