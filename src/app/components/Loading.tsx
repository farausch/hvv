export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-5"
      >
        <div aria-hidden="true" className="relative size-12">
          <div className="absolute inset-0 rounded-full border-[3px] border-zinc-200 dark:border-zinc-800" />
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-indigo-500 motion-reduce:animate-none dark:border-t-indigo-400" />
          <div className="absolute inset-0 m-auto size-2 rounded-full bg-indigo-500 motion-safe:animate-pulse dark:bg-indigo-400" />
        </div>
        <p className="text-sm font-medium tracking-wide text-zinc-600 dark:text-zinc-300">
          Finding your next departure
        </p>
      </div>
    </div>
  );
}
