import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { defaultProducts } from "../siteData";
import { toProductSlug } from "../productDetails";

const showcaseVideos = [
  {
    url: "https://www.youtube.com/embed/yL5rp453Voc?si=qHTSi468bwHH2Y2P",
    title: "Premium Veneer Production",
    description: "Watch our high-quality veneer manufacturing process in action."
  },
  {
    url: "https://www.youtube.com/embed/-IDiUkdrOjE?si=Z5UFpBx2mg4tjJNA",
    title: "Precision Cutting & Inspection",
    description: "Discover our rigorous quality assurance and cutting procedures."
  },
  {
    url: "https://www.youtube.com/embed/sHnGj9yud4c?si=nxYZ85TM5JHA8LIe",
    title: "Advanced Core Assembly",
    description: "See how we assemble our core veneers for maximum strength."
  },
  {
    url: "https://www.youtube.com/embed/eImXaWewSYU?si=-1hwH_GNuG-IlOGY",
    title: "Final Output & Packaging",
    description: "Our finished products ready for factory dispatch."
  },
  {
    url: "https://www.youtube.com/embed/kDFv9TGCKRI?si=P8vHvl2nqHvxKjWj",
    title: "Factory Processing Line",
    description: "A detailed look into our state-of-the-art processing line."
  },
  {
    url: "https://www.youtube.com/embed/oaBL7wUFKtI?si=wuvp0UeM0b6b2c2K",
    title: "Quality Wood Selection",
    description: "How we select the finest raw timber for our veneer."
  },
  {
    url: "https://www.youtube.com/embed/o-V2xF78P8E?si=3Egn_x3J7c_m3JLS",
    title: "Moisture Control Systems",
    description: "Ensuring perfect moisture balance in our products."
  },
  {
    url: "https://www.youtube.com/embed/EbvsT4R-4Og?si=IfxjKFI6yQRAKZcK",
    title: "Peeling & Slicing Process",
    description: "High-precision veneer peeling and slicing techniques."
  },
  {
    url: "https://www.youtube.com/embed/8sucYIJBi0w?si=JurXJ_ujLfzCMM-l",
    title: "Drying & Curing",
    description: "Advanced drying technology for maximum stability."
  },
  {
    url: "https://www.youtube.com/embed/AMICK_lXTpk?si=xVzuwuhcHWx7Z1Qv",
    title: "Grading & Sorting",
    description: "Strict grading standards for flawless consistency."
  },
  {
    url: "https://www.youtube.com/embed/MWvg5REGhwo?si=R98m_EP69glbqUSc",
    title: "Pressing & Bonding",
    description: "Superior adhesive and bonding technologies."
  },
  {
    url: "https://www.youtube.com/embed/VPUigRaYTvc?si=7hdUS6ZhlxWnFGEb",
    title: "Thickness Calibration",
    description: "Achieving exact thickness requirements."
  },
  {
    url: "https://www.youtube.com/embed/ZLH_WEEopT4?si=65mVnY4wAV3QG0-y",
    title: "Warehouse & Dispatch",
    description: "Efficient storage and prompt delivery processing."
  }
];

function ProductsPage() {
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);

  const apiBase =
    import.meta.env.VITE_API_BASE_URL ||
    "https://om-laminates-pvt-ltd-backend.onrender.com/api";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiBase}/products`);
        if (!response.ok) {
          throw new Error("Products fetch failed");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const backendNames = data.map(p => p.name);
          const missingDefaults = defaultProducts.filter(p => !backendNames.includes(p.name));
          setProducts([...data, ...missingDefaults]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiBase]);

  return (
    <PageLayout>
      <section className="bg-navy pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange mb-4">Our Products</p>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 max-w-4xl mx-auto">
            Raw Materials for Plywood Excellence.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our complete range of core and fali veneer, precision-cut and moisture-balanced for dependable manufacturing.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-10 -mt-10 relative z-10 mb-24">
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.article
              key={product._id || product.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="modern-card group flex flex-col h-full"
            >
              <Link to={`/product/${toProductSlug(product.name)}`} className="block flex-1 flex flex-col">
                <div className="relative h-60 overflow-hidden bg-luxury-bg">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold font-heading text-navy mb-3">{product.name}</h2>
                  <p className="text-text-main leading-relaxed flex-1">{product.description}</p>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-orange group-hover:text-orange-light transition-colors">
                      View Details
                    </span>
                    <svg className="w-5 h-5 text-orange transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED VIDEOS SECTION
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest text-orange mb-3">See Our Quality</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy">Product Showcase Videos</h2>
            <p className="text-lg text-text-main max-w-2xl mx-auto mt-4">
              Watch our premium veneer manufacturing process and explore detailed product showcases.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Active showcase videos */}
            {showcaseVideos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="modern-card overflow-hidden shadow-xl rounded-2xl group flex flex-col"
              >
                <div className="relative aspect-video bg-black w-full">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={video.url} 
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 bg-white border-t-4 border-orange flex-1">
                  <h3 className="text-xl font-bold text-navy mb-2">{video.title}</h3>
                  <p className="text-sm text-text-main">{video.description}</p>
                </div>
              </motion.div>
            ))}
            
            {/* Placeholders for the rest of their videos */}
            {Array.from({ length: Math.max(0, 6 - showcaseVideos.length) }).map((_, i) => {
               const num = showcaseVideos.length + i + 1;
               return (
                 <motion.div
                   key={`placeholder-${num}`}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: num * 0.1 }}
                   className="modern-card overflow-hidden shadow-md rounded-2xl group flex flex-col bg-white border border-gray-100"
                 >
                   <div className="relative aspect-video bg-gray-100 flex flex-col items-center justify-center border-b border-gray-200">
                      <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-orange" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                      </div>
                      <span className="text-navy/60 font-bold tracking-widest uppercase text-xs">Video Placeholder {num}</span>
                   </div>
                   <div className="p-6 bg-white flex-1">
                     <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                     <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
                     <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                   </div>
                 </motion.div>
               );
            })}
          </div>
          
          <div className="text-center mt-12">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
               <span className="w-2 h-2 rounded-full bg-orange animate-pulse"></span>
               <p className="text-text-main font-medium text-sm">Space optimized for 15+ showcase videos</p>
             </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PREMIUM CTA SECTION
      ══════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden border-t-4 border-orange">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://res.cloudinary.com/ddpcospqm/image/upload/v1779616250/om_veneer/company/IMG_6683.jpg" 
            alt="Om Laminates Factory Custom Orders" 
            className="w-full h-full object-cover object-center"
          />
          {/* Deep Navy to Transparent Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/40 mix-blend-multiply"></div>
          {/* Secondary Vignette Overlay for maximum text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto px-5 text-center"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-orange font-bold uppercase tracking-[0.2em] text-sm drop-shadow-md">
              Custom Manufacturing
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold font-heading text-white mb-8 drop-shadow-2xl leading-tight">
            Can't find what <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-yellow-400">you need?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
            We handle bulk custom orders for specific thickness and dimension requirements. Contact our sales team to discuss your exact factory needs.
          </p>
          
          <Link to="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-orange rounded-lg overflow-hidden hover:scale-105 shadow-[0_0_40px_rgba(255,107,53,0.4)] hover:shadow-[0_0_60px_rgba(255,107,53,0.6)]">
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative text-lg tracking-wider uppercase flex items-center gap-3">
              Request Custom Quote
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
          </Link>
        </motion.div>
      </section>
    </PageLayout>
  );
}

export default ProductsPage;
