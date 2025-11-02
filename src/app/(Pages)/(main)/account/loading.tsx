import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

interface LoadingComponentProps {
  title?: string;
  variant?: "products" | "general";
  count?: number;
}

export default function LoadingComponent({
  title = "content",
  variant = "general",
  count = 10,
}: LoadingComponentProps) {
  if (variant === "products") {
    return (
      <div className="space-y-6 ">
        {/* Header skeleton */}
        {/* <div className="text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div> */}

        {/* Controls skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full! max-w-2xl p-5 container my-10  bg-white dark:bg-slate-900 shadow-sm rounded-md ">
        <div className="flex flex-col gap-3 justify-center items-center p-5 border-2 border-gray-500/10 dark:border-gray-500/30 rounded-md ">
          <div className="flex justify-center items-center w-20 h-20 rounded-full border-8 border-gray-300 animate-pulse">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          </div>
          <h3 className="font-semibold tracking-widest text-xl text-center font-mono text-shadow-lg text-shadow-blue-300">
            Loading...
          </h3>
          <p className="font-medium text-md text-gray-400 text-center font-mono">
            Please wait while loading {title}.
          </p>
          <Loader2 className="animate-spin h-10 w-10 text-blue-400" />
        </div>
      </div>
    </>
  );
}

// import { Loader2 } from "lucide-react";

// export default function LoadingComponent({
//   title = "content",
// }: {
//   title: string;
// }) {
//   return (
//     <>
//       <div className="w-full! max-w-2xl p-5 container my-10  bg-white dark:bg-slate-900 shadow-sm rounded-md ">
//         <div className="flex flex-col gap-3 justify-center items-center p-5 border-2 border-gray-500/10 dark:border-gray-500/30 rounded-md ">
//           <div className="flex justify-center items-center w-20 h-20 rounded-full border-8 border-gray-300 animate-pulse">
//             <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
//           </div>
//           <h3 className="font-semibold tracking-widest text-xl text-center font-mono text-shadow-lg text-shadow-blue-300">
//             Loading...
//           </h3>
//           <p className="font-medium text-md text-gray-400 text-center font-mono">
//             Please wait while loading {title}.
//           </p>
//           <Loader2 className="animate-spin h-10 w-10 text-blue-400" />
//         </div>
//       </div>
//     </>
//   );
// }
