import Link from "next/link";

export default function NavHeader() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-2 px-4 hidden md:block">
      <div className="container mx-auto px-4 md:px-2 flex justify-between items-center text-xs text-gray-600 dark:text-gray-300">
        <div className="flex space-x-4">
          <span>Free shipping on orders over $50</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">30-day money-back guarantee</span>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/about"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/help"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Help
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/track-order"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Order Tracking
          </Link>
        </div>
      </div>
    </div>
  );
}
