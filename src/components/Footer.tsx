import { Link } from 'react-router-dom';
import { Globe, Megaphone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#141313] w-full py-12 border-t border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center mb-4">
            <Link to="/">
              <img src="/logo-full.png" alt="PickColors Logo" className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
            </Link>
          </div>
          <p className="font-['Inter'] text-xs text-[#BEC8D0] leading-relaxed max-w-xs">The Digital Prism. A specialized toolset for modern chromatic selection and palette architecture.</p>
        </div>
        <div>
          <div className="text-xs font-bold text-white uppercase tracking-widest mb-6">Product</div>
          <div className="flex flex-col gap-4 font-['Inter'] text-xs text-[#BEC8D0]">
            <Link className="hover:text-[#80D0FF] transition-colors" to="/tools">Tools</Link>
            <Link className="hover:text-[#80D0FF] transition-colors" to="/gallery">Explore</Link>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-white uppercase tracking-widest mb-6">Company</div>
          <div className="flex flex-col gap-4 font-['Inter'] text-xs text-[#BEC8D0]">
            <Link className="hover:text-[#80D0FF] transition-colors" to="/about">About</Link>
            <Link className="hover:text-[#80D0FF] transition-colors" to="/blog">Blog</Link>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-white uppercase tracking-widest mb-6">Legal</div>
          <div className="flex flex-col gap-4 font-['Inter'] text-xs text-[#BEC8D0]">
            <Link className="hover:text-[#80D0FF] transition-colors" to="/privacy">Privacy</Link>
            <Link className="hover:text-[#80D0FF] transition-colors" to="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-['Inter'] text-xs text-[#BEC8D0]">© {new Date().getFullYear()} PickColors. The Digital Prism.</p>
        <div className="flex gap-6">
          <Globe className="text-[#BEC8D0] w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          <Megaphone className="text-[#BEC8D0] w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          <Mail className="text-[#BEC8D0] w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
        </div>
      </div>
    </footer>
  );
}
