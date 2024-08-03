import Link from 'next/link'; // Import Link from next/link
import ZaubaButton from './ZaubaButton'; // Import your custom button component

const Footer = () => {
  return (
    <footer className="bg-purple-900 bg-opacity-50 backdrop-blur-md border border-purple-800 p-4 text-center rounded-lg flex items-center justify-between">
      
      <Link href="/business" passHref>
        <ZaubaButton>
          Business Tool
        </ZaubaButton>
      </Link>

      <div>
        <p className="text-sm text-gray-100">Appship &copy; 2021 - CodeSec</p>
        <p className="text-sm text-gray-100">Developed by Altaf</p>
      </div>
      
    </footer>
  );
};

export default Footer;
