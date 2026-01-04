import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-96px)] gap-4">
            <h2 className="text-2xl font-bold text-gray-800">404 - Page Not Found</h2>
            <p className="text-gray-600">Could not find the requested page.</p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                Return Home
            </Link>
        </div>
    );
}
